# Ta Khongsap's Personal Website

![Ta Khongsap](public/Ta%20Khongsap%20OPEN-TEC.jpg)

> **Math • Data Science • Code • AI • Supply Chain**

A modern, high-performance personal website showcasing domain expertise in Mathematics, Data Science, Software Development, AI, and Supply Chain optimization. Built with a focus on performance, SEO, and security.

## 🎯 Professional Focus

Domain expert combining:
- **Mathematical rigor** and quantitative analysis
- **Data-driven insights** and machine learning
- **Software development** excellence
- **AI innovation** and implementation
- **Supply chain optimization** and operations research

Applied across finance, operations, and logistics domains.

## ✨ Features

- 📱 **Responsive Design**: Optimized for all devices with a clean, intuitive interface
- 🚀 **Performance-Focused**: Built with Vite + React for optimal loading speeds
- 📊 **Project Showcase**: Weekend projects demonstrating creative coding and problem-solving
- 📝 **Articles & Writing**: Curated insights on AI, technology, and software development
- 📨 **Newsletter System**: Full email subscription service with confirmation and tracking
- 🔍 **SEO Optimized**: Comprehensive meta tags, structured data (Schema.org), and Open Graph support
- ♿ **Accessibility**: Semantic HTML and ARIA labels
- 🔒 **Security Features**: Authentication, CSRF protection, input validation, and secure sessions

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with esbuild bundling
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter (lightweight routing)

### Backend
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon Database - Serverless)
- **ORM**: Drizzle ORM with type-safe queries
- **Authentication**: Custom Basic Auth with bcrypt (12 rounds)
- **Email Service**: SendGrid integration
- **Security**: Helmet.js, CSRF protection, express-session

### SEO & Analytics
- **Meta Tags**: Dynamic SEO component with page-level control
- **Structured Data**: Schema.org markup (Person, Website, Organization)
- **Open Graph**: Facebook and LinkedIn sharing optimization
- **Twitter Cards**: Enhanced social media previews
- **Sitemap**: XML sitemap generation
- **Analytics**: Google Analytics integration

## Project Structure

