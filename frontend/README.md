# Escruta - Frontend

_"Think, ask, learn"_

**Escruta Frontend** is the user interface component of the Escruta research assistant platform. Built with modern web technologies, it provides an intuitive and responsive experience for managing your research workflows, organizing sources, and interacting with AI-powered analysis tools.

> [!IMPORTANT]
> This frontend application is part of the Escruta ecosystem and requires the backend service to be running for full functionality. The project is under development and may contain incomplete features or breaking changes.

## Technology Stack

- **Runtime**: Node.js with npm package management.
- **Build Tool**: Vite for fast development and optimized production builds.
- **Framework**: React 19 with TypeScript for type-safe development.
- **Routing**: React Router for client-side navigation.
- **Styling**: Tailwind CSS with custom design system components.
- **Animations**: Motion library for smooth transitions and interactions.
- **Rich Text**: Quill.js for advanced note editing capabilities.
- **HTTP Client**: Axios for API communication.
- **Code Highlighting**: highlight.js for syntax highlighting in code blocks.

## Project Structure

```
src/
├── app/                 # Core application with protected routes and main functionality
│   ├── components/      # Reusable UI components (icons, buttons, textfields, modals, cards, etc.)
│   ├── contexts/        # React context providers for global state management
│   ├── interfaces/      # TypeScript type definitions and API response models
│   ├── layouts/         # Page layout wrappers (dashboard, sidebar, navigation)
│   ├── pages/           # Main application pages (notebook, settings, etc.)
│   └── utils/           # Helper functions and utilities
├── auth/                # Authentication flow (login, register)
├── contexts/            # Global React contexts for shared state
├── docs/                # Documentation files and guides
├── hooks/               # Custom React hooks for data fetching and state logic
├── landing/             # Public landing page and components
├── providers/           # Context providers and application-wide state management
├── services/            # API services and external integrations
└── shared/              # Common utilities, helpers, and cross-app components
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Escruta backend service running (see [backend README](../backend/README.md))

### Installation

1. Navigate to the frontend directory:

```bash
cd escruta/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at [localhost:5173](http://localhost:5173/) by default.

### Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run dev:landing` - Run only the landing page for marketing site development
- `npm run build` - Create production build
- `npm run build:landing` - Build only the landing page
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_ESCRUTA_BACKEND_URL=http://localhost:8080
VITE_JUST_LANDING=false
```

Available environment variables:

- `VITE_ESCRUTA_BACKEND_URL`: Backend API URL (defaults to `http://localhost:8080`)
- `VITE_JUST_LANDING`: Set to `true` to build only the landing page

## Building for Production

### Standard Build

```bash
npm run build
```

This creates a `dist/` directory with optimized static files ready for deployment.

### Docker Build

The frontend includes a multi-stage Dockerfile for containerized deployment:

```bash
docker build -t escruta-frontend .
docker run -d -p 80:80 escruta-frontend
```

The Docker image uses nginx to serve the static files with proper routing configuration for single-page application behavior.

## Deployment

> [!NOTE]
> The project includes `vercel.json` configuration for seamless Vercel deployment with proper SPA routing.

For deployment on traditional web servers, ensure your server is configured to:

- Serve `index.html` for all non-file routes (SPA routing)
- Set proper MIME types for static assets
- Enable gzip compression for better performance

The included [`nginx.conf`](./nginx.conf) provides a reference configuration.

## Development Guidelines

### Code Style

- Use TypeScript for all new components and utilities.
- Follow React functional component patterns with hooks.
- Implement responsive design using Tailwind CSS utility classes.
- Keep components small and focused on single responsibilities.
- Use custom hooks for complex state logic and data fetching.

### Component Architecture

- **UI Components** (`src/app/components/ui/`): Reusable, unstyled components.
- **Feature Components** (`src/app/components/`): Application-specific components.

### State Management

- Use React Context for global application state.
- Implement custom hooks for component-specific state logic.
- Keep server state synchronized using the custom `useFetch` hook.
- Leverage local storage for user preferences and session data using the `useCookie` hook.

## Integration with Backend

The frontend communicates with the Escruta backend through RESTful APIs. Ensure the backend service is running and accessible at the configured `VITE_ESCRUTA_BACKEND_URL` for full functionality.
