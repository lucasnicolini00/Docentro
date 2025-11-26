import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientProfileForm from '@/components/ui/forms/PatientProfileForm'
import { updatePatientProfile } from '@/lib/actions'
import toast from 'react-hot-toast'

vi.mock('@/lib/actions', () => ({
  updatePatientProfile: vi.fn(),
}))

vi.mock('@/hooks', () => ({
  useLocalePath: () => (path: string) => path,
}))

const mockPatient = {
  id: 'patient-123',
  name: 'John',
  surname: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  birthdate: new Date('1990-01-01'),
  gender: 'MALE',
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
  },
}

describe('PatientProfileForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render patient profile form with initial values', () => {
      render(<PatientProfileForm patient={mockPatient} />)

      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
      expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument()
    })

    it('should display all form fields', () => {
      render(<PatientProfileForm patient={mockPatient} />)

      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save|guardar/i })).toBeInTheDocument()
    })

    it('should render gender select with options', () => {
      render(<PatientProfileForm patient={mockPatient} />)

      const genderSelect = screen.getByRole('combobox', { name: /gender|género/i })
      expect(genderSelect).toBeInTheDocument()
    })

    it('should render birthdate input', () => {
      render(<PatientProfileForm patient={mockPatient} />)

      const birthdateInput = screen.getByDisplayValue('1990-01-01')
      expect(birthdateInput).toBeInTheDocument()
      expect(birthdateInput).toHaveAttribute('type', 'date')
    })
  })

  describe('User Interactions', () => {
    it('should update form fields when user types', async () => {
      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const nameInput = screen.getByDisplayValue('John')
      await user.clear(nameInput)
      await user.type(nameInput, 'Jane')

      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument()
    })

    it('should update email field', async () => {
      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const emailInput = screen.getByDisplayValue('john@example.com')
      await user.clear(emailInput)
      await user.type(emailInput, 'jane@example.com')

      expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    })

    it('should update phone field', async () => {
      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const phoneInput = screen.getByDisplayValue('+1234567890')
      await user.clear(phoneInput)
      await user.type(phoneInput, '+0987654321')

      expect(screen.getByDisplayValue('+0987654321')).toBeInTheDocument()
    })

    it('should update gender selection', async () => {
      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const genderSelect = screen.getByRole('combobox', { name: /gender|género/i })
      await user.selectOptions(genderSelect, 'femenino')

      expect(genderSelect).toHaveValue('femenino')
    })
  })

  describe('Form Submission', () => {
    it('should call updatePatientProfile on form submission', async () => {
      vi.mocked(updatePatientProfile).mockResolvedValue({
        success: true,
        data: mockPatient,
      })

      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(updatePatientProfile).toHaveBeenCalled()
      })
    })

    it('should show success toast on successful submission', async () => {
      vi.mocked(updatePatientProfile).mockResolvedValue({
        success: true,
        data: mockPatient,
      })

      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled()
      })
    })

    it('should show error toast on failed submission', async () => {
      vi.mocked(updatePatientProfile).mockResolvedValue({
        success: false,
        error: 'Update failed',
      })

      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled()
      })
    })

    it('should handle network errors gracefully', async () => {
      vi.mocked(updatePatientProfile).mockRejectedValue(new Error('Network error'))

      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled()
      })
    })
  })

  describe('Loading States', () => {
    it('should show loading state during submission', async () => {
      vi.mocked(updatePatientProfile).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true, data: mockPatient }), 100))
      )

      render(<PatientProfileForm patient={mockPatient} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      // Button should show loading text
      expect(screen.getByText(/saving|guardando/i)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle patient with no phone number', () => {
      const patientNoPhone = { ...mockPatient, phone: null, user: { ...mockPatient.user, phone: null } }
      render(<PatientProfileForm patient={patientNoPhone} />)

      const phoneInput = screen.getByPlaceholderText(/\+591/i)
      expect(phoneInput).toHaveValue('')
    })

    it('should handle patient with no birthdate', () => {
      const patientNoBirthdate = { ...mockPatient, birthdate: null }
      render(<PatientProfileForm patient={patientNoBirthdate} />)

      const birthdateInput = screen.getByLabelText(/birthdate|fecha de nacimiento/i)
      expect(birthdateInput).toHaveValue('')
    })

    it('should handle patient with no gender', () => {
      const patientNoGender = { ...mockPatient, gender: null }
      render(<PatientProfileForm patient={patientNoGender} />)

      const genderSelect = screen.getByRole('combobox', { name: /gender|género/i })
      expect(genderSelect).toHaveValue('')
    })
  })

  describe('Accessibility', () => {
    it('should have all required form inputs', () => {
      render(<PatientProfileForm patient={mockPatient} />)

      // Check inputs exist by their values
      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
      expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument()
    })

    it('should have required fields marked', () => {
      render(<PatientProfileForm patient={mockPatient} />)

      const firstNameInput = screen.getByDisplayValue('John')
      const lastNameInput = screen.getByDisplayValue('Doe')
      const emailInput = screen.getByDisplayValue('john@example.com')

      expect(firstNameInput).toBeRequired()
      expect(lastNameInput).toBeRequired()
      expect(emailInput).toBeRequired()
    })
  })
})
