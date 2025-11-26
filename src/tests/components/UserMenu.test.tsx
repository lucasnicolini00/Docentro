import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserMenu from '@/components/ui/navigation/UserMenu'
import { signOut } from 'next-auth/react'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}))

// Mock image uploader
vi.mock('@/lib/actions/images-uploader', () => ({
  getUserProfileImageUrl: vi.fn(),
}))

vi.mock('@/hooks', () => ({
  useLocalePath: () => (path: string) => path,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}))

describe('UserMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Loading State', () => {
    it('should show loading skeleton when session is loading', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: null, status: 'loading' })

      const { container } = render(<UserMenu />)

      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()
    })
  })

  describe('Unauthenticated State', () => {
    it('should show login and register links when not authenticated', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: null, status: 'unauthenticated' })

      render(<UserMenu />)

      expect(screen.getByText(/register|registrarse/i)).toBeInTheDocument()
      expect(screen.getByText(/login|iniciar sesión/i)).toBeInTheDocument()
    })

    it('should have correct links for register and login', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: null, status: 'unauthenticated' })

      render(<UserMenu />)

      const registerLink = screen.getByText(/register|registrarse/i).closest('a')
      const loginLink = screen.getByText(/login|iniciar sesión/i).closest('a')

      expect(registerLink).toHaveAttribute('href', '/register')
      expect(loginLink).toHaveAttribute('href', '/login')
    })
  })

  describe('Authenticated State - Doctor', () => {
    const mockDoctorSession = {
      user: {
        id: 'doctor-1',
        name: 'Dr. John Doe',
        email: 'doctor@example.com',
        role: 'DOCTOR',
      },
    }

    it('should display doctor name and role', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockDoctorSession, status: 'authenticated' })

      render(<UserMenu />)

      expect(screen.getByText('Dr. John Doe')).toBeInTheDocument()
    })

    it('should show user avatar with initial when no profile image', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockDoctorSession, status: 'authenticated' })

      render(<UserMenu />)

      expect(screen.getByText('D')).toBeInTheDocument()
    })

    it('should toggle dropdown menu on button click', async () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockDoctorSession, status: 'authenticated' })

      render(<UserMenu />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      expect(screen.getByText(mockDoctorSession.user.email)).toBeInTheDocument()
    })

    it('should show doctor menu items when dropdown is open', async () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockDoctorSession, status: 'authenticated' })

      render(<UserMenu />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      // Check for doctor-specific menu items
      await waitFor(() => {
        expect(screen.getByText(/dashboard|panel/i)).toBeInTheDocument()
      })
    })

    it('should call signOut when logout button is clicked', async () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockDoctorSession, status: 'authenticated' })

      render(<UserMenu />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      const logoutButton = screen.getByText(/logout|cerrar sesión/i)
      await user.click(logoutButton)

      expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' })
    })
  })

  describe('Authenticated State - Patient', () => {
    const mockPatientSession = {
      user: {
        id: 'patient-1',
        name: 'Jane Smith',
        email: 'patient@example.com',
        role: 'PATIENT',
      },
    }

    it('should display patient name and role', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockPatientSession, status: 'authenticated' })

      render(<UserMenu />)

      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('should show patient menu items when dropdown is open', async () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockPatientSession, status: 'authenticated' })

      render(<UserMenu />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      await waitFor(() => {
        expect(screen.getByText(/dashboard|panel/i)).toBeInTheDocument()
      })
    })
  })

  describe('Dropdown Behavior', () => {
    const mockSession = {
      user: {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'PATIENT',
      },
    }

    it('should close dropdown when clicking a menu item', async () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

      render(<UserMenu />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      const menuItem = screen.getAllByRole('link')[0]
      await user.click(menuItem)

      // Dropdown should close
      await waitFor(() => {
        expect(screen.queryByText(mockSession.user.email)).not.toBeInTheDocument()
      })
    })

    it('should rotate chevron icon when dropdown is open', async () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({ data: mockSession, status: 'authenticated' })

      const { container } = render(<UserMenu />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      const chevron = container.querySelector('.rotate-180')
      expect(chevron).not.toBeInTheDocument()

      await user.click(menuButton)

      const rotatedChevron = container.querySelector('.rotate-180')
      expect(rotatedChevron).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should render user menu button', () => {
      const { useSession } = require('next-auth/react')
      useSession.mockReturnValue({
        data: { user: { name: 'Test', email: 'test@test.com', role: 'PATIENT' } },
        status: 'authenticated',
      })

      const { container } = render(<UserMenu />)

      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })
  })
})
