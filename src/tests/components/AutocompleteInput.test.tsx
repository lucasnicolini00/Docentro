import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AutocompleteInput from '@/components/ui/forms/AutocompleteInput'

describe('AutocompleteInput', () => {
  const mockOnChange = vi.fn()
  const mockOptions = ['Cardiology', 'Neurology', 'Pediatrics', 'Dermatology']

  const defaultProps = {
    value: '',
    onChange: mockOnChange,
    options: mockOptions,
    placeholder: 'Select specialty',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render input with placeholder', () => {
      render(<AutocompleteInput {...defaultProps} />)

      expect(screen.getByPlaceholderText('Select specialty')).toBeInTheDocument()
    })

    it('should render with initial value', () => {
      render(<AutocompleteInput {...defaultProps} value="Cardiology" />)

      expect(screen.getByDisplayValue('Cardiology')).toBeInTheDocument()
    })

    it('should render with default variant', () => {
      const { container } = render(<AutocompleteInput {...defaultProps} />)

      const input = container.querySelector('input')
      expect(input).toHaveClass('rounded-lg')
    })

    it('should render with hero variant', () => {
      const { container } = render(<AutocompleteInput {...defaultProps} variant="hero" />)

      const input = container.querySelector('input')
      expect(input).toHaveClass('rounded-xl')
    })

    it('should render chevron icon', () => {
      const { container } = render(<AutocompleteInput {...defaultProps} />)

      const chevron = container.querySelector('svg')
      expect(chevron).toBeInTheDocument()
    })

    it('should render with custom icon', () => {
      render(<AutocompleteInput {...defaultProps} icon="🔍" />)

      expect(screen.getByText('🔍')).toBeInTheDocument()
    })
  })

  describe('Dropdown Behavior', () => {
    it('should open dropdown on input focus', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.click(input)

      expect(screen.getByText('Cardiology')).toBeInTheDocument()
      expect(screen.getByText('Neurology')).toBeInTheDocument()
    })



    it('should close dropdown on Escape key', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.click(input)

      expect(screen.getByText('Cardiology')).toBeInTheDocument()

      await user.keyboard('{Escape}')

      expect(screen.queryByText('Cardiology')).not.toBeInTheDocument()
    })

    it('should toggle dropdown on chevron click', async () => {
      const { container } = render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const chevronContainer = container.querySelector('.cursor-pointer')
      if (chevronContainer) {
        await user.click(chevronContainer)
        expect(screen.getByText('Cardiology')).toBeInTheDocument()

        await user.click(chevronContainer)
        expect(screen.queryByText('Cardiology')).not.toBeInTheDocument()
      }
    })
  })

  describe('Filtering', () => {
    it('should filter options based on input value', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.type(input, 'card')

      expect(screen.getByText('Cardiology')).toBeInTheDocument()
      expect(screen.queryByText('Neurology')).not.toBeInTheDocument()
    })

    it('should be case insensitive when filtering', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.type(input, 'CARD')

      expect(screen.getByText('Cardiology')).toBeInTheDocument()
    })

    it('should show all options when input is empty', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.click(input)

      expect(screen.getByText('Cardiology')).toBeInTheDocument()
      expect(screen.getByText('Neurology')).toBeInTheDocument()
      expect(screen.getByText('Pediatrics')).toBeInTheDocument()
      expect(screen.getByText('Dermatology')).toBeInTheDocument()
    })


  })

  describe('User Interactions', () => {
    it('should call onChange when typing', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.type(input, 'test')

      expect(mockOnChange).toHaveBeenCalled()
    })

    it('should call onChange with selected option', async () => {
      render(<AutocompleteInput {...defaultProps} />)
      const user = userEvent.setup()

      const input = screen.getByPlaceholderText('Select specialty')
      await user.click(input)

      const option = screen.getByText('Cardiology')
      await user.click(option)

      expect(mockOnChange).toHaveBeenCalledWith('Cardiology')
    })
  })

  describe('Accessibility', () => {
    it('should have autocomplete off', () => {
      render(<AutocompleteInput {...defaultProps} />)

      const input = screen.getByPlaceholderText('Select specialty')
      expect(input).toHaveAttribute('autocomplete', 'off')
    })

    it('should have proper input type', () => {
      render(<AutocompleteInput {...defaultProps} />)

      const input = screen.getByPlaceholderText('Select specialty')
      expect(input).toHaveAttribute('type', 'text')
    })
  })
})
