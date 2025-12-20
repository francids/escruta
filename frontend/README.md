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

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- Escruta backend service running (see [backend README](../backend/README.md))

### Installation

1. `cd escruta/frontend` - Navigate to the frontend directory
2. `npm install` - Install dependencies
3. `npm run dev` - Start the development server

The application will be available at [localhost:5173](http://localhost:5173/) by default.

### Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
VITE_ESCRUTA_BACKEND_URL=http://localhost:8080
```

Available environment variables:

- `VITE_ESCRUTA_BACKEND_URL`: Backend API URL (defaults to `http://localhost:8080`)

## Integration with Backend

The frontend communicates with the Escruta backend through RESTful APIs. Ensure the backend service is running and accessible at the configured `VITE_ESCRUTA_BACKEND_URL` for full functionality.