```
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── data/          # Static data and media content
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Application routes/pages
│   │   └── styles/        # Global styles and Tailwind config
├── server/                # Backend API and server logic
│   ├── auth-middleware.ts # Authentication and authorization middleware
│   ├── auth-utils.ts      # Authentication utilities (password hashing, etc.)
│   ├── email-service.ts   # Email functionality using SendGrid
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data storage interface
│   └── pg-storage.ts      # PostgreSQL implementation
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema and type definitions
├── public/                # Static assets
└── theme.json            # Theme configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or use the provided Neon Database connection)

### Installation

1. Clone the repository
   ```
   git clone [repository-url]
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following variables (see `.env.example` for all options)
   ```
   DATABASE_URL=your_postgres_connection_string
   SENDGRID_API_KEY=your_sendgrid_api_key
   SESSION_SECRET=a_secure_random_string
   # Enable verbose logging during development
   DEBUG_LOGS=true
   VITE_DEBUG_LOGS=true
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:5000](http://localhost:5000) with your browser to see the result

### Admin Setup

To create an admin user for accessing protected endpoints:

```
npm run setup
```

Follow the prompts to create a secure admin username and password.

### Database Setup

The project uses Drizzle ORM with PostgreSQL. To set up or update your database schema:

```
npm run db:push
```

## 📚 Key Features

### Newsletter System

The website includes a full-featured newsletter subscription system:

- **Email Confirmation Flow**: Double opt-in with token-based verification
- **Subscriber Management**: Admin dashboard for managing subscribers
- **Email Tracking**: Open and click tracking for newsletter engagement
- **Unsubscribe Functionality**: One-click unsubscribe with token validation
- **SendGrid Integration**: Reliable email delivery with production email service
- **Mock Email Service**: Development-friendly email testing without external services

### Security Features

Current security implementation:

- ✅ **Secure Authentication**: bcrypt password hashing with 12 rounds
- ✅ **Input Validation**: Zod schema validation for all API inputs
- ✅ **Security Headers**: Helmet.js with CSP, HSTS, and XSS protection
- ✅ **Secure Sessions**: HTTPOnly cookies with SameSite protection
- ✅ **SQL Injection Protection**: Drizzle ORM with parameterized queries
- ✅ **HTTPS Enforcement**: Automatic upgrade-insecure-requests in production
- ✅ **Environment Variables**: Sensitive data isolated in .env files
- ⚠️ **CSRF Protection**: Infrastructure in place (see Known Issues)

### Recent Improvements

**SEO Enhancement (Latest):**
- ✅ Updated site-wide branding to "Math • Data Science • Code • AI • Supply Chain"
- ✅ Comprehensive meta tag optimization across all pages
- ✅ Enhanced Open Graph and Twitter Card metadata
- ✅ Added supply chain and operations research keywords
- ✅ Improved structured data schemas with expanded expertise areas
- ✅ Fixed bookmark title truncation issue
- ✅ Better search engine visibility for all domain expertise areas

**Impact:**
- Clearer professional positioning as domain expert
- Improved SEO for mathematics, data science, AI, and supply chain queries
- Better social media sharing previews
- Enhanced discoverability across multiple expertise domains

### Known Issues & Roadmap

Based on recent security audit, the following improvements are recommended:

**Critical (Security):**
- [ ] Fix CSRF token implementation in client-side API calls
- [ ] Add rate limiting to prevent spam and DoS attacks
- [ ] Replace Math.random() with crypto.randomBytes() for secure tokens
- [ ] Implement HTML sanitization for newsletter content
- [ ] Add URL validation for link tracking to prevent open redirects

**High Priority (Performance):**
- [ ] Implement batch email processing with concurrency control
- [ ] Add database indexes for frequently queried fields
- [ ] Migrate to PostgreSQL-backed session store for production scalability

**Code Quality:**
- [ ] Split routes.ts (796 lines) into modular route files
- [ ] Eliminate code duplication in email services
- [ ] Improve TypeScript type safety (remove `any` usage)
- [ ] Add comprehensive test coverage

See [Code Review Report](#code-review-summary) for detailed recommendations.

## 📊 Code Review Summary

A comprehensive security and code quality audit was conducted, revealing:

### Findings
- **Total Issues**: 25 (7 Critical, 6 High Priority, 6 Medium, 6 Low)
- **Security Score**: Good infrastructure with implementation gaps
- **Largest File**: routes.ts (796 lines - exceeds 200-300 guideline)
- **Test Coverage**: Minimal (needs expansion)

### Positive Aspects
- ✅ Strong TypeScript usage with Zod validation
- ✅ Proper password hashing (bcrypt with 12 rounds)
- ✅ SQL injection protection via Drizzle ORM
- ✅ Comprehensive SEO implementation
- ✅ Security headers with Helmet.js
- ✅ Separation of concerns (client/server/shared)

### Priority Actions
1. Fix CSRF token implementation in client API calls
2. Add rate limiting to public endpoints (newsletter, contact)
3. Replace insecure random token generation
4. Add database indexes for performance
5. Implement batch email processing for scalability
6. Split large route file into modular components

### Architecture Recommendations
- Refactor 796-line routes.ts into modular route files
- Extract email templates to eliminate duplication
- Implement proper error handling middleware
- Add request logging and health check endpoints
- Migrate to PostgreSQL-backed sessions for production

For detailed findings with code examples and solutions, see the full code review report in the project documentation.

## 📝 Development Guidelines

This project follows the guidelines in `CLAUDE.md`:

- **File Size**: Keep files under 200-300 lines (routes.ts is an exception to be refactored)
- **Code Quality**: No mocking data for dev/prod, iterate existing code vs. creating new patterns
- **Testing**: Always restart server after changes, run `npm run check` before commits
- **Environment**: Be environment-aware (dev/test/prod differences)

### Available Scripts

```bash
# Development
npm run dev              # Start development server (tsx server/index.ts)
npm run check            # TypeScript type checking - run before committing

# Production
npm run build            # Build with Vite + esbuild bundling
npm run start            # Start production server

# Database
npm run db:push          # Push database schema changes via Drizzle
npm run setup            # Create admin user for protected endpoints

# Testing
npm test                 # Run Jest tests (limited coverage - needs expansion)
```

## 🚀 Deployment

Configured for multiple platforms:
- **Replit** (primary): Node.js 20 with PostgreSQL 16
- **Netlify**: SPA routing with API proxying
- **Vercel**: API rewrites and SPA fallback

### Environment Variables

Required environment variables in `.env`:
```bash
NODE_ENV=development
DATABASE_URL=postgresql://...
SITE_URL=http://localhost:5000
SESSION_SECRET=your-secure-random-string
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=your-verified-email
```

See `.env.example` for complete list of configuration options.

## 📄 License

MIT

---

**Built with ❤️ by Ta Khongsap**
*Math • Data Science • Code • AI • Supply Chain*
