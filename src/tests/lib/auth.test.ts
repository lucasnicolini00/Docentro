import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  changePassword,
} from '@/lib/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

vi.mock('@/lib/prisma', () => ({
  default: mockDeep<PrismaClient>(),
}))

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}))

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  password: 'hashed-password',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  role: UserRole.PATIENT,
  isActive: true,
  emailVerified: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}

describe('auth', () => {
  beforeEach(() => {
    mockReset(prismaMock)
    vi.clearAllMocks()
  })

  describe('registerUser', () => {
    it('should register a new patient successfully', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890',
        userType: 'patient' as const,
      }

      prismaMock.user.findUnique.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as never)

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          user: {
            create: vi.fn().mockResolvedValue(mockUser),
          },
          patient: {
            create: vi.fn().mockResolvedValue({
              id: 'patient-123',
              userId: 'user-123',
              name: 'John',
              surname: 'Doe',
            }),
          },
        })
      })

      const result = await registerUser(registerData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Cuenta creada exitosamente')
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
    })

    it('should register a new doctor successfully', async () => {
      const registerData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password123',
        userType: 'doctor' as const,
      }

      prismaMock.user.findUnique.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as never)

      const doctorUser = { ...mockUser, role: UserRole.DOCTOR }

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback({
          user: {
            create: vi.fn().mockResolvedValue(doctorUser),
          },
          doctor: {
            create: vi.fn().mockResolvedValue({
              id: 'doctor-123',
              userId: 'user-123',
              name: 'Jane',
              surname: 'Smith',
            }),
          },
        })
      })

      const result = await registerUser(registerData)

      expect(result.success).toBe(true)
      expect(result.user?.role).toBe(UserRole.DOCTOR)
    })

    it('should return error if user already exists', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'existing@example.com',
        password: 'password123',
        userType: 'patient' as const,
      }

      prismaMock.user.findUnique.mockResolvedValue(mockUser as any)

      const result = await registerUser(registerData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('USER_EXISTS')
      expect(result.message).toContain('Ya existe una cuenta')
    })

    it('should handle registration errors', async () => {
      const registerData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        userType: 'patient' as const,
      }

      prismaMock.user.findUnique.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockRejectedValue(new Error('Hash error'))

      const result = await registerUser(registerData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('REGISTRATION_FAILED')
    })
  })

  describe('loginUser', () => {
    it('should login user with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      prismaMock.user.findUnique.mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never)

      const result = await loginUser(loginData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Inicio de sesión exitoso')
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
    })

    it('should return error if user not found', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      }

      prismaMock.user.findUnique.mockResolvedValue(null)

      const result = await loginUser(loginData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('INVALID_CREDENTIALS')
      expect(result.message).toBe('Credenciales incorrectas')
    })

    it('should return error if account is disabled', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const inactiveUser = { ...mockUser, isActive: false }
      prismaMock.user.findUnique.mockResolvedValue(inactiveUser as any)

      const result = await loginUser(loginData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('ACCOUNT_DISABLED')
      expect(result.message).toContain('desactivada')
    })

    it('should return error if password is invalid', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      }

      prismaMock.user.findUnique.mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never)

      const result = await loginUser(loginData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('INVALID_CREDENTIALS')
    })

    it('should handle login errors', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      prismaMock.user.findUnique.mockRejectedValue(new Error('DB Error'))

      const result = await loginUser(loginData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('LOGIN_FAILED')
    })
  })

  describe('getUserById', () => {
    it('should get user by id with patient profile', async () => {
      const userWithPatient = {
        ...mockUser,
        patient: {
          id: 'patient-123',
          name: 'John',
          surname: 'Doe',
          birthdate: new Date('1990-01-01'),
          gender: 'MALE',
        },
        doctor: null,
      }

      prismaMock.user.findUnique.mockResolvedValue(userWithPatient as any)

      const result = await getUserById('user-123')

      expect(result).toBeDefined()
      expect(result?.id).toBe('user-123')
      expect(result?.patient).toBeDefined()
    })

    it('should get user by id with doctor profile', async () => {
      const userWithDoctor = {
        ...mockUser,
        role: UserRole.DOCTOR,
        patient: null,
        doctor: {
          id: 'doctor-123',
          name: 'Jane',
          surname: 'Smith',
          picaddress: 'https://example.com/pic.jpg',
          specialities: [],
        },
      }

      prismaMock.user.findUnique.mockResolvedValue(userWithDoctor as any)

      const result = await getUserById('user-123')

      expect(result).toBeDefined()
      expect(result?.doctor).toBeDefined()
    })

    it('should return null if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)

      const result = await getUserById('nonexistent-id')

      expect(result).toBeNull()
    })

    it('should handle errors gracefully', async () => {
      prismaMock.user.findUnique.mockRejectedValue(new Error('DB Error'))

      const result = await getUserById('user-123')

      expect(result).toBeNull()
    })
  })

  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+0987654321',
      }

      const updatedUser = {
        ...mockUser,
        ...updateData,
      }

      prismaMock.user.update.mockResolvedValue(updatedUser as any)

      const result = await updateUserProfile('user-123', updateData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Perfil actualizado exitosamente')
      expect(result.user?.firstName).toBe('Jane')
    })

    it('should handle partial updates', async () => {
      const updateData = {
        firstName: 'Jane',
      }

      prismaMock.user.update.mockResolvedValue({ ...mockUser, firstName: 'Jane' } as any)

      const result = await updateUserProfile('user-123', updateData)

      expect(result.success).toBe(true)
    })

    it('should handle update errors', async () => {
      const updateData = {
        firstName: 'Jane',
      }

      prismaMock.user.update.mockRejectedValue(new Error('DB Error'))

      const result = await updateUserProfile('user-123', updateData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('UPDATE_FAILED')
    })
  })

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never)
      vi.mocked(bcrypt.hash).mockResolvedValue('new-hashed-password' as never)
      prismaMock.user.update.mockResolvedValue(mockUser as any)

      const result = await changePassword('user-123', 'oldpassword', 'newpassword')

      expect(result.success).toBe(true)
      expect(result.message).toBe('Contraseña actualizada exitosamente')
    })

    it('should return error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)

      const result = await changePassword('user-123', 'oldpassword', 'newpassword')

      expect(result.success).toBe(false)
      expect(result.error).toBe('USER_NOT_FOUND')
    })

    it('should return error if current password is invalid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never)

      const result = await changePassword('user-123', 'wrongpassword', 'newpassword')

      expect(result.success).toBe(false)
      expect(result.error).toBe('INVALID_CURRENT_PASSWORD')
      expect(result.message).toContain('incorrecta')
    })

    it('should handle password change errors', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never)
      vi.mocked(bcrypt.hash).mockRejectedValue(new Error('Hash error'))

      const result = await changePassword('user-123', 'oldpassword', 'newpassword')

      expect(result.success).toBe(false)
      expect(result.error).toBe('PASSWORD_CHANGE_FAILED')
    })
  })

  describe('NextAuth callbacks', () => {
    describe('authorize callback', () => {
      it('should return null if credentials are missing', async () => {
        const { authOptions } = await import('@/lib/auth')
        const credentialsProvider = authOptions.providers[0] as any

        // Test with missing email
        const result1 = await credentialsProvider.authorize({ password: 'test' })
        expect(result1).toBeNull()

        // Test with missing password
        const result2 = await credentialsProvider.authorize({ email: 'test@example.com' })
        expect(result2).toBeNull()

        // Test with both missing
        const result3 = await credentialsProvider.authorize({})
        expect(result3).toBeNull()
      })

      it('should return null if user not found', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null)

        const { authOptions } = await import('@/lib/auth')
        const credentialsProvider = authOptions.providers[0] as any

        const result = await credentialsProvider.authorize({
          email: 'nonexistent@example.com',
          password: 'password123',
        })

        expect(result).toBeNull()
      })

      it('should return null if password does not match', async () => {
        prismaMock.user.findUnique.mockResolvedValue(mockUser as any)
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never)

        const { authOptions } = await import('@/lib/auth')
        const credentialsProvider = authOptions.providers[0] as any

        const result = await credentialsProvider.authorize({
          email: 'test@example.com',
          password: 'wrongpassword',
        })

        expect(result).toBeNull()
      })
    })

    describe('jwt callback', () => {
      it('should add custom fields to token when user is provided', async () => {
        const { authOptions } = await import('@/lib/auth')
        const jwtCallback = authOptions.callbacks?.jwt as any

        const token = { sub: 'user-123' }
        const user = {
          id: 'user-123',
          role: UserRole.DOCTOR,
          doctorId: 'doctor-123',
          patientId: null,
        }

        const result = await jwtCallback({ token, user })

        expect(result.role).toBe(UserRole.DOCTOR)
        expect(result.doctorId).toBe('doctor-123')
        expect(result.patientId).toBeNull()
      })

      it('should return token unchanged when user is not provided', async () => {
        const { authOptions } = await import('@/lib/auth')
        const jwtCallback = authOptions.callbacks?.jwt as any

        const token = { sub: 'user-123', role: UserRole.PATIENT }

        const result = await jwtCallback({ token })

        expect(result).toEqual(token)
      })
    })

    describe('session callback', () => {
      it('should add custom fields to session from token', async () => {
        const { authOptions } = await import('@/lib/auth')
        const sessionCallback = authOptions.callbacks?.session as any

        const session = {
          user: {
            name: 'John Doe',
            email: 'john@example.com',
          },
        }

        const token = {
          sub: 'user-123',
          role: UserRole.PATIENT,
          doctorId: null,
          patientId: 'patient-123',
        }

        const result = await sessionCallback({ session, token })

        expect(result.user.id).toBe('user-123')
        expect(result.user.role).toBe(UserRole.PATIENT)
        expect(result.user.doctorId).toBeNull()
        expect(result.user.patientId).toBe('patient-123')
      })

      it('should handle doctor session', async () => {
        const { authOptions } = await import('@/lib/auth')
        const sessionCallback = authOptions.callbacks?.session as any

        const session = {
          user: {
            name: 'Dr. Smith',
            email: 'smith@example.com',
          },
        }

        const token = {
          sub: 'user-456',
          role: UserRole.DOCTOR,
          doctorId: 'doctor-456',
          patientId: null,
        }

        const result = await sessionCallback({ session, token })

        expect(result.user.id).toBe('user-456')
        expect(result.user.role).toBe(UserRole.DOCTOR)
        expect(result.user.doctorId).toBe('doctor-456')
        expect(result.user.patientId).toBeNull()
      })
    })
  })
})
