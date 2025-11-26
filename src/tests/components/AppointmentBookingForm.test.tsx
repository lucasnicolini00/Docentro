import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentBookingForm from '@/components/ui/forms/AppointmentBookingForm'
import { createAppointment, getDoctorAvailability } from '@/lib/actions/appointments'

vi.mock('@/lib/actions/appointments', () => ({
  createAppointment: vi.fn(),
  getDoctorAvailability: vi.fn(),
}))

const mockDoctor = {
  id: 'doctor-123',
  name: 'Dr. Jane',
  surname: 'Smith',
  user: {
    firstName: 'Jane',
    lastName: 'Smith',
  },
  specialities: [
    {
      speciality: {
        id: 'spec-1',
        name: 'Cardiology',
      },
    },
  ],
  clinics: [
    {
      clinic: {
        id: 'clinic-1',
        name: 'Main Clinic',
        address: '123 Main St',
      },
    },
  ],
  pricings: [
    {
      id: 'pricing-1',
      consultationFee: 50000,
      clinic: {
        id: 'clinic-1',
        name: 'Main Clinic',
      },
    },
  ],
}

describe('AppointmentBookingForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock getDoctorAvailability to return available slots
    vi.mocked(getDoctorAvailability).mockResolvedValue({
      success: true,
      data: [
        { datetime: '2025-12-15T09:00:00', time: '09:00' },
        { datetime: '2025-12-15T10:00:00', time: '10:00' },
        { datetime: '2025-12-15T11:00:00', time: '11:00' },
      ],
    })
  })

  it('should render appointment booking form', () => {
    render(<AppointmentBookingForm doctor={mockDoctor} />)

    // Check for doctor name
    expect(screen.getByText(/Dr. Jane Smith/i)).toBeInTheDocument()
    
    // Check for clinic selection
    expect(screen.getByText(/Main Clinic/i)).toBeInTheDocument()
  })

    it('should display clinic information', () => {
      const { container } = render(<AppointmentBookingForm doctor={mockDoctor} />)

      // Check that clinic information is rendered somewhere
      expect(container.textContent).toContain('Main')
    })

  it('should display doctor specialities', () => {
    const { container } = render(<AppointmentBookingForm doctor={mockDoctor} />)

    expect(container.textContent).toContain('Cardiology')
  })
})
