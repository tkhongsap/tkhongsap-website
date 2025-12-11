# Ta Khongsap's Personal Website

A modern, minimal personal website for Ta Khongsap that showcases professional expertise in Mathematics, Programming, and Finance through a sleek, performance-driven portfolio with enhanced user interaction, creative coding projects, and AI-powered solutions.

## Features

- 📱 **Responsive Design**: Optimized for all devices with a clean, intuitive interface
- 🚀 **Performance-Focused**: Built with Vite and React for optimal loading speeds and user experience
- 📊 **Project Showcase**: Displaying AI, data science, and creative coding projects
- 📝 **Articles & Writing**: Integration with Medium content featuring reading time estimates and categories
- 📨 **Newsletter System**: Full-featured email subscription service with confirmation flow and tracking capabilities
- 🔍 **SEO Optimized**: Structured data and meta tags for better search engine visibility, highlighting expertise in Data Science, AI, and Supply Chain
- ♿ **Accessibility**: Designed with inclusivity in mind
- 🔒 **Security Features**: Comprehensive security measures to protect data and admin access
- 🧪 **Testing**: Jest test suite for critical functionality

## Technology Stack

- **Frontend**: React 18 + TypeScript with Vite bundling
- **Backend**: Express.js + TypeScript server
- **Build Tools**: Vite for frontend, esbuild for backend bundling
- **Database**: PostgreSQL (Neon Database - Serverless)
- **ORM**: Drizzle ORM with type-safe schema
- **Authentication**: Express sessions + Basic auth with bcrypt password hashing
- **Email Integration**: SendGrid for newsletter and contact forms
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query) for API state management
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Shadcn/UI (40+ Radix UI components)
- **Styling**: Tailwind CSS with custom theming
- **Security**: Helmet.js, CSRF protection, secure HTTPOnly sessions
- **Testing**: Jest with supertest for API testing

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
   ```bash
   git clone [repository-url]
   cd tkhongsap-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables (see `.env.example` for all options)
   ```env
   NODE_ENV=development
   DATABASE_URL=your_postgres_connection_string
   SITE_URL=http://localhost:5000
   SESSION_SECRET=a_secure_random_string
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_email
   # Enable verbose logging during development (optional)
   DEBUG_LOGS=true
   VITE_DEBUG_LOGS=true
   ```

4. Set up the database schema
   ```bash
   npm run db:push
   ```

5. Create an admin user for protected endpoints
   ```bash
   npm run setup
   ```

6. Start the development server
   ```bash
   npm run dev
   ```

7. Open [http://localhost:5000](http://localhost:5000) with your browser to see the result

### Development Commands

```bash
# Development
npm run dev          # Start development server with hot reload
npm run check        # Run TypeScript type checking

# Production
npm run build        # Build frontend and backend for production
npm run start        # Start production server

# Database
npm run db:push      # Push database schema changes via Drizzle

# Admin Setup
npm run setup        # Create admin user for protected endpoints

# Testing
npm test            # Run Jest test suite
```

## Deployment

This project is configured for deployment on multiple platforms:
- **Replit** (primary) - Node.js 20 with PostgreSQL 16
- **Netlify** - SPA routing with API proxying
- **Vercel** - API rewrites and SPA fallback

## Core Features

### Newsletter System

Full-featured email subscription system with:

- **Email Confirmation Flow**: Double opt-in subscription process
- **Subscriber Management**: Admin dashboard for managing subscribers
- **Email Tracking**: Open and click tracking for newsletters
- **Unsubscribe Functionality**: One-click unsubscribe with token validation
- **SendGrid Integration**: Reliable email delivery service

### Project Portfolio

Professional project showcase featuring:

- **AI & Machine Learning Projects**: Fine-tuning vision models, AI-powered applications
- **Data Science Work**: Analytics and visualization projects
- **Creative Coding**: Interactive web experiences
- **Project Details**: Descriptions, screenshots, technologies, and live demos
- **GitHub Integration**: Direct links to source code repositories

### Writing & Articles

Medium article integration with:

- **Reading Time Estimates**: Calculated reading duration for each article
- **Categories and Tags**: Organized content by topics
- **Article Previews**: Summary cards with featured images
- **External Link Tracking**: Click tracking for Medium articles

### Contact System

Contact form with:

- **Form Validation**: Client and server-side validation using Zod
- **Email Notifications**: Automatic notifications for new messages
- **Message Storage**: Database storage of all contact submissions
- **Spam Protection**: CSRF token validation

### Security Features

Comprehensive security implementation:

- **Secure Authentication**: Bcrypt password hashing with salt rounds
- **Protected Routes**: Session-based authentication for admin endpoints
- **CSRF Protection**: Cross-Site Request Forgery prevention on all forms
- **Security Headers**: Helmet.js configuration for secure HTTP headers
- **Input Validation**: Zod schema validation for all user inputs
- **Secure Sessions**: HTTPOnly cookies with PostgreSQL session store
- **HTTPS Enforcement**: Automatic HTTPS redirection in production
- **Environment Variables**: Sensitive configuration stored securely
- **Rate Limiting**: Protection against brute force attacks

## API Endpoints

### Public Routes
- `POST /api/subscribe` - Newsletter subscription
- `POST /api/contact` - Contact form submission
- `GET /api/newsletter/confirm` - Email confirmation
- `GET /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `POST /api/newsletter/track/:type/:id` - Track email opens/clicks

### Protected Admin Routes
(Require authentication via session)
- `GET /api/subscribers` - Get all subscribers
- `GET /api/newsletters` - Get all newsletters
- `POST /api/newsletters` - Create new newsletter
- `POST /api/newsletters/:id/send` - Send newsletter to subscribers
- `GET /api/contact-messages` - Get all contact messages

## Database Schema

The application uses PostgreSQL with Drizzle ORM for type-safe database operations. Main tables:

- **users** - Admin authentication and credentials
- **subscribers** - Newsletter subscribers with confirmation status
- **newsletters** - Newsletter content and metadata
- **newsletter_tracking** - Email open and click tracking
- **contact_messages** - Contact form submissions

Schema is defined in `/shared/schema.ts` with full TypeScript type inference.

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Points to `client/src/`
- `@shared/*` - Points to `shared/`

Example usage:
```typescript
import { Button } from '@/components/ui/button';
import { insertSubscriberSchema } from '@shared/schema';
```

## Development Guidelines

When contributing or making changes:

- **Always run `npm run check`** before committing to ensure TypeScript compliance
- **Restart the server** after making changes for proper testing
- **Kill existing servers** before starting new ones to avoid port conflicts
- **Keep files under 200-300 lines** - refactor when exceeding this limit
- **Iterate on existing code** instead of creating new patterns
- **No mocking data** for dev/prod environments (tests only)
- **Check for existing functionality** before duplicating code
- **Be environment-aware** - consider dev/test/prod differences
- **Prefer simple solutions** - avoid over-engineering
- **Focus on relevant code** - do not touch unrelated areas
- **Never overwrite .env** without confirming first

For more detailed development guidance, see [`CLAUDE.md`](./CLAUDE.md).

## Frontend Design Guidelines

This project uses distinctive, production-grade interfaces:

- **Typography**: Avoid generic fonts (Inter, Roboto, Arial). Use distinctive, characterful font choices.
- **Color**: Use CSS variables. Dominant colors with sharp accents over evenly-distributed palettes.
- **Motion**: Prefer CSS-only animations. Use Framer Motion for React. Focus on high-impact moments.
- **Layout**: Embrace asymmetry, overlap, and grid-breaking elements.
- **Avoid**: Generic AI aesthetics, purple gradients on white, predictable layouts, cookie-cutter design.

## License

MIT
