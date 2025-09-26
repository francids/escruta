# Escruta - AI Coding Agent Instructions

## Project Overview

Escruta is an AI-powered research assistant with a **multi-platform architecture**:

- **Backend**: Java 21 + Spring Boot + Spring AI (OpenAI-compatible) + PostgreSQL with pgvector
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + React Router v7
- **Mobile**: React Native + Expo + TypeScript
- **Database**: PostgreSQL with vector embeddings for AI-powered search

## Architecture & Data Flow

### Core Domain Model

The application revolves around **Notebooks** containing **Sources** and **Notes**:

- `User` → owns multiple `Notebook`s
- `Notebook` → contains multiple `Source`s and `Note`s
- `Source` → uploaded documents/links processed for AI context
- `Note` → user-created content, optionally linked to sources

### Backend Structure (`backend/src/main/java/com/francids/escruta/backend/`)

```
configs/         # Spring configuration (Security, AI, etc.)
controllers/     # REST endpoints (AuthenticationController, NotebookController, etc.)
dtos/            # Data transfer objects
entities/        # JPA entities with UUID primary keys
exceptions/      # Custom exceptions and error handling
mappers/         # MapStruct mappers for entity-DTO conversion
repositories/    # Spring Data JPA repositories
services/        # Business logic layer
```

### Frontend Structure (`frontend/src/`)

```
app/            # Protected routes (/app/*) with lazy-loaded pages
auth/           # Authentication flow (/login, /register)
contexts/       # React contexts for global state
docs/           # Documentation pages (/docs/*)
hooks/          # Custom React hooks (useAuth, useTheme, etc.)
interfaces/     # TypeScript interfaces
landing/        # Public marketing pages
providers/      # Context providers (AuthProvider, ThemeProvider, etc.)
scripts/        # Build and utility scripts (e.g., prerender.ts)
services/       # API service layer (AuthService.ts pattern)
shared/         # Cross-app utilities and components
```

## Development Workflows

### Local Development

```bash
# Backend (requires Java 21)
cd backend && ./gradlew bootRun

# Frontend
cd frontend && npm run dev

# Mobile
cd mobile && npm start
```

### Environment Configuration

- **Backend**: Uses `application.yml` with `${ENV_VAR:default}` pattern.
- **Frontend**: Vite env vars (`VITE_ESCRUTA_BACKEND_URL`, `VITE_JUST_LANDING`).

## Project-Specific Patterns

### API Communication

- Backend uses **JWT tokens** for authentication.
- Frontend uses **Axios client** (`backend.ts`) with base URL configuration.
- Auth tokens stored in **cookies** (`js-cookie` library).
- Services follow pattern: `useFetch("/endpoint", data)`.

### Frontend Routing

- Uses **React Router v7** with file-based routing.
- Lazy loading: `const Page = lazy(() => import("./pages/Page"))`.
- Protected routes wrap in `ProtectedRoute.tsx`.

### State Management

- **React Contexts** for global state (AuthContext, ThemeContext, etc.).
- Custom hooks pattern: `useAuth()`, `useTheme()`, etc.
- No Redux - contexts + local state only.

### Styling & UI

- **Tailwind CSS v4** with custom design system.
- **Motion library** for animations (not Framer Motion).
- **Quill.js** for rich text editing.
- Component structure: `components/{icons,ui}/`.

### AI Integration

- **Spring AI** with OpenAI-compatible providers (defaults to Ollama).
- **pgvector** for embeddings storage and semantic search.
- Document processing via **Apache Tika** (`spring-ai-tika-document-reader`).
- Chat completions path configurable (`ESCRUTA_AI_CHAT_COMPLETIONS_PATH`).

## Key Files & Integration Points

- `frontend/src/config.ts` - Environment configuration and feature flags.
- `frontend/src/backend.ts` - Axios client setup for API communication.
- `backend/src/main/resources/application.yml` - Spring configuration with env vars.
- `frontend/vite.config.ts` - Build optimization with vendor chunking.
- `frontend/package.json` - Special build scripts (`build:landing`, `dev:landing`).

## Mobile App Specifics

- **Expo Router** for navigation.
- **twrnc** (Tailwind React Native Classnames) for styling.
- Uses same backend API endpoints.

## Build & Deployment Notes

- Frontend includes **prerendering** step (`jiti src/scripts/prerender.ts`).
- Landing page can be built separately (`VITE_JUST_LANDING=true`).
- Backend builds to executable JAR via `./gradlew clean build`.
- All services containerized with health checks and restart policies.
