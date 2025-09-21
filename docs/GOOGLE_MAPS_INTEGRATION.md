# Google Maps Integration - Implementation Guide

## Overview

This document describes the Google Maps integration implemented in the search page to display doctor and clinic locations.

## Components

### Map Component (`src/components/ui/Map.tsx`)

Enhanced reusable map component that displays doctors' clinic locations with the following features:

#### Features

- **Interactive markers** - Different colored markers for clinics, offices, and online consultations
- **Info windows** - Detailed information when clicking on markers
- **Responsive design** - Maintains aspect ratio and matches design system
- **Fallback UI** - Graceful fallback when API key is not configured
- **Loading states** - Shows loading spinner while map loads

#### Marker Types

- 🔵 **Blue markers** - General clinics
- 🟢 **Green markers** - Private offices (consultorios)
- 🟣 **Purple markers** - Online consultations

#### Props

```typescript
interface MapProps {
  doctors?: Doctor[]; // Array of doctors with clinic information
  className?: string; // Additional CSS classes
}
```

## Setup Instructions

### 1. Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Maps JavaScript API**
4. Create an API key in **Credentials**
5. Restrict the API key to your domain

### 2. Environment Configuration

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

⚠️ **Important**: The `NEXT_PUBLIC_` prefix is required for client-side access.

### 3. Dependencies

The following package is already installed:

```bash
npm install @react-google-maps/api
```

## Implementation Details

### Coordinate System

Currently uses mock coordinates based on major Bolivian cities:

- La Paz (default center)
- Santa Cruz
- Cochabamba
- Sucre
- Potosí
- Oruro
- Tarija
- Trinidad
- Cobija

For production, replace `getMockCoordinates()` with actual geocoding service.

### Integration Examples

The Map component can be imported and used anywhere in the application:

```tsx
import { Map } from "@/components/ui";
// or
import { Map } from "@/components";

// Usage in any component:
<Map doctors={doctorsData} className="custom-class" />;
```

#### Search Page Integration (`/app/search/page.tsx`):

```tsx
import { Map } from "@/components/ui";

// In the map section:
<Map doctors={transformedDoctors} />;
```

### Styling

- Matches existing design system colors
- Uses rounded corners (`rounded-lg`)
- Maintains aspect square ratio
- Includes map legend with color coding

## Fallback Behavior

When Google Maps API key is not configured:

- Shows placeholder with map icon
- Displays informative message
- Maintains layout structure
- No console errors

## Future Enhancements

1. **Real Geocoding**: Replace mock coordinates with actual geocoding service
2. **Clustering**: Add marker clustering for areas with many clinics
3. **Directions**: Add "Get Directions" button in info windows
4. **Filters**: Filter map markers based on search criteria
5. **Street View**: Add street view integration

## Troubleshooting

### Common Issues

1. **Map not loading**

   - Check if API key is set correctly
   - Verify API key has Maps JavaScript API enabled
   - Check browser console for API errors

2. **Markers not showing**

   - Verify doctors data includes clinic information
   - Check coordinates are valid (lat/lng format)

3. **Styling issues**
   - Ensure container has proper dimensions
   - Check for CSS conflicts

### Development Testing

Without API key, the component will show a fallback UI. This allows development to continue without requiring immediate API setup.

## Performance Considerations

- Map loads only when component mounts
- Markers are memoized to prevent unnecessary re-renders
- Map center adjusts automatically based on available markers
- Lazy loading of Google Maps script
