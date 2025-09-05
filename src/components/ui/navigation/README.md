# Doctor Dashboard Header System

This system provides a flexible and reusable header component for all doctor dashboard pages.

## Components

### 1. DoctorHeader

The base header component with full customization options.

### 2. DoctorLayout (Enhanced)

The main layout component now accepts header props for customization.

### 3. DoctorPageWrapper

A convenience wrapper that makes it easy to create pages with custom headers.

## Usage Examples

### Basic Usage with DoctorLayout

```tsx
import { DoctorLayout } from "@/components/ui/navigation";

export default function MyDoctorPage() {
  return (
    <DoctorLayout
      headerTitle="Custom Page Title"
      headerSubtitle="Custom subtitle here"
      showDate={false}
      showProfile={true}
    >
      {/* Your page content */}
    </DoctorLayout>
  );
}
```

### Using Pre-built Page Wrappers

```tsx
import { ProfilePageWrapper } from "@/components/ui/navigation";

export default function DoctorProfile() {
  return <ProfilePageWrapper>{/* Your profile content */}</ProfilePageWrapper>;
}
```

### Available Pre-built Wrappers

- `DashboardPageWrapper` - For the main dashboard
- `AppointmentsPageWrapper` - For appointments management
- `ProfilePageWrapper` - For profile editing
- `ClinicsPageWrapper` - For clinics and pricing
- `SchedulesPageWrapper` - For schedule management

### Advanced Customization

```tsx
import { DoctorPageWrapper } from "@/components/ui/navigation";

export default function CustomPage() {
  const customContent = (
    <div className="flex space-x-4 mt-4">
      <button className="bg-white/20 px-4 py-2 rounded">Action 1</button>
      <button className="bg-white/20 px-4 py-2 rounded">Action 2</button>
    </div>
  );

  return (
    <DoctorPageWrapper
      title="Custom Title"
      subtitle="Custom subtitle"
      showDate={true}
      showProfile={true}
      customHeaderContent={customContent}
    >
      {/* Your page content */}
    </DoctorPageWrapper>
  );
}
```

### Hide Header Completely

```tsx
import { DoctorLayout } from "@/components/ui/navigation";

export default function HeaderlessPage() {
  return (
    <DoctorLayout hideHeader={true}>
      {/* Page content without header */}
    </DoctorLayout>
  );
}
```

## Props Reference

### DoctorHeader Props

- `session` - Next-auth session object (required)
- `title` - Custom title (optional, defaults to welcome message)
- `subtitle` - Custom subtitle (optional, defaults to date)
- `showDate` - Show current date in subtitle (default: true)
- `showProfile` - Show profile card on right side (default: true)
- `customContent` - Additional content below title/subtitle

### DoctorLayout Props

- `children` - Page content (required)
- `headerTitle` - Custom header title
- `headerSubtitle` - Custom header subtitle
- `showDate` - Show date in header
- `showProfile` - Show profile card
- `customHeaderContent` - Custom content in header
- `hideHeader` - Completely hide the header

## Migration Guide

### Before (Old way)

```tsx
// Header was hardcoded in layout - no customization
export default function MyPage() {
  return (
    <DoctorLayout>
      <div>My content</div>
    </DoctorLayout>
  );
}
```

### After (New way)

```tsx
// Flexible header system
export default function MyPage() {
  return (
    <DoctorLayout
      headerTitle="My Custom Page"
      headerSubtitle="With custom subtitle"
    >
      <div>My content</div>
    </DoctorLayout>
  );
}
```

## Benefits

1. **Reusable** - Same header component across all pages
2. **Flexible** - Easily customize title, subtitle, and content
3. **Consistent** - Maintains design consistency
4. **Easy to Use** - Pre-built wrappers for common page types
5. **Maintainable** - Single source of truth for header styling
