import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load test environment variables if .env.test exists
const envTestPath = path.resolve(__dirname, '.env.test')
if (fs.existsSync(envTestPath)) {
  dotenv.config({ path: envTestPath })
}

// Fallback to .env if DATABASE_URL not set
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '.env') })
}

export default defineConfig({
  testDir: './src/tests/e2e',
  fullyParallel: false, // Run sequentially to avoid database conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry once on failure
  workers: 1, // Single worker to avoid database race conditions
  reporter: 'html',
  timeout: 60000, // Increased timeout for slower database connections
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000, // Increased action timeout
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // 3 minutes for server startup and database connection
    env: {
      DATABASE_URL: process.env.DATABASE_URL || '',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    },
  },
})
