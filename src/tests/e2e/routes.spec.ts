import { test, expect } from '@playwright/test'

test.describe('Route Accessibility', () => {
  const publicRoutes = [
    { path: '/es', name: 'Homepage (ES)' },
    { path: '/en', name: 'Homepage (EN)' },
    { path: '/es/search', name: 'Search Page (ES)' },
    { path: '/en/search', name: 'Search Page (EN)' },
    { path: '/es/login', name: 'Login Page (ES)' },
    { path: '/en/login', name: 'Login Page (EN)' },
    { path: '/es/register', name: 'Register Page (ES)' },
    { path: '/en/register', name: 'Register Page (EN)' },
  ]

  const protectedRoutes = [
    { path: '/es/dashboard/patient', name: 'Patient Dashboard (ES)' },
    { path: '/en/dashboard/patient', name: 'Patient Dashboard (EN)' },
    { path: '/es/dashboard/doctor', name: 'Doctor Dashboard (ES)' },
    { path: '/en/dashboard/doctor', name: 'Doctor Dashboard (EN)' },
    { path: '/es/dashboard/patient/profile', name: 'Patient Profile (ES)' },
    { path: '/es/dashboard/doctor/profile', name: 'Doctor Profile (ES)' },
    { path: '/es/dashboard/doctor/schedules', name: 'Doctor Schedules (ES)' },
    { path: '/es/dashboard/doctor/clinics', name: 'Doctor Clinics (ES)' },
    { path: '/es/dashboard/doctor/appointments', name: 'Doctor Appointments (ES)' },
    { path: '/es/dashboard/patient/appointments', name: 'Patient Appointments (ES)' },
  ]

  test.describe('Public Routes', () => {
    for (const route of publicRoutes) {
      test(`should load ${route.name}`, async ({ page }) => {
        await page.goto(route.path)
        
        // Wait for page to load
        await page.waitForLoadState('domcontentloaded')
        
        // Check that we're on the expected URL (or redirected appropriately)
        const url = page.url()
        expect(url).toContain(route.path.split('/')[1]) // Check locale is present
        
        // Verify no critical errors
        const errorHeading = page.getByRole('heading', { name: /error|404|500/i })
        const errorCount = await errorHeading.count()
        expect(errorCount).toBe(0)
        
        // Verify page has content (not blank)
        const body = await page.textContent('body')
        expect(body).toBeTruthy()
        expect(body!.length).toBeGreaterThan(100)
      })
    }
  })

  test.describe('Protected Routes (Unauthenticated)', () => {
    for (const route of protectedRoutes) {
      test(`should redirect ${route.name} when not authenticated`, async ({ page }) => {
        await page.goto(route.path)
        
        // Wait for redirect
        await page.waitForLoadState('networkidle')
        
        const url = page.url()
        
        // Should redirect to login or unauthorized
        const isRedirected = url.includes('/login') || url.includes('/unauthorized')
        expect(isRedirected).toBeTruthy()
      })
    }
  })

  test.describe('API Routes', () => {
    test('should have working auth session endpoint', async ({ request }) => {
      const response = await request.get('/api/auth/session')
      expect(response.status()).toBe(200)
    })
  })

  test.describe('Locale Redirects', () => {
    test('should redirect root to default locale', async ({ page }) => {
      await page.goto('/')
      
      // Should redirect to /es or /en
      await page.waitForLoadState('networkidle')
      const url = page.url()
      expect(url).toMatch(/\/(es|en)/)
    })
  })

  test.describe('404 Handling', () => {
    test('should handle non-existent routes gracefully', async ({ page }) => {
      const response = await page.goto('/es/this-route-does-not-exist-12345')
      
      await page.waitForLoadState('domcontentloaded')
      
      // Next.js might show 404, redirect, or show not-found page
      const url = page.url()
      const statusCode = response?.status()
      
      // Should either:
      // 1. Show 404 status
      // 2. Show not-found page
      // 3. Redirect to homepage
      const has404Status = statusCode === 404
      const has404Text = await page.getByText(/404|not found|no encontrado/i).count() > 0
      const isHomepage = url.endsWith('/es') || url.endsWith('/en')
      
      expect(has404Status || has404Text || isHomepage).toBeTruthy()
    })
  })
})
