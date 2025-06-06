import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from "helmet";
import session from "express-session";
import MemoryStore from "memorystore";
import csurf from "csurf";
import { db } from "./db";
import { debugLog } from "./logger";

const MemoryStoreSession = MemoryStore(session);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: "sameorigin"
  },
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin"
  }
}));

// Add custom permissions policy header (since it's not in helmet's type)
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=()'
  );
  next();
});

// Session configuration
const isProduction = process.env.NODE_ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET || 'please-change-this-secret-in-production';

if (isProduction && SESSION_SECRET === 'please-change-this-secret-in-production') {
  console.warn('WARNING: Using default session secret in production environment!');
  console.warn('Please set a proper SESSION_SECRET environment variable.');
}

// Setup session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: {
    secure: isProduction, // true in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Setup CSRF protection for state-changing requests
const csrfProtection = csurf();
// Apply CSRF protection to all non-GET, non-HEAD, non-OPTIONS routes after 
// session middleware is initialized

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Apply CSRF protection to all API routes that modify state
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  csrfProtection(req, res, next);
});

// Add CSRF token generation route
app.get('/api/csrf-token', csrfProtection, (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
});

(async () => {
  // Log environment configuration at startup
  debugLog("\n===== Server Environment Configuration =====");
  debugLog(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  debugLog(`DATABASE_URL: ${process.env.DATABASE_URL ? 'set (length: ' + process.env.DATABASE_URL.length + ')' : '*** NOT SET - USING IN-MEMORY STORAGE ***'}`);
  debugLog(`SITE_URL: ${process.env.SITE_URL || 'not set'}`);
  debugLog(`SMTP Configuration: ${process.env.SMTP_HOST ? 'set' : 'not set'}`);
  debugLog(`Session Secret: ${SESSION_SECRET === 'please-change-this-secret-in-production' ? '*** DEFAULT *** (please change in production)' : 'custom secret set'}`);
  debugLog("============================================\n");

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve static files from the public directory in both dev and production
  app.use(express.static('public'));
  
  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
