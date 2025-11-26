import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/ui/navigation/navbar'

// Mock UserMenu component
vi.mock('@/components/ui/navigation/UserMenu', () => ({
  default: () => <div data-testid="user-menu">UserMenu</div>,
}))

// Mock LanguageSwitcher component
vi.mock('@/components/ui/LanguageSwitcher', () => ({
  default: ({ variant }: any) => (
    <div data-testid={variant === 'full' ? 'language-switcher-full' : 'language-switcher'}>
      LanguageSwitcher
    </div>
  ),
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

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render navbar', () => {
      const { container } = render(<Navbar />)

      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    it('should display Docentro logo', () => {
      render(<Navbar />)

      expect(screen.getByText('Docentro')).toBeInTheDocument()
      expect(screen.getByText('🩺')).toBeInTheDocument()
    })

    it('should have logo link to home page', () => {
      render(<Navbar />)

      const logoLink = screen.getByText('Docentro').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should render UserMenu component', () => {
      render(<Navbar />)

      expect(screen.getByTestId('user-menu')).toBeInTheDocument()
    })

    it('should render LanguageSwitcher on desktop', () => {
      render(<Navbar />)

      expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
    })

    it('should render mobile menu button', () => {
      render(<Navbar />)

      const menuButton = screen.getByRole('button')
      expect(menuButton).toBeInTheDocument()
    })
  })

  describe('Mobile Menu', () => {
    it('should toggle mobile menu on button click', async () => {
      render(<Navbar />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      
      // Mobile menu should not be visible initially
      expect(screen.queryByTestId('language-switcher-full')).not.toBeInTheDocument()

      // Click to open
      await user.click(menuButton)

      // Mobile menu should be visible
      expect(screen.getByTestId('language-switcher-full')).toBeInTheDocument()
    })

    it('should show search link in mobile menu', async () => {
      render(<Navbar />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      const searchLink = screen.getByText(/search|buscar/i).closest('a')
      expect(searchLink).toHaveAttribute('href', '/search')
    })

    it('should close mobile menu when search link is clicked', async () => {
      render(<Navbar />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      const searchLink = screen.getByText(/search|buscar/i)
      await user.click(searchLink)

      // Mobile menu should close
      expect(screen.queryByTestId('language-switcher-full')).not.toBeInTheDocument()
    })

    it('should show X icon when mobile menu is open', async () => {
      const { container } = render(<Navbar />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      // Check for X icon (close icon)
      const closeIcon = container.querySelector('svg')
      expect(closeIcon).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have sticky positioning', () => {
      const { container } = render(<Navbar />)

      const header = container.querySelector('header')
      expect(header).toHaveClass('sticky')
    })

    it('should have backdrop blur effect', () => {
      const { container } = render(<Navbar />)

      const header = container.querySelector('header')
      expect(header).toHaveClass('backdrop-blur-md')
    })

    it('should have proper z-index for overlay', () => {
      const { container } = render(<Navbar />)

      const header = container.querySelector('header')
      expect(header).toHaveClass('z-50')
    })
  })

  describe('Accessibility', () => {
    it('should have header element', () => {
      const { container } = render(<Navbar />)

      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    it('should have clickable logo', () => {
      render(<Navbar />)

      const logo = screen.getByText('Docentro')
      expect(logo.closest('a')).toBeInTheDocument()
    })

    it('should have accessible mobile menu button', () => {
      render(<Navbar />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should hide language switcher on mobile', () => {
      const { container } = render(<Navbar />)

      const desktopSwitcher = container.querySelector('.hidden.sm\\:block')
      expect(desktopSwitcher).toBeInTheDocument()
    })

    it('should show full language switcher in mobile menu', async () => {
      render(<Navbar />)
      const user = userEvent.setup()

      const menuButton = screen.getByRole('button')
      await user.click(menuButton)

      expect(screen.getByTestId('language-switcher-full')).toBeInTheDocument()
    })
  })
})
