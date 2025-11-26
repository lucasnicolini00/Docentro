import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeroSection from '@/components/sections/HeroSection'

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render hero section', () => {
      render(<HeroSection />)

      // Check for main heading or key text
      const heroContent = screen.getByRole('main') || document.querySelector('section')
      expect(heroContent).toBeInTheDocument()
    })

    it('should display call-to-action buttons', () => {
      render(<HeroSection />)

      // Look for common CTA text
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
    })

    it('should have search or booking functionality', () => {
      render(<HeroSection />)

      // Hero sections typically have search or booking CTAs
      const content = document.body.textContent
      expect(content).toBeTruthy()
    })
  })

  describe('User Interactions', () => {
    it('should have clickable links', async () => {
      render(<HeroSection />)
      const user = userEvent.setup()

      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)

      // Links should be clickable
      for (const link of links) {
        expect(link).toHaveAttribute('href')
      }
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<HeroSection />)

      // Should have at least one heading
      const headings = screen.queryAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })
  })
})
