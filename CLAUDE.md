# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stadi is an Overwatch 2 Stadium mode build creation tool with a Symfony 7.3 API backend and Vue 3 frontend. The application allows users to create, manage, and share hero builds through a modern web interface.

## Development Environment

This project uses **DDEV** for containerized development with Node 22 and MariaDB 10.11.

### Essential Commands

**Environment Management:**
```bash
make install        # Full project setup (install dependencies, setup DB)
make up             # Start DDEV and launch Vue dev server
make start          # Start DDEV and initialize database
make stop           # Stop DDEV containers
make ssh            # SSH into main container
```

**Development:**
```bash
make run                    # Launch Vue.js dev server only
make webapp CMD="<cmd>"     # Run commands in webapp folder
make backend CMD="<cmd>"    # Run commands in backend folder
```

**Database:**
```bash
make db-init          # Initialize database and run migrations
make migrate          # Run pending migrations
make migration        # Generate new migration
make fixtures         # Load test data
make reset-data       # Reset database with fresh fixtures
```

**Frontend (webapp/):**
```bash
npm run dev           # Development server
npm run build         # Production build
npm run type-check    # TypeScript checking
npm run lint          # ESLint
npm run format        # Prettier formatting
npm run test:unit     # Vitest unit tests
npm run test:e2e      # Cypress E2E tests
```

**Backend (Symfony):**
```bash
php bin/console cache:clear
php bin/console make:entity
php bin/console doctrine:fixtures:load
```

## Architecture Overview

### Backend (Symfony 7.3)

**Pattern:** API-first with Action-Domain-Responder (ADR) pattern
- **Controllers:** Single-action controllers per operation (`CreateHeroController`, `ListHeroController`, etc.)
- **Authentication:** JWT tokens stored in HTTP-only cookies via LexikJwtAuthenticationBundle
- **Entities:** User, Hero, Ability, Upgrade, Build, BuildUpgrade with proper Doctrine relationships
- **Serialization:** Group-based serialization with circular reference protection
- **API:** RESTful endpoints with pagination, filtering, and search capabilities

**Key Authentication Endpoints:**
- `POST /api/register` - User registration
- `POST /api/login_check` - Login (returns JWT in cookie)
- `GET /api/me` - Current user info
- `POST /api/logout` - Logout and clear tokens

### Frontend (Vue 3 + TypeScript)

**Architecture:** Composition API with centralized state management
- **State Management:** Pinia stores (`user.ts`, `ui.ts`) with singleton patterns
- **Routing:** Dynamic layout switching with authentication guards
- **Design System:** Token-based system supporting multiple themes (light/dark/gaming variants)
- **API Layer:** Generic `ApiService` class with TypeScript generics
- **UI Framework:** Dual approach using Tailwind CSS + Naive UI components

**Key Patterns:**
- Service-per-entity pattern for API communication
- Wrapper components around Naive UI for design system integration
- Global loading state management with request counting
- Role-based access control with `isAdmin` computed properties

### Design System Integration

The app uses a sophisticated design system with:
- **Tokens:** Centralized design tokens in `design-system/tokens.ts`
- **Theme Switching:** Runtime CSS variable injection with automatic OS detection
- **Tailwind Configuration:** Generated from design tokens
- **Gaming UI:** Specialized effects and styling for gaming applications

### Development URLs

- **API:** `https://stadi.ddev.site`
- **Frontend:** `https://app.stadi.ddev.site`

## Testing

**Frontend Tests:**
- Unit tests with Vitest
- E2E tests with Cypress
- Run with `npm run test:unit` and `npm run test:e2e`

**Backend:**
- Fixtures available for development data
- Test admin user: `admin@admin.com` / `admin`

## Database Schema

Core entities representing Overwatch 2 build system:
- Users create Builds for specific Heroes
- Builds contain BuildUpgrades linking to Upgrades
- Upgrades enhance Abilities belonging to Heroes
- Proper foreign key relationships maintained throughout