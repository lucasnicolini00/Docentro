# Server Actions Structure

This directory contains all Server Actions organized by feature/domain. This modular approach provides better maintainability, type safety, and code organization.

## Structure

```
src/lib/actions/
├── index.ts              # Export all actions for easy importing
├── auth.ts              # Authentication-related actions
├── patients.ts          # Patient-specific actions
├── doctors.ts           # Doctor-specific actions
├── search.ts            # Search and general data fetching actions
└── utils.ts             # Shared utilities, types, and validation functions
```

## Benefits

1. **Modularity**: Each file focuses on a specific domain
2. **Maintainability**: Easier to find and update related actions
3. **Type Safety**: Shared types and utilities ensure consistency
4. **Reusability**: Common validation logic is centralized
5. **Scalability**: Easy to add new action files for new features

## Usage

Import actions from the main index file:

```typescript
import {
  updatePatientProfile,
  updateDoctorProfile,
  registerAction,
} from "@/lib/actions";
```

## File Guidelines

- **auth.ts**: User authentication, registration, login, logout
- **patients.ts**: Patient profile management, dashboard data, patient-specific operations
- **doctors.ts**: Doctor profile management, dashboard data, doctor-specific operations
- **search.ts**: Search functionality, featured content, general data fetching
- **utils.ts**: Shared validation functions, types, and utilities
- **index.ts**: Single export point for all actions

## Adding New Actions

1. Create actions in the appropriate domain file
2. Add validation using utilities from `utils.ts`
3. Export the action in `index.ts`
4. Follow the `ActionResult<T>` type for consistent return values

## Best Practices

- Use the `validateAuth()`, `validatePatient()`, `validateDoctor()` utilities
- Return consistent `ActionResult<T>` objects
- Use `revalidatePath()` after data mutations
- Handle errors gracefully with try-catch blocks
- Use TypeScript types for better development experience
