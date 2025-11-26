import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DoctorProfileForm from '@/components/ui/forms/DoctorProfileForm'
import { updateDoctorProfile } from '@/lib/actions'
import toast from 'react-hot-toast'

vi.mock('@/lib/actions', () => ({
  updateDoctorProfile: vi.fn(),
}))

vi.mock('@/hooks', () => ({
  useLocalePath: () => (path: string) => path,
}))

const mockDoctor = {
  id: 'doctor-123',
  name: 'Dr. Jane',
  surname: 'Smith',
  email: 'jane@example.com',
  phone: '+1234567890',
  user: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+1234567890',
  },
  specialities: [
    {
      specialityId: 'spec-1',
      speciality: {
        id: 'spec-1',
        name: 'Cardiology',
        description: null,
      },
    },
  ],
  experiences: [],
  picaddress: null,
} as any

const mockSpecialities = [
  { id: 'spec-1', name: 'Cardiology', description: null },
  { id: 'spec-2', name: 'Neurology', description: null },
  { id: 'spec-3', name: 'Pediatrics', description: null },
]

describe('DoctorProfileForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render doctor profile form with initial values', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)

      const nameInputs = screen.getAllByDisplayValue('Jane')
      expect(nameInputs.length).toBeGreaterThan(0)
      const surnameInputs = screen.getAllByDisplayValue('Smith')
      expect(surnameInputs.length).toBeGreaterThan(0)
    })

    it('should display all specialities', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)

      expect(screen.getByText('Cardiology')).toBeInTheDocument()
      expect(screen.getByText('Neurology')).toBeInTheDocument()
      expect(screen.getByText('Pediatrics')).toBeInTheDocument()
    })

    it('should show selected specialities as checked', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)

      const cardiologyCheckbox = screen.getByRole('checkbox', { name: /cardiology/i })
      expect(cardiologyCheckbox).toBeChecked()
    })

    it('should render both personal and professional info sections', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)

      // Check for multiple name inputs (personal and professional)
      const nameInputs = screen.getAllByDisplayValue('Jane')
      expect(nameInputs.length).toBeGreaterThan(0)
    })
  })

  describe('User Interactions', () => {
    it('should update form fields when user types', async () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const nameInputs = screen.getAllByDisplayValue('Jane')
      await user.clear(nameInputs[0])
      await user.type(nameInputs[0], 'John')

      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    })

    it('should toggle speciality selection', async () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const neurologyCheckbox = screen.getByRole('checkbox', { name: /neurology/i })
      expect(neurologyCheckbox).not.toBeChecked()

      await user.click(neurologyCheckbox)

      expect(neurologyCheckbox).toBeChecked()
    })

    it('should unselect a selected speciality', async () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const cardiologyCheckbox = screen.getByRole('checkbox', { name: /cardiology/i })
      expect(cardiologyCheckbox).toBeChecked()

      await user.click(cardiologyCheckbox)

      expect(cardiologyCheckbox).not.toBeChecked()
    })

    it('should update email field', async () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const emailInputs = screen.getAllByDisplayValue('jane@example.com')
      await user.clear(emailInputs[0])
      await user.type(emailInputs[0], 'john@example.com')

      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('should call updateDoctorProfile on form submission', async () => {
      vi.mocked(updateDoctorProfile).mockResolvedValue({
        success: true,
        data: mockDoctor,
      })

      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(updateDoctorProfile).toHaveBeenCalled()
      })
    })

    it('should show success toast on successful submission', async () => {
      vi.mocked(updateDoctorProfile).mockResolvedValue({
        success: true,
        data: mockDoctor,
      })

      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled()
      })
    })

    it('should show error toast on failed submission', async () => {
      vi.mocked(updateDoctorProfile).mockResolvedValue({
        success: false,
        error: 'Update failed',
      })

      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled()
      })
    })

    it('should display error message on failed submission', async () => {
      vi.mocked(updateDoctorProfile).mockResolvedValue({
        success: false,
        error: 'Custom error message',
      })

      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Custom error message')).toBeInTheDocument()
      })
    })

    it('should handle network errors gracefully', async () => {
      vi.mocked(updateDoctorProfile).mockRejectedValue(new Error('Network error'))

      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
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
      vi.mocked(updateDoctorProfile).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true, data: mockDoctor }), 100))
      )

      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /save|guardar/i })
      await user.click(submitButton)

      expect(screen.getByText(/saving|guardando/i)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle doctor with no specialities', () => {
      const doctorNoSpec = { ...mockDoctor, specialities: [] }
      render(<DoctorProfileForm doctor={doctorNoSpec} allSpecialities={mockSpecialities} />)

      const cardiologyCheckbox = screen.getByRole('checkbox', { name: /cardiology/i })
      expect(cardiologyCheckbox).not.toBeChecked()
    })

    it('should handle doctor with no phone', () => {
      const doctorNoPhone = { ...mockDoctor, phone: null, user: { ...mockDoctor.user, phone: null } }
      const { container } = render(<DoctorProfileForm doctor={doctorNoPhone} allSpecialities={mockSpecialities} />)

      const phoneInputs = container.querySelectorAll('input[type="tel"]')
      phoneInputs.forEach(input => {
        expect(input).toHaveValue('')
      })
    })

    it('should handle empty specialities list', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={[]} />)

      // Form should still render
      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have required fields marked', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)

      const nameInputs = screen.getAllByDisplayValue('Jane')
      nameInputs.forEach(input => {
        expect(input).toBeRequired()
      })
    })

    it('should have checkboxes for all specialities', () => {
      render(<DoctorProfileForm doctor={mockDoctor} allSpecialities={mockSpecialities} />)

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes).toHaveLength(mockSpecialities.length)
    })
  })
})
