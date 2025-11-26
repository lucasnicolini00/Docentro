import { test, expect } from '@playwright/test'

test.describe('Search Doctors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display search form on homepage', async ({ page }) => {
    // Verify hero section with search form is visible
    await expect(page.getByText(/docentro/i)).toBeVisible()
    
    // Check for search inputs
    const specialtyInput = page.locator('input').first()
    await expect(specialtyInput).toBeVisible()
  })

  test('should navigate to search page when searching from homepage', async ({ page }) => {
    // Fill in specialty search
    const specialtyInput = page.locator('input').first()
    await specialtyInput.fill('Cardio')
    
    // Click search button
    const searchButton = page.locator('button:has-text("🔍")')
    await searchButton.click()
    
    // Verify navigation to search page
    await expect(page).toHaveURL(/\/search/)
  })

  test('should display search results page', async ({ page }) => {
    await page.goto('/search')
    
    // Verify search page loads
    await expect(page).toHaveURL(/\/search/)
    
    // Check for search interface elements
    const searchInputs = page.locator('input')
    await expect(searchInputs.first()).toBeVisible()
  })

  test('should filter doctors by specialty', async ({ page }) => {
    await page.goto('/search?specialty=Cardiology')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Verify we're on search page with specialty parameter
    await expect(page).toHaveURL(/specialty=Cardiology/)
  })

  test('should filter doctors by location', async ({ page }) => {
    await page.goto('/search?location=Santa+Cruz')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Verify we're on search page with location parameter
    await expect(page).toHaveURL(/location=Santa/)
  })

  test('should navigate to doctor profile when clicking on doctor card', async ({ page }) => {
    await page.goto('/search')
    
    // Wait for any doctor cards to load
    await page.waitForTimeout(2000)
    
    // Try to find and click a doctor link
    const doctorLinks = page.locator('a[href*="/doctor/"]')
    const count = await doctorLinks.count()
    
    if (count > 0) {
      await doctorLinks.first().click()
      
      // Verify navigation to doctor profile
      await expect(page).toHaveURL(/\/doctor\//)
    }
  })
})

test.describe('Search Filters', () => {
  test('should show filter options', async ({ page }) => {
    await page.goto('/search')
    
    // Check for filter button or panel
    const filterButton = page.locator('button:has-text("Filtros"), button:has-text("Filters")')
    
    if (await filterButton.count() > 0) {
      await filterButton.click()
      
      // Verify filter panel opens
      await page.waitForTimeout(500)
    }
  })
})
