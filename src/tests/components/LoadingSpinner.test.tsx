import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/ui/feedback/LoadingSpinner'

describe('LoadingSpinner', () => {
  describe('Rendering', () => {
    it('should render loading spinner', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    it('should render with medium size by default', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.querySelector('.w-5')
      expect(spinner).toBeInTheDocument()
    })

    it('should render with small size', () => {
      const { container } = render(<LoadingSpinner size="sm" />)

      const spinner = container.querySelector('.w-4')
      expect(spinner).toBeInTheDocument()
    })

    it('should render with large size', () => {
      const { container } = render(<LoadingSpinner size="lg" />)

      const spinner = container.querySelector('.w-6')
      expect(spinner).toBeInTheDocument()
    })

    it('should have spinning animation', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('should have rounded full shape', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.querySelector('.rounded-full')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      const { container } = render(<LoadingSpinner className="custom-class" />)

      const spinner = container.querySelector('.custom-class')
      expect(spinner).toBeInTheDocument()
    })

    it('should combine custom className with default classes', () => {
      const { container } = render(<LoadingSpinner className="text-blue-500" />)

      const spinner = container.querySelector('.animate-spin.text-blue-500')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have role status', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    it('should have aria-label', () => {
      render(<LoadingSpinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveAttribute('aria-label')
    })

    it('should have screen reader text', () => {
      const { container } = render(<LoadingSpinner />)

      const srText = container.querySelector('.sr-only')
      expect(srText).toBeInTheDocument()
    })
  })

  describe('Visual Styles', () => {
    it('should have border styling', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.querySelector('.border-2')
      expect(spinner).toBeInTheDocument()
    })

    it('should have transparent top border', () => {
      const { container } = render(<LoadingSpinner />)

      const spinner = container.querySelector('.border-t-transparent')
      expect(spinner).toBeInTheDocument()
    })
  })
})
