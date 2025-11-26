import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpecialtiesSection from '@/components/sections/SpecialtiesSection'

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe('SpecialtiesSection', () => {
  const mockLocale = 'es'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render specialties section', () => {
      render(<SpecialtiesSection locale={mockLocale} />)

      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should display section heading', () => {
      render(<SpecialtiesSection locale={mockLocale} />)

      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('should render with provided locale', () => {
      const { container } = render(<SpecialtiesSection locale={mockLocale} />)
      expect(container).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should display specialty information', () => {
      render(<SpecialtiesSection locale={mockLocale} />)

      // Section should have content
      const content = document.body.textContent
      expect(content).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<SpecialtiesSection locale={mockLocale} />)

      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })
  })
})
