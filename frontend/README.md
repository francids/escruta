# Escruta - Frontend

## Getting Started

To run the Escruta frontend, you need to have **Bun** installed. Follow these steps to set up the project:

```bash
git clone git@github.com:francids/escruta.git
cd escruta/frontend
bun i
bun dev
```

## Project Structure

```
src/
├── app/                 # Core application with protected routes and main functionality
│   ├── components/      # Reusable UI components (icons, buttons, textfields, modals, cards, etc.)
│   ├── contexts/        # React context providers for global state management
│   ├── interfaces/      # TypeScript type de finitions and API response models
│   ├── layouts/         # Page layout wrappers (dashboard, sidebar, navigation)
│   └── pages/           # Main application pages (notebook, settings, etc.)
├── auth/                # Authentication flow (login, register, password reset)
├── hooks/               # Custom React hooks for data fetching and state logic
├── landing/             # Public landing page and marketing components
└── shared/              # Common utilities, helpers, and cross-app components
```

## Building for Production

```bash
bun run build
```

## Environment Variables

The application uses the following environment variables:

- `VITE_ESCRUTA_BACKEND_URL`: Backend API URL (defaults to `http://localhost:8080`)
