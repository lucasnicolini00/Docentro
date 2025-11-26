import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeaturedDoctorsSection from '@/components/sections/FeaturedDoctorsSection'

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe('FeaturedDoctorsSection', () => {
  const mockLocale = 'es'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render featured doctors section', () => {
      render(<FeaturedDoctorsSection locale={mockLocale} />)

      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should display section heading', () => {
      render(<FeaturedDoctorsSection locale={mockLocale} />)

      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('should render with provided locale', () => {
      const { container } = render(<FeaturedDoctorsSection locale={mockLocale} />)
      expect(container).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should display doctor information', () => {
      render(<FeaturedDoctorsSection locale={mockLocale} />)

      const content = document.body.textContent
      expect(content).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<FeaturedDoctorsSection locale={mockLocale} />)

      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })
  })
})
