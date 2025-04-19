import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { comparePassword } from './auth-utils';

// Basic authentication middleware
export async function basicAuthMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    // Decode base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    
    // Find user by username
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Compare passwords
    const passwordMatch = await comparePassword(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Attach user to request for later use
    (req as any).user = {
      id: user.id,
      username: user.username
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
}

// Admin only middleware - use after basicAuthMiddleware
export async function adminOnlyMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const user = (req as any).user;
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  // In a real app, you'd check if the user has admin role/permissions
  // For now, we'll consider any authenticated user as admin
  
  next();
} 