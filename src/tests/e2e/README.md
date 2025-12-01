# E2E Testing Guide

## Overview
End-to-end tests for critical user flows using Playwright.

## Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (recommended for development)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test e2e/search-doctors.spec.ts
```

## Test Files

### 1. `smoke.spec.ts` - Basic Smoke Tests
- Homepage loads
- Navigation works
- Authentication buttons visible

### 2. `search-doctors.spec.ts` - Doctor Search
- Search from homepage
- Filter by specialty
- Filter by location
- Navigate to doctor profile

### 3. `book-appointment.spec.ts` - Appointment Booking
- Authentication required
- Booking form validation
- Complete booking flow
- Error handling

## Test Data

**Test Patient Credentials:**
- Email: `patient@test.com`
- Password: `password123`

**Note:** You'll need to create this test user in your database or update the credentials in the test files.

## Prerequisites

1. **Local PostgreSQL Database:**
   ```bash
   # Install PostgreSQL if you haven't already
   # macOS: brew install postgresql@16
   # Ubuntu: sudo apt install postgresql
   
   # Start PostgreSQL
   # macOS: brew services start postgresql@16
   # Ubuntu: sudo systemctl start postgresql
   ```

2. **Setup Test Database:**
   ```bash
   # Run the setup script to create and seed test database
   npm run test:e2e:setup
   ```
   
   **Or manually:**
   ```bash
   # Create test database
   psql -U postgres -c "CREATE DATABASE docentro_test;"
   
   # Load .env.test variables
   export $(cat .env.test | grep -v '^#' | xargs)
   
   # Run migrations and seed
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. **Environment Variables:**
   - The `.env.test` file is already configured for local testing
   - Update `DATABASE_URL` if your local PostgreSQL has different credentials
   - Default: `postgresql://postgres:postgres@localhost:5432/docentro_test`

## Writing New E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path')
    
    // Interact with page
    await page.click('button')
    
    // Assert
    await expect(page).toHaveURL(/expected/)
  })
})
```

## Best Practices

1. **Use data-testid for stable selectors:**
   ```typescript
   await page.click('[data-testid="book-button"]')
   ```

2. **Wait for network idle:**
   ```typescript
   await page.waitForLoadState('networkidle')
   ```

3. **Use fixtures for authentication:**
   ```typescript
   test.use({ storageState: 'auth.json' })
   ```

4. **Keep tests independent:**
   - Each test should work in isolation
   - Don't rely on test execution order

## CI/CD Integration

E2E tests run automatically in GitHub Actions on:
- Push to `main` or `develop`
- Pull requests

View test results in the Actions tab.

## Debugging Failed Tests

```bash
# Run with trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip

# Run specific test with debug
npx playwright test --debug e2e/book-appointment.spec.ts
```

## Coverage

Current E2E test coverage:
- ✅ Homepage & Navigation
- ✅ Doctor Search & Filters
- ✅ Appointment Booking Flow
- ✅ Authentication
- ⏳ Doctor Registration (TODO)
- ⏳ Profile Management (TODO)
