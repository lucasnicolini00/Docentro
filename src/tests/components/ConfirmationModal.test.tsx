import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmationModal from '@/components/ui/modals/ConfirmationModal'

describe('ConfirmationModal', () => {
  const mockOnClose = vi.fn()
  const mockOnConfirm = vi.fn()

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render modal when isOpen is true', () => {
      render(<ConfirmationModal {...defaultProps} />)

      expect(screen.getByText('Confirm Action')).toBeInTheDocument()
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument()
    })

    it('should not render modal when isOpen is false', () => {
      render(<ConfirmationModal {...defaultProps} isOpen={false} />)

      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
    })

    it('should render with danger type by default', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} />)

      const iconContainer = container.querySelector('.bg-red-100')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render with warning type', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} type="warning" />)

      const iconContainer = container.querySelector('.bg-yellow-100')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render with info type', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} type="info" />)

      const iconContainer = container.querySelector('.bg-blue-100')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render custom confirm text', () => {
      render(<ConfirmationModal {...defaultProps} confirmText="Yes, Delete" />)

      expect(screen.getByText('Yes, Delete')).toBeInTheDocument()
    })

    it('should render custom cancel text', () => {
      render(<ConfirmationModal {...defaultProps} cancelText="No, Keep" />)

      expect(screen.getByText('No, Keep')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      render(<ConfirmationModal {...defaultProps} />)
      const user = userEvent.setup()

      const closeButton = screen.getByRole('button', { name: '' }) // X button
      await user.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when cancel button is clicked', async () => {
      render(<ConfirmationModal {...defaultProps} />)
      const user = userEvent.setup()

      const cancelButton = screen.getByRole('button', { name: /cancel|cancelar/i })
      await user.click(cancelButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onConfirm when confirm button is clicked', async () => {
      render(<ConfirmationModal {...defaultProps} />)
      const user = userEvent.setup()

      const confirmButton = screen.getByRole('button', { name: /confirm|confirmar/i })
      await user.click(confirmButton)

      expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when backdrop is clicked', async () => {
      const { container } = render(<ConfirmationModal {...defaultProps} />)
      const user = userEvent.setup()

      const backdrop = container.querySelector('.bg-black\\/50')
      if (backdrop) {
        await user.click(backdrop)
        expect(mockOnClose).toHaveBeenCalled()
      }
    })
  })

  describe('Loading State', () => {
    it('should disable buttons when isLoading is true', () => {
      render(<ConfirmationModal {...defaultProps} isLoading />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toBeDisabled()
      })
    })

    it('should show loading spinner when isLoading is true', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} isLoading />)

      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('should show "..." text when isLoading is true', () => {
      render(<ConfirmationModal {...defaultProps} isLoading />)

      expect(screen.getByText('...')).toBeInTheDocument()
    })

    it('should not call onClose when backdrop is clicked during loading', async () => {
      const { container } = render(<ConfirmationModal {...defaultProps} isLoading />)
      const user = userEvent.setup()

      const backdrop = container.querySelector('.bg-black\\/50')
      if (backdrop) {
        await user.click(backdrop)
        expect(mockOnClose).not.toHaveBeenCalled()
      }
    })
  })

  describe('Modal Structure', () => {
    it('should have alert icon', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} />)

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should have backdrop with blur effect', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} />)

      const backdrop = container.querySelector('.backdrop-blur-sm')
      expect(backdrop).toBeInTheDocument()
    })

    it('should have centered modal container', () => {
      const { container } = render(<ConfirmationModal {...defaultProps} />)

      const modalContainer = container.querySelector('.items-center.justify-center')
      expect(modalContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button roles', () => {
      render(<ConfirmationModal {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have heading for title', () => {
      render(<ConfirmationModal {...defaultProps} />)

      const heading = screen.getByRole('heading', { name: /confirm action/i })
      expect(heading).toBeInTheDocument()
    })
  })
})
