# Component Structure - Docentro

## New Organization (Hybrid Approach)

This project now uses a well-organized component structure that scales with growth:

```
src/components/
├── ui/                          # Reusable UI components
│   ├── buttons/
│   │   ├── LoadingButton.tsx
│   │   ├── PulseButton.tsx
│   │   └── index.ts
│   ├── feedback/
│   │   ├── LoadingSpinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Toast.tsx
│   │   └── index.ts
│   ├── forms/
│   │   ├── DoctorProfileForm.tsx
│   │   ├── PatientProfileForm.tsx
│   │   └── index.ts
│   ├── navigation/
│   │   ├── navbar.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── index.ts
├── sections/                    # Landing page sections
│   ├── HeroSection.tsx
│   ├── FeaturedDoctorsSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── SpecialtiesSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── Footer.tsx
│   └── index.ts
├── features/                    # Feature-specific components
│   ├── doctor/
│   │   ├── DoctorCard.tsx
│   │   └── index.ts
│   ├── search/
│   │   ├── SearchFilters.tsx
│   │   └── index.ts
│   └── index.ts
├── providers/                   # Global providers
│   ├── AuthProvider.tsx
│   ├── GlobalLoadingProvider.tsx
│   └── index.ts
├── dev/                        # Development components
│   ├── LoadingTester.tsx
│   └── index.ts
└── index.ts                    # Main barrel export
```

## Import Examples

### Before (Flat Structure)

```typescript
import LoadingButton from "@/components/LoadingButton";
import DoctorCard from "@/components/DoctorCard";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/components/AuthProvider";
```

### After (Organized Structure)

```typescript
import { LoadingButton } from "@/components/ui/buttons";
import { DoctorCard } from "@/components/features/doctor";
import { Navbar } from "@/components/ui/navigation";
import { AuthProvider } from "@/components/providers";
```

### Or using the main barrel export:

```typescript
import { LoadingButton, DoctorCard, Navbar, AuthProvider } from "@/components";
```

## Benefits

1. **Better Organization**: Components are grouped by purpose and type
2. **Scalability**: Easy to add new components without cluttering
3. **Discoverability**: Clear structure makes finding components easier
4. **Maintainability**: Related components are grouped together
5. **Clean Imports**: Barrel exports provide clean import statements
6. **Team Collaboration**: Clear ownership and responsibility boundaries

## Guidelines

- **UI Components**: Reusable interface elements go in `ui/`
- **Sections**: Page-specific sections go in `sections/`
- **Features**: Business logic components go in `features/`
- **Providers**: Context providers go in `providers/`
- **Development**: Testing/debug components go in `dev/`

## Next Steps

As your project grows, consider:

- Adding `types/` folder for component-specific types
- Creating `hooks/` subfolder for component-specific hooks
- Adding `constants/` for component-related constants
- Implementing component documentation with Storybook
