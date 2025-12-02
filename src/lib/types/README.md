# Type System Documentation

## Overview

This directory contains the complete TypeScript type system for the Docentro platform. All types are derived from the Prisma schema and ensure end-to-end type safety from database to frontend.

## File Structure

```
src/lib/types/
├── index.ts          # Central export - import everything from here
├── prisma.ts         # Base Prisma model types matching schema.prisma
├── relations.ts      # Common relation patterns and query shapes
├── search.ts         # Search-specific types
└── README.md         # This file
```

## Type Categories

### 1. Base Model Types (`prisma.ts`)

Exact representations of Prisma models:

```typescript
import { Doctor, Patient, Clinic, Appointment } from '@/lib/types';
```

**Key Features:**
- Match `schema.prisma` exactly
- Include all enums (UserRole, AppointmentStatus, etc.)
- Date fields as `Date` objects (server-side)
- Serialized versions for client components (dates as strings)

### 2. Relation Types (`relations.ts`)

Common query patterns with relations:

```typescript
import { 
  DoctorWithRelations,      // Doctor + user + clinics + specialties
  PatientAppointment,       // Appointment with patient view
  ClinicWithDoctors,        // Clinic with all doctors
} from '@/lib/types';
```

**Use Cases:**
- Dashboard queries
- Detail pages
- Form data with nested relations

### 3. Search Types (`search.ts`)

Specialized types for search operations:

```typescript
import { 
  RawDoctorData,           // From database query
  TransformedDoctorData,   // After serialization
  SearchClinicData,        // Clinic with coordinates
} from '@/lib/types';
```

### 4. Type Guards & Utilities

Runtime type checking:

```typescript
import { isDoctor, isPatient, hasCoordinates } from '@/lib/types';

if (isDoctor(user)) {
  // TypeScript knows user.role === 'DOCTOR'
}

if (hasCoordinates(clinic)) {
  // TypeScript knows latitude & longitude are numbers
  const map = new Map(clinic.latitude, clinic.longitude);
}
```

## Usage Patterns

### Server Actions

```typescript
import type { 
  RawDoctorData, 
  TransformedDoctorData,
  ActionResult 
} from '@/lib/types';

export async function getDoctors(): Promise<ActionResult<TransformedDoctorData[]>> {
  const raw: RawDoctorData[] = await prisma.doctor.findMany({...});
  const transformed = raw.map(transformDoctor);
  return { success: true, data: transformed };
}
```

### Database Services

```typescript
import type { Doctor, DoctorWithRelations } from '@/lib/types';

export const doctorService = {
  async getById(id: string): Promise<DoctorWithRelations | null> {
    return prisma.doctor.findUnique({
      where: { id },
      include: { user: true, specialities: true, ... }
    });
  }
};
```

### Client Components

```typescript
import type { TransformedDoctorData } from '@/lib/types';

interface Props {
  doctor: TransformedDoctorData; // Dates are strings, Decimals are numbers
}

export function DoctorCard({ doctor }: Props) {
  // All fields are properly typed and serialized
  return <div>{doctor.name}</div>;
}
```

### Forms

```typescript
import type { 
  CreateAppointmentInput,
  UpdateAppointmentInput 
} from '@/lib/types';

function BookingForm() {
  const [data, setData] = useState<CreateAppointmentInput>({
    doctorId: '',
    patientId: '',
    clinicId: '',
    datetime: new Date(),
    durationMinutes: 30,
    type: 'IN_PERSON',
  });
}
```

## Adding New Fields

### Step 1: Update Prisma Schema

```prisma
model Clinic {
  // ... existing fields
  phoneNumber String?  // NEW FIELD
}
```

### Step 2: Update Base Type

Edit `prisma.ts`:

```typescript
export interface Clinic {
  // ... existing fields
  phoneNumber: string | null;  // ADD HERE
}
```

### Step 3: Update Query Includes

If using shared includes (like `DOCTOR_SEARCH_INCLUDE`), add the field:

```typescript
// In searchService.ts
const DOCTOR_SEARCH_INCLUDE = {
  clinics: {
    select: {
      clinic: {
        select: {
          // ... existing fields
          phoneNumber: true,  // ADD HERE
        }
      }
    }
  }
};
```

### Step 4: TypeScript Will Enforce Consistency

```bash
npm run build
```

If you missed updating types, TypeScript will error:
```
Property 'phoneNumber' does not exist on type 'SearchClinicData'
```

## Type Safety Benefits

### ✅ Prevents Runtime Errors

**Before:**
```typescript
const lat = clinic.latitude; // undefined - forgot to select it!
map.setCenter(lat, lng);     // Runtime error
```

**After:**
```typescript
// TypeScript error if latitude not in type
const lat = clinic.latitude; // number | null
if (hasCoordinates(clinic)) {
  map.setCenter(clinic.latitude, clinic.longitude); // Safe!
}
```

### ✅ Autocomplete & IntelliSense

IDE knows exactly what fields exist and their types.

### ✅ Refactoring Safety

Rename a field → TypeScript shows all usages that need updating.

### ✅ Documentation

Types serve as inline documentation of data structures.

## Common Patterns

### Pagination

```typescript
import type { PaginatedResult, DoctorWithRelations } from '@/lib/types';

type PaginatedDoctors = PaginatedResult<DoctorWithRelations>;

const result: PaginatedDoctors = {
  data: doctors,
  total: 100,
  page: 1,
  pageSize: 20,
  totalPages: 5,
};
```

### Dashboard Stats

```typescript
import type { DoctorDashboardStats } from '@/lib/types';

const stats: DoctorDashboardStats = {
  totalAppointments: 150,
  pendingAppointments: 10,
  averageRating: 4.8,
  revenue: { total: 50000, currency: 'USD' },
};
```

### Filters

```typescript
import type { DoctorSearchFilters } from '@/lib/types';

const filters: DoctorSearchFilters = {
  speciality: 'Cardiology',
  city: 'New York',
  minRating: 4.0,
  maxPrice: 200,
};
```

## Best Practices

1. **Always import from `@/lib/types`** (the index file)
2. **Use serialized types** for client components
3. **Use base types** for server-side code
4. **Add JSDoc comments** to complex types
5. **Create type guards** for runtime checks
6. **Keep types in sync** with Prisma schema
7. **Run `npm run build`** to verify type safety

## Troubleshooting

### "Type X is not assignable to type Y"

Check that you're using the right type variant (raw vs serialized, base vs with relations).

### "Property X does not exist"

The database query doesn't select that field. Add it to the query or remove from type.

### "Cannot find module '@/lib/types'"

Make sure the path alias is configured in `tsconfig.json`.

## Migration Checklist

When updating the database schema:

- [ ] Update `prisma/schema.prisma`
- [ ] Run `npx prisma generate`
- [ ] Update `src/lib/types/prisma.ts`
- [ ] Update query includes if needed
- [ ] Update relation types if needed
- [ ] Run `npm run build` to check for errors
- [ ] Fix any TypeScript errors
- [ ] Test the changes

## Related Documentation

- [Prisma Schema](../../../prisma/schema.prisma)
- [Server Actions Pattern](../../actions/README.md)
- [Component Architecture](../../../components/README.md)
