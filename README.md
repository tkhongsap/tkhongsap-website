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

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **Database**: Neon Database (Serverless PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Passport.js
- **Email Integration**: SendGrid
- **Animations**: Framer Motion
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Shadcn/UI (Radix UI)

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

3. Create a `.env` file with the following variables
   ```
   DATABASE_URL=your_postgres_connection_string
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

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

## License

MIT