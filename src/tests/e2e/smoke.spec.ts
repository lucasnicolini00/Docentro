import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Verify page loads
    await expect(page).toHaveTitle(/docentro/i)
    
    // Verify main elements are visible
    await expect(page.getByText(/docentro/i)).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    
    // Check for hero content
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check for navbar
    const navbar = page.locator('header')
    await expect(navbar).toBeVisible()
    
    // Check for logo
    const logo = page.getByText('Docentro')
    await expect(logo).toBeVisible()
  })

  test('should navigate to search page from navbar', async ({ page }) => {
    await page.goto('/')
    
    // Look for search link in mobile menu or navbar
    const menuButton = page.locator('button:has-text("☰"), button >> svg')
    if (await menuButton.count() > 0) {
      await menuButton.first().click()
      await page.waitForTimeout(500)
    }
    
    // Click search link
    const searchLink = page.locator('a[href*="/search"]')
    if (await searchLink.count() > 0) {
      await searchLink.first().click()
      await expect(page).toHaveURL(/\/search/)
    }
  })
})

test.describe('Authentication', () => {
  test('should display login and register buttons when not authenticated', async ({ page }) => {
    await page.goto('/')
    
    // Look for login/register buttons
    const loginButton = page.locator('text=/login|iniciar/i')
    const registerButton = page.locator('text=/register|registr/i')
    
    const hasAuthButtons = (await loginButton.count() > 0) || (await registerButton.count() > 0)
    expect(hasAuthButtons).toBeTruthy()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')
    
    // Click login button
    const loginButton = page.locator('a:has-text("Iniciar"), a:has-text("Login")')
    if (await loginButton.count() > 0) {
      await loginButton.first().click()
      await expect(page).toHaveURL(/\/login/)
    }
  })

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/')
    
    // Click register button
    const registerButton = page.locator('a:has-text("Registr")')
    if (await registerButton.count() > 0) {
      await registerButton.first().click()
      await expect(page).toHaveURL(/\/register/)
    }
  })
})
