# Type Refactoring TODO

## Overview

We've created a comprehensive centralized type system in `src/lib/types/`. The following files still have duplicate type definitions that should be gradually refactored to use the centralized types.

## Priority: HIGH - Critical Components

### ✅ COMPLETED - Comprehensive Type System Refactoring!

- [x] `src/lib/services/searchService.ts` - Uses centralized types
- [x] `src/lib/actions/search.ts` - Uses centralized types
- [x] `src/app/[locale]/search/components/doctor-card/types.ts` - Updated
- [x] `src/components/ui/Map.tsx` - ✅ Uses TransformedDoctorData, SearchClinicData
- [x] `src/components/ui/MapModal.tsx` - ✅ Uses TransformedDoctorData, SearchClinicData
- [x] `src/components/ui/forms/DoctorProfileForm.tsx` - ✅ Uses Speciality from centralized types
- [x] `src/components/ui/forms/PatientProfileForm.tsx` - ✅ Uses PatientWithUser
- [x] `src/components/ui/forms/AppointmentBookingForm.tsx` - ✅ Uses TransformedDoctorData, AvailableTimeSlot
- [x] `src/app/[locale]/dashboard/doctor/clinics/components/types.ts` - ✅ Uses base Clinic and Pricing types
- [x] `src/app/[locale]/dashboard/doctor/schedules/components/types.ts` - ✅ Imports DayOfWeek from centralized types
- [x] `src/app/[locale]/dashboard/doctor/schedules/components/ScheduleManagement.tsx` - ✅ Imports from types.ts
- [x] `src/app/[locale]/book/[doctorId]/components/AppointmentBooking.tsx` - ✅ Uses Pick<Clinic>, Pick<Pricing>
- [x] `src/app/[locale]/dashboard/doctor/appointments/components/DoctorAppointmentList.tsx` - ✅ Extends DoctorAppointment
- [x] `src/app/[locale]/dashboard/doctor/appointments/components/CollapsibleHistorySection.tsx` - ✅ Extends DoctorAppointment
- [x] `src/app/[locale]/dashboard/patient/appointments/components/AppointmentList.tsx` - ✅ Extends PatientAppointment
- [x] `src/app/[locale]/dashboard/patient/components/AppointmentList.tsx` - ✅ Extends PatientAppointment

### 📝 Intentionally Kept Local Types

The following components have local type definitions that are **intentionally kept** because they:

1. Represent feature-specific subsets of centralized types
2. Have different data structures from queries (e.g., junction table fields)
3. Are used only in a single component/module

- `src/app/[locale]/search/components/BookingModal.tsx` - Local Doctor subset (no user field needed)
- `src/app/[locale]/book/[doctorId]/components/AppointmentBooking.tsx` - Local TimeSlot for booking UI
- `src/components/ui/forms/DoctorProfileForm.tsx` - Includes specialityId junction field
- `src/app/[locale]/dashboard/doctor/schedules/components/types.ts` - Dashboard-specific simplified types

### 🔴 HIGH PRIORITY - Map Components

**Status:** ✅ ALL COMPLETED

### 🟡 MEDIUM PRIORITY - Dashboard Components

**Status:** ✅ COMPLETED - Clinics and Schedules refactored to use centralized DayOfWeek, with feature-specific extensions

These files use local types which are specific to their use case:

- `src/app/[locale]/dashboard/doctor/components/components/types.ts`
  - Already has local types, but could extend from `@/lib/types/relations`
- `src/app/[locale]/dashboard/doctor/clinics/components/types.ts`
  - Could use `Clinic` from `@/lib/types/prisma`
- `src/app/[locale]/dashboard/doctor/schedules/components/types.ts`
  - Could use `Schedule`, `DayOfWeek` from `@/lib/types/prisma`

## Refactoring Guidelines

### Step 1: Import Centralized Types

```typescript
import type {
  TransformedDoctorData,
  DoctorWithRelations,
  PatientWithUser,
  Clinic,
  hasCoordinates,
} from "@/lib/types";
```

### Step 2: Replace Local Interface

```typescript
// Before
interface Doctor {
  id: string;
  name: string;
  // ...
}

// After
type Doctor = TransformedDoctorData;
// OR if you need to extend:
interface ExtendedDoctor extends TransformedDoctorData {
  customField: string;
}
```

### Step 3: Test

```bash
npm run build
```

TypeScript will show any field mismatches!

## Benefits of Refactoring

✅ **Single source of truth** - Types match database schema  
✅ **Autocomplete** - Better IDE support  
✅ **Type safety** - Catch errors at compile time  
✅ **Maintainability** - Update once, affects everywhere  
✅ **Documentation** - Types are self-documenting

## Refactoring Checklist Template

When refactoring a file:

- [ ] Import centralized types from `@/lib/types`
- [ ] Replace duplicate interfaces with type aliases
- [ ] Remove unused local type definitions
- [ ] Run `npm run build` to check for errors
- [ ] Fix any type mismatches
- [ ] Test the component functionality
- [ ] Update this file with completion status

## Notes

- **Don't rush** - Refactor incrementally as you work on each feature
- **Test thoroughly** - Especially map and form components
- **Keep backwards compatibility** - If uncertain, create type alias first
- **Update documentation** - Keep `src/lib/types/README.md` updated

## TypeScript Build Verification

Always run before committing refactored code:

```bash
npm run build
```

This ensures no type errors were introduced.
