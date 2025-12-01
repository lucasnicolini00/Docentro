# Docentro - AI Coding Agent Instructions

## Project Overview

Docentro is a Next.js 15.3.5 medical platform connecting patients with doctors globally. Built with TypeScript, Prisma ORM (PostgreSQL), NextAuth.js, and Tailwind CSS using the app router architecture. **Status**: Production-ready, fully migrated to Server Actions.

## 🚨 Critical AI Coding Rules

### ❌ NEVER DO:

- Create API routes for business logic (use Server Actions instead)
- Use `any` type without strong justification
- Bypass authentication validation in server actions
- Ignore the ActionResult pattern
- Create components larger than 200 lines (break them down instead)
- Mix multiple responsibilities in a single component

### ✅ ALWAYS DO:

- Use Server Actions for all business logic (NO API routes)
- Follow ActionResult<T> return pattern: `{ success: boolean, data?: T, error?: string }`
- Import from centralized index files
- Validate auth in server actions with `validateAuth()`
- Keep components under 200 lines - break into focused sub-components
- Create single-responsibility components

## Architecture Patterns

### Server Actions Pattern (CRITICAL)

- **All data operations use Server Actions** - see `src/lib/actions/`
- Standard structure:

```typescript
export async function actionName(params): Promise<ActionResult> {
  try {
    // 1. Validate authentication
    const validation = await validateAuth();
    if (!validation || "error" in validation) {
      return { success: false, error: "Authentication failed" };
    }
    // 2. Validate inputs
    // 3. Database operations
    // 4. Return success
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Error message" };
  }
}
```

### Component Architecture & File Size Standards

- **200-line component limit** strictly enforced
- **Refactoring strategy**: Break large components into `components/` subdirectory
- **Organization pattern**: `features/[feature]/components/` with central `index.ts` exports
- **Component composition** over monolithic design
- Example structure:

```
dashboard/
├── DashboardOverview.tsx       # Main container (< 200 lines)
├── components/                 # Sub-components
│   ├── WelcomeSection.tsx      # 50 lines
│   ├── StatisticsGrid.tsx      # 65 lines
│   ├── QuickActions.tsx        # 80 lines
│   ├── RecentActivity.tsx      # 90 lines
│   ├── types.ts                # Interfaces
│   └── index.ts                # Exports
```

### Authentication & Authorization

- **NextAuth.js** with custom Prisma adapter and credentials provider
- **Role-based routing**: `DOCTOR`/`PATIENT` roles enforced in `middleware.ts`
- **Auth guards**: Use `requireDoctor()`, `requirePatient()` in pages
- **Session access**: `useSession()` in client components, `getServerSession()` in server components
- **Validation helpers**: `validateDoctor()`, `validatePatient()`, `validateAuth()` in `src/lib/actions/utils.ts`

### Database Patterns

- **Prisma ORM** with PostgreSQL
- **Key relationships**: User → Doctor/Patient, Doctor → Clinics → Pricing, Appointments
- **Core entities**: User, Patient, Doctor, Clinic, Schedule, TimeSlot, Appointment
- Use `prisma.$transaction()` for multi-table operations
- Include related data with `include` for efficiency

## Development Workflows

### Essential Commands

```bash
npm run dev --turbopack    # Development with Turbopack
npm run build             # Production build
npm run db:studio        # Visual database browser
npm run db:push          # Push schema changes without migrations
npm run db:migrate       # Create and run migrations
```

### Component Development Workflow

1. Create feature in `src/components/features/[name]/`
2. If component exceeds 200 lines, split into `components/` subdirectory
3. Export through central `index.ts` files
4. Use TypeScript interfaces in separate `types.ts` files
5. Test with `npm run build` for type safety

### File Organization

```
src/
├── app/                      # Next.js 15 app router pages
├── components/
│   ├── ui/                   # Base components (buttons, forms)
│   ├── features/             # Business components (dashboard, appointments)
│   ├── sections/             # Page sections
│   └── providers/            # React providers
├── lib/actions/              # Server actions (ALL business logic)
│   ├── appointments.ts       # Appointment CRUD
│   ├── auth.ts              # User auth/registration
│   ├── analytics.ts         # Dashboard stats
│   ├── utils.ts             # Auth validation + types
│   └── index.ts             # Centralized exports
└── lib/auth-guards.ts        # Authentication utilities
```

## Project-Specific Conventions

### Spanish UI with English Code

- **All user-facing text in Spanish** ("Citas", "Bienvenido", "Próximas Citas")
- **Code, variables, comments in English**
- Error messages returned in Spanish to users

### Data Flow Pattern

1. **Server Actions** fetch data with authentication validation
2. **Custom hooks** (like `useDashboardData`) manage client state
3. **Component composition** passes data down through props
4. **Type safety** enforced with TypeScript interfaces

### Styling Patterns

- **Tailwind CSS** with custom blue theme (`from-blue-600 to-blue-700`)
- **Lucide React** icons consistently used
- **Loading states**: Skeleton components and `animate-pulse` utilities
- **Responsive design**: `md:grid-cols-2 lg:grid-cols-3` patterns
- **Change indicators**: Support `"increase" | "decrease" | "neutral"` states

### Import Patterns

```typescript
// ✅ Good - use centralized exports
import { ComponentName } from "@/components";
import { actionName } from "@/lib/actions";

// ❌ Avoid - direct file imports
import ComponentName from "@/components/ui/ComponentName";
```

## Integration Points

### External Dependencies

- **FullCalendar**: Calendar/scheduling UI (`@fullcalendar/react`)
- **NextAuth.js**: Complete authentication system
- **Prisma Accelerate**: Database connection pooling
- **bcryptjs**: Password hashing

### Client/Server Boundary

- **Server Components**: Default for pages and layouts
- **Client Components**: Use `"use client"` for React hooks, state, or class components
- **Server Actions**: Called from client components using transitions

## Critical Files

- `middleware.ts` - Route protection and role validation
- `src/lib/auth.ts` - NextAuth configuration and providers
- `src/lib/actions/utils.ts` - Validation patterns for all actions
- `prisma/schema.prisma` - Complete database schema
- `src/components/providers/AuthProvider.tsx` - Session management setup

## Error Handling

- Server Actions return structured `ActionResult<T>` responses, never throw
- Client components handle loading/error states declaratively
- TypeScript strict mode enforced - handle all nullable cases
- Build validation with `npm run build` before deployment

## Component Refactoring Guidelines

When encountering large files (>200 lines):

1. **Identify logical sections** (header, stats, actions, lists)
2. **Extract reusable pieces** (cards, forms, modals)
3. **Create focused components** with single responsibilities
4. **Maintain prop interfaces** for type safety
5. **Update central exports** in `index.ts` files

**Migration Status**: 100% Server Actions, 23 optimized routes, fully type-safe
