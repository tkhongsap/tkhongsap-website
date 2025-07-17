# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Development
npm run dev          # Start development server (tsx server/index.ts)
npm run check        # TypeScript type checking - run before committing

# Production
npm run build        # Build with Vite + esbuild bundling
npm run start        # Start production server

# Database
npm run db:push      # Push database schema changes via Drizzle
npm run setup        # Create admin user for protected endpoints

# Initial Setup
cp .env.example .env # Configure environment variables
npm run db:push      # Setup database schema
npm run setup        # Create admin user
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript with Vite bundling
- **Backend**: Express.js + TypeScript server
- **Database**: PostgreSQL with Drizzle ORM (Neon Database)
- **Styling**: Tailwind CSS + Radix UI (shadcn/ui components)
- **State**: TanStack Query for API state management
- **Authentication**: Express sessions + Passport.js (local strategy)
- **Email**: SendGrid integration for newsletter system

### Project Structure
```
├── client/          # Frontend React application
│   ├── src/pages/   # Route components (home, about, portfolio, writing)
│   ├── src/components/ui/  # 40+ shadcn/ui design system components
│   ├── src/data/    # Static content (articles, projects)
│   └── src/hooks/   # Custom React hooks
├── server/          # Backend Express.js API
│   ├── routes.ts    # API endpoints and handlers
│   ├── storage.ts   # Database abstraction layer
│   └── email-service.ts  # SendGrid email functionality
├── shared/          # Shared TypeScript schemas and types
└── migrations/      # Database migrations (auto-generated)
```

### Key Features
- **Newsletter System**: Full email subscription with confirmation/tracking
- **Content Management**: Article system with Medium integration
- **Admin Panel**: Protected endpoints for managing subscribers/newsletters
- **Security**: Helmet.js, CSRF protection, secure sessions

## Database Schema (Drizzle ORM)

The database uses PostgreSQL with the following main tables:
- `users` - Admin authentication
- `subscribers` - Newsletter subscribers with confirmation status  
- `newsletters` - Newsletter content and metadata
- `newsletter_tracking` - Email open/click tracking
- `contact_messages` - Contact form submissions

Schema defined in `/shared/schema.ts` with TypeScript inference.

## Important Development Rules

### Code Quality Standards
- **Iterate existing code** instead of creating new patterns
- **Keep files under 200-300 lines** - refactor when exceeding this
- **No mocking data** for dev/prod environments (tests only)
- **Always restart server** after making changes for testing
- **Check for existing functionality** before duplicating code
- **Environment-aware code** - consider dev/test/prod differences

### Path Aliases
- `@/*` - Points to client/src/
- `@shared/*` - Points to shared/

## API Endpoints

### Public Routes
- `POST /api/subscribe` - Newsletter subscription
- `POST /api/contact` - Contact form submission
- `GET /api/newsletter/confirm` - Email confirmation
- `GET /api/newsletter/unsubscribe` - Unsubscribe

### Protected Admin Routes (require authentication)
- `GET /api/subscribers` - Get all subscribers
- `GET /api/newsletters` - Newsletter management
- `POST /api/newsletters/:id/send` - Send newsletter

## Environment Setup

Required environment variables in `.env`:
```
NODE_ENV=development
DATABASE_URL=postgresql://...
SITE_URL=http://localhost:5000
SESSION_SECRET=your-secure-random-string
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=your-verified-email
```

## Deployment

Configured for multiple platforms:
- **Replit** (primary) - Node.js 20 with PostgreSQL 16
- **Netlify** - SPA routing with API proxying  
- **Vercel** - API rewrites and SPA fallback

## Testing & Quality

**Note**: No testing framework currently configured. Consider adding:
- Jest/Vitest for unit testing
- ESLint/Prettier for code quality
- Pre-commit hooks for type checking

Always run `npm run check` for TypeScript validation before committing changes.