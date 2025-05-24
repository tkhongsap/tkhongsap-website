# Ta Khongsap's Personal Website

![Ta Khongsap](public/Ta%20Khongsap%20OPEN-TEC.jpg)

A modern, minimal personal website for Ta Khongsap that showcases professional expertise through a sleek, performance-driven portfolio with enhanced user interaction and creative coding projects.

## Features

- 📱 **Responsive Design**: Optimized for all devices with a clean, intuitive interface
- 🚀 **Performance-Focused**: Built with Next.js for optimal loading speeds and user experience
- 📊 **Project Showcase**: Displaying creative coding and AI projects
- 📝 **Articles & Writing**: Integration with Medium content
- 📨 **Newsletter System**: Email subscription service with tracking capabilities
- 🔍 **SEO Optimized**: Structured data and meta tags for better search engine visibility
- ♿ **Accessibility**: Designed with inclusivity in mind
- 🔒 **Security Features**: Comprehensive security measures to protect data and admin access

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **Database**: Neon Database (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Passport.js with bcrypt for password hashing
- **Email Integration**: SendGrid
- **Animations**: Framer Motion
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Shadcn/UI (Radix UI)
- **Security**: Helmet.js, CSRF protection, secure sessions

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

## Deployment

This project is configured for deployment on Replit, Netlify, and Vercel platforms.

## Features

### Newsletter System

The website includes a full-featured newsletter subscription system with:

- Email confirmation flow
- Subscriber management
- Email open/click tracking
- Unsubscribe functionality

### Project Showcase

Displays professional projects with:

- Project descriptions and screenshots
- Technologies used
- Links to live demos and GitHub repositories

### Writing & Articles

Integration with Medium articles featuring:

- Reading time estimates
- Categories and tags
- Engagement metrics

### Security Features

The website implements comprehensive security measures:

- **Secure Authentication**: Password hashing with bcrypt and protected admin routes
- **CSRF Protection**: Protection against Cross-Site Request Forgery attacks
- **Security Headers**: Using Helmet.js to set secure HTTP headers
- **Input Validation**: Zod schema validation for all user inputs
- **Secure Sessions**: HTTPOnly cookies and secure session management
- **HTTPS Enforcement**: Automatic HTTPS redirection in production
- **Environment Variables**: Sensitive data stored in environment variables
- **Rate Limiting**: Protection against brute force attacks on admin endpoints

## License

MIT