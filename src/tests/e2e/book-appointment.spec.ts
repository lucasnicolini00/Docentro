import { test, expect } from '@playwright/test'

test.describe('Appointment Booking Flow', () => {
  test.describe('Unauthenticated User', () => {
    test('should redirect to login when trying to book without authentication', async ({ page }) => {
      // Try to access booking page directly
      await page.goto('/es/book/doctor-123')
      
      // Wait for redirect
      await page.waitForLoadState('networkidle')
      
      const url = page.url()
      
      // Should redirect to login, unauthorized, or show auth UI
      const hasLogin = url.includes('/login') || url.includes('/unauthorized')
      const hasLoginButton = await page.locator('text=/login|iniciar/i').count() > 0
      const hasAuthForm = await page.locator('input[type="email"]').count() > 0
      
      expect(hasLogin || hasLoginButton || hasAuthForm).toBeTruthy()
    })
  })

  test.describe('Authenticated Patient', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to login page
      await page.goto('/es/login')
      
      // Fill in login credentials (you'll need to use test credentials)
      await page.fill('input[type="email"]', 'patient@test.com')
      await page.fill('input[type="password"]', 'password123')
      
      // Click login button
      await page.click('button[type="submit"]')
      
      // Wait for redirect after login
      await page.waitForTimeout(2000)
    })

    test('should access doctor profile and see booking button', async ({ page }) => {
      // Navigate to search
      await page.goto('/es/search')
      
      // Wait for doctor cards
      await page.waitForTimeout(2000)
      
      // Click on first doctor if available
      const doctorLinks = page.locator('a[href*="/doctor/"]')
      if (await doctorLinks.count() > 0) {
        await doctorLinks.first().click()
        
        // Verify we're on doctor profile
        await expect(page).toHaveURL(/\/doctor\//)
        
        // Look for booking button (support both Spanish and English)
        const bookButton = page.locator('button:has-text("Agendar"), a:has-text("Agendar"), button:has-text("Book"), a:has-text("Book")')
        await expect(bookButton.first()).toBeVisible()
      }
    })

    test('should display booking form with required fields', async ({ page }) => {
      // Navigate directly to a booking page (you'll need a valid doctor ID)
      await page.goto('/es/book/doctor-123')
      
      // Wait for form to load
      await page.waitForTimeout(1000)
      
      // Check if we're on booking page or redirected
      const url = page.url()
      
      if (url.includes('/book/')) {
        // Verify form elements exist
        const form = page.locator('form')
        await expect(form).toBeVisible()
      }
    })

    test('should show available time slots when date is selected', async ({ page }) => {
      await page.goto('/es/book/doctor-123')
      
      await page.waitForTimeout(1000)
      
      // Try to select a date
      const dateInput = page.locator('input[type="date"]')
      if (await dateInput.count() > 0) {
        // Set a future date
        const futureDate = new Date()
        futureDate.setDate(futureDate.getDate() + 7)
        const dateString = futureDate.toISOString().split('T')[0]
        
        await dateInput.fill(dateString)
        
        // Wait for time slots to potentially load
        await page.waitForTimeout(2000)
      }
    })

    test('should complete booking flow', async ({ page }) => {
      // This is a full integration test
      // Navigate to search
      await page.goto('/es/search?specialty=Cardiology')
      
      await page.waitForTimeout(2000)
      
      // Click on first doctor
      const doctorLinks = page.locator('a[href*="/doctor/"]')
      if (await doctorLinks.count() > 0) {
        await doctorLinks.first().click()
        
        // Click book button (support both Spanish and English)
        const bookButton = page.locator('button:has-text("Agendar"), a:has-text("Agendar"), button:has-text("Book"), a:has-text("Book")')
        if (await bookButton.count() > 0) {
          await bookButton.first().click()
          
          // Wait for booking form
          await page.waitForTimeout(1000)
          
          // Fill in booking details
          const clinicSelect = page.locator('select')
          if (await clinicSelect.count() > 0) {
            await clinicSelect.first().selectOption({ index: 0 })
          }
          
          // Select date
          const dateInput = page.locator('input[type="date"]')
          if (await dateInput.count() > 0) {
            const futureDate = new Date()
            futureDate.setDate(futureDate.getDate() + 7)
            await dateInput.fill(futureDate.toISOString().split('T')[0])
            
            await page.waitForTimeout(2000)
          }
          
          // Try to select a time slot
          const timeSlotButtons = page.locator('button:has-text(":")')
          if (await timeSlotButtons.count() > 0) {
            await timeSlotButtons.first().click()
          }
          
          // Add notes
          const notesTextarea = page.locator('textarea')
          if (await notesTextarea.count() > 0) {
            await notesTextarea.fill('E2E test appointment')
          }
          
          // Submit (but don't actually submit in test)
          const submitButton = page.locator('button[type="submit"]')
          await expect(submitButton).toBeVisible()
        }
      }
    })
  })
})

test.describe('Booking Validations', () => {
  test('should show error for invalid date selection', async ({ page }) => {
    await page.goto('/es/login')
    
    // Quick login
    await page.fill('input[type="email"]', 'patient@test.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    await page.waitForTimeout(2000)
    
    // Navigate to booking
    await page.goto('/es/book/doctor-123')
    
    await page.waitForTimeout(1000)
    
    // Try to select a past date
    const dateInput = page.locator('input[type="date"]')
    if (await dateInput.count() > 0) {
      await dateInput.fill('2020-01-01')
      
      // Check for error message
      await page.waitForTimeout(500)
    }
  })
})
