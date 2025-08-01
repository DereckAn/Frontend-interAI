    # CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**InterviewAI** is a Next.js 15 SaaS platform that simulates technical interviews for technology professionals. The application uses React 19, TypeScript, and integrates with a Java Spring Boot backend API.

## Development Commands

- **Start development server**: `bun dev` (uses Turbopack for faster builds)
- **Build for production**: `bun build`  
- **Start production server**: `bun start`
- **Lint code**: `bun lint`
- **Install dependencies**: `bun install`

**Important**: This project uses **Bun** as the package manager, not npm or yarn.

## Architecture & Key Patterns

### Authentication System
- **NextAuth.js v5** (beta) with JWT strategy
- Multiple providers: Google OAuth, GitHub OAuth, and custom credentials
- Custom credential authentication communicates with backend API at `/api/auth/login`
- Session data includes custom fields: `userId`, `role`, `jwtToken`
- Authentication routes redirect to `/settings` after login
- Protected routes enforce authentication via middleware

### State Management
- **Zustand** store (`/src/store/formDataStore.ts`) manages multi-step form data
- Stores user interview preferences: difficulty, languages, topics, resume files
- Includes async `submitFormData()` action for API communication
- State persists across navigation during interview setup flow

### Route Structure & Protection
- **App Router** with nested layouts in `/src/app/(root)/`
- Route protection defined in `/src/routes.ts`:
  - `publicRoutes`: `["/"]` (landing page only)
  - `authRoutes`: `["/authentication"]`  
  - `protectedRoutes`: Settings, interview flow, history pages
- Middleware handles route protection and redirects

### Component Architecture
- **Shadcn/ui** components in `/src/components/ui/`
- Feature-based organization: `/components/authentication/`, `/components/home/`, `/components/interview/`
- Shared components in `/components/ui/shared/`
- Uses Radix UI primitives with custom styling

## Important Configuration Files

### Environment Variables (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Styling & Theming
- **Tailwind CSS v4** with custom design system
- Custom CSS variables for light/dark themes in `/src/app/globals.css`
- **next-themes** for theme switching
- Custom fonts: Teachers (primary), Bodoni Moda (headings)
- Color palette includes custom colors: `pinko`, `gray2`, custom accent colors

### TypeScript Configuration
- Path mapping: `@/*` points to project root
- Strict mode enabled
- Custom type definitions in `/src/types/interfaces.ts`
- Extended NextAuth types in `/src/types/next-auth.d.ts`

## Key Business Logic

### Interview Flow
1. **Authentication** → `/authentication`
2. **Information Gathering** → `/fill_information` (multi-step form)
3. **Interview Execution** → `/inteview` (note: typo in route name)
4. **Results & Analysis** → `/result`
5. **History Tracking** → `/historial`

### Form Validation
- **Zod** schemas in `/src/schema/index.ts`
- **React Hook Form** with `@hookform/resolvers` for integration
- Validation for authentication, profile updates, password changes

### Data Constants
- Interview topics and difficulty levels in `/src/lib/constants.ts`
- Lucide React icons mapped to topics
- Difficulty ranges from Junior to Senior with year experience mapping

## API Integration Patterns

### Backend Communication
- Base API URL from `NEXT_PUBLIC_API_URL` environment variable
- Authenticated requests use JWT tokens from NextAuth session
- FormData for file uploads (resume files)
- API routes in `/src/app/api/` for NextAuth and interview endpoints

### Server Actions
- Custom server actions in `/src/actions/`
- Actions handle form submissions and API communication
- Error handling and loading states managed in components

## Development Conventions

### File Organization
- Feature-based component organization
- Shared utilities in `/src/lib/`
- Type definitions centralized in `/src/types/`
- Server actions in `/src/actions/`
- Context providers in `/src/context/`

### Naming Conventions
- Component files use PascalCase: `LoginCard.tsx`
- Utility files use camelCase: `utils.ts`
- Server actions use camelCase: `authentication.ts`
- Route folders use kebab-case: `fill_information/`

### Code Style
- TypeScript strict mode
- `cn()` utility for conditional className merging (clsx + tailwind-merge)
- Consistent use of arrow functions for components
- Interface definitions for all data structures

## Dependencies Notes

### Key Libraries
- **Framer Motion**: Animation library for smooth transitions
- **React Icons + Lucide React**: Icon libraries (prefer Lucide for consistency)
- **Sonner**: Toast notification system
- **React Hook Form**: Form handling with validation
- **Class Variance Authority**: Component variant patterns

### State Management
- Zustand for client-side state (interview form data)
- NextAuth session for authentication state
- React Context for theme and session providers

## Common Patterns to Follow

1. **Component Structure**: Use TypeScript interfaces for props, destructure props, use proper typing
2. **Error Handling**: Always handle loading and error states in async operations  
3. **Authentication**: Check session status before accessing protected features
4. **Styling**: Use Tailwind classes with custom CSS variables, leverage `cn()` utility
5. **API Calls**: Include proper error handling, loading states, and type safety
6. **Forms**: Use React Hook Form + Zod validation pattern consistently

## Backend Dependencies

This frontend requires the "Backend-interAI" Java Spring Boot project to be running for full functionality. The backend handles:
- User authentication and session management
- Interview data processing
- File upload handling (resumes)
- Interview history and results storage