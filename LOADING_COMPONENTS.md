# Loading States & Components

This document describes all the loading states and components available in the Docentro application.

## Components

### 1. LoadingSpinner

A simple, reusable spinner component.

```tsx
import LoadingSpinner from '@/components/LoadingSpinner';

<LoadingSpinner size="sm" | "md" | "lg" className="additional-classes" />
```

**Props:**

- `size`: Size of the spinner (sm: 16px, md: 20px, lg: 24px)
- `className`: Additional CSS classes

### 2. LoadingButton

A button with built-in loading state management.

```tsx
import LoadingButton from '@/components/LoadingButton';

<LoadingButton
  isLoading={isLoading}
  loadingText="Saving..."
  variant="primary" | "secondary" | "danger" | "success"
  size="sm" | "md" | "lg"
  type="submit"
  onClick={handleClick}
>
  Save Changes
</LoadingButton>
```

**Props:**

- `isLoading`: Boolean to control loading state
- `loadingText`: Text to show when loading (default: "Loading...")
- `variant`: Button color variant
- `size`: Button size
- All standard button props are supported

### 3. PulseButton

A button that shows a pulsing animation when processing.

```tsx
import PulseButton from "@/components/PulseButton";

<PulseButton isProcessing={isProcessing} variant="primary" size="md">
  Process Data
</PulseButton>;
```

### 4. PageLoading

Full-page loading component.

```tsx
import PageLoading from "@/components/PageLoading";

<PageLoading message="Loading dashboard..." />;
```

### 5. Skeleton Components

Loading placeholders for content.

```tsx
import { Skeleton, DoctorCardSkeleton, ProfileSkeleton, ExperienceSkeleton } from '@/components/Skeleton';

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Pre-built skeletons
<DoctorCardSkeleton />
<ProfileSkeleton />
<ExperienceSkeleton />
```

### 6. Toast Notifications

User feedback notifications.

```tsx
import Toast, { useToast } from "@/components/Toast";

function MyComponent() {
  const { toast, showToast, hideToast } = useToast();

  const handleSuccess = () => {
    showToast("Profile saved successfully!", "success");
  };

  return (
    <>
      <button onClick={handleSuccess}>Save</button>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
```

## Implementation Examples

### Form with Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await saveData();
    showToast("Data saved successfully!", "success");
  } catch (error) {
    showToast("Error saving data", "error");
  } finally {
    setIsLoading(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* form fields */}
    <LoadingButton
      type="submit"
      isLoading={isLoading}
      loadingText="Saving..."
      variant="primary"
    >
      Save Changes
    </LoadingButton>
  </form>
);
```

### Search with Loading

```tsx
const [isSearching, setIsSearching] = useState(false);

const handleSearch = async () => {
  setIsSearching(true);
  try {
    await performSearch();
  } finally {
    setIsSearching(false);
  }
};

return (
  <LoadingButton
    onClick={handleSearch}
    isLoading={isSearching}
    loadingText="Searching..."
  >
    Search
  </LoadingButton>
);
```

### Page with Loading Skeleton

```tsx
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  loadData().then((result) => {
    setData(result);
    setIsLoading(false);
  });
}, []);

if (isLoading) {
  return (
    <div className="space-y-4">
      <ProfileSkeleton />
      <DoctorCardSkeleton />
      <DoctorCardSkeleton />
    </div>
  );
}

return <DataComponent data={data} />;
```

## Current Implementation Status

### ✅ Implemented Components

- **LoadingSpinner**: Basic spinner with size variants
- **LoadingButton**: Button with loading state and spinner
- **PulseButton**: Button with pulse animation
- **PageLoading**: Full-page loading screen
- **Skeleton**: Various skeleton loaders
- **Toast**: Notification system with hook

### ✅ Pages with Loading States

- **Login Page**: LoadingButton for form submission
- **Register Page**: LoadingButton for account creation
- **Doctor Profile Form**: LoadingButton for save and add experience
- **Patient Profile Form**: LoadingButton for save
- **Search Filters**: LoadingButton for search functionality

### 🎯 Best Practices

1. **Always provide feedback**: Never leave users wondering if something is happening
2. **Use appropriate loading types**:
   - Buttons: LoadingButton for actions
   - Pages: PageLoading for full page loads
   - Content: Skeleton for content placeholders
3. **Consistent timing**: Use reasonable delays (300-500ms) for better UX
4. **Error handling**: Always handle loading states in try/catch blocks
5. **Accessibility**: All components include proper ARIA labels

### 🔧 Customization

All components support:

- Custom CSS classes via `className` prop
- Tailwind CSS utilities for styling
- Size variants (sm, md, lg)
- Color variants where applicable
- Standard HTML props (onClick, disabled, etc.)

This loading system provides a comprehensive and consistent user experience across the entire Docentro application.
