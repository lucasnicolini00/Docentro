import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoadingButton from '@/components/ui/buttons/LoadingButton'

describe('LoadingButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render button with children', () => {
      render(<LoadingButton>Click me</LoadingButton>)

      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should render with primary variant by default', () => {
      render(<LoadingButton>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-600')
    })

    it('should render with secondary variant', () => {
      render(<LoadingButton variant="secondary">Cancel</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-gray-600')
    })

    it('should render with danger variant', () => {
      render(<LoadingButton variant="danger">Delete</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-red-600')
    })

    it('should render with success variant', () => {
      render(<LoadingButton variant="success">Save</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-green-600')
    })

    it('should render with small size', () => {
      render(<LoadingButton size="sm">Small</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-3', 'py-2', 'text-sm')
    })

    it('should render with medium size by default', () => {
      render(<LoadingButton>Medium</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-4', 'py-2')
    })

    it('should render with large size', () => {
      render(<LoadingButton size="lg">Large</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg')
    })
  })

  describe('Loading State', () => {
    it('should show loading text when isLoading is true', () => {
      render(<LoadingButton isLoading loadingText="Loading...">Submit</LoadingButton>)

      expect(screen.queryByText('Loading...')).toBeInTheDocument()
      expect(screen.queryByText('Submit')).not.toBeInTheDocument()
    })

    it('should show default loading text when no loadingText provided', () => {
      render(<LoadingButton isLoading>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should disable button when isLoading is true', () => {
      render(<LoadingButton isLoading>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should show loading spinner when isLoading is true', () => {
      const { container } = render(<LoadingButton isLoading>Submit</LoadingButton>)

      // Loading spinner should be present
      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should disable button when disabled prop is true', () => {
      render(<LoadingButton disabled>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should have opacity-50 class when disabled', () => {
      render(<LoadingButton disabled>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('disabled:opacity-50')
    })

    it('should disable button when both disabled and isLoading are true', () => {
      render(<LoadingButton disabled isLoading>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('User Interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn()
      render(<LoadingButton onClick={handleClick}>Click me</LoadingButton>)

      const user = userEvent.setup()
      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn()
      render(<LoadingButton onClick={handleClick} disabled>Click me</LoadingButton>)

      const user = userEvent.setup()
      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should not call onClick when loading', async () => {
      const handleClick = vi.fn()
      render(<LoadingButton onClick={handleClick} isLoading>Click me</LoadingButton>)

      const user = userEvent.setup()
      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<LoadingButton className="custom-class">Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should accept type prop', () => {
      render(<LoadingButton type="submit">Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should forward other button props', () => {
      render(<LoadingButton data-testid="custom-button">Submit</LoadingButton>)

      expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<LoadingButton>Submit</LoadingButton>)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should have cursor-not-allowed when disabled', () => {
      render(<LoadingButton disabled>Submit</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('disabled:cursor-not-allowed')
    })
  })
})
