import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  updateDoctorProfile,
  getDoctorProfile,
  getAllSpecialities,
  getDoctorDashboard,
  getDoctorPublicProfile,
  saveDoctorProfileExperience,
  getAllDoctorImages,
  getDoctorImagesById,
  getDoctorIdFromUserId,
} from '@/lib/actions/doctors'
import { validateDoctor } from '@/lib/actions/utils'
import { doctorsService } from '@/lib/services/doctorsService'
import { getBatchImageUrls } from '@/lib/actions/images-uploader'
import { mockDoctor, mockSession, mockSpeciality, createMockFormData } from '../utils/mocks'

vi.mock('@/lib/actions/utils')
vi.mock('@/lib/services/doctorsService')
vi.mock('@/lib/actions/images-uploader')
vi.mock('next/cache')

describe('doctors actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('updateDoctorProfile', () => {
    it('should update doctor profile successfully', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.updateDoctorProfile).mockResolvedValue(undefined as any)

      const formData = createMockFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        doctorName: 'Dr. John',
        doctorSurname: 'Doe',
        doctorEmail: 'dr.john@example.com',
        doctorPhone: '+1234567890',
        specialities: 'spec-1,spec-2',
        experiences: JSON.stringify([]),
      })

      const result = await updateDoctorProfile(formData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Perfil actualizado correctamente')
      expect(doctorsService.updateDoctorProfile).toHaveBeenCalled()
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const formData = createMockFormData({})

      const result = await updateDoctorProfile(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })

    it('should handle empty specialities', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.updateDoctorProfile).mockResolvedValue(undefined as any)

      const formData = createMockFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '',
        doctorName: 'Dr. John',
        doctorSurname: 'Doe',
        doctorEmail: 'dr.john@example.com',
        doctorPhone: '',
        specialities: '',
        experiences: '',
      })

      const result = await updateDoctorProfile(formData)

      expect(result.success).toBe(true)
    })

    it('should handle service errors', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.updateDoctorProfile).mockRejectedValue(new Error('DB Error'))

      const formData = createMockFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '',
        doctorName: 'Dr. John',
        doctorSurname: 'Doe',
        doctorEmail: 'dr.john@example.com',
        doctorPhone: '',
        specialities: '',
        experiences: '',
      })

      const result = await updateDoctorProfile(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error al actualizar el perfil')
    })
  })

  describe('getDoctorProfile', () => {
    it('should return doctor profile with image URLs', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const profileData = {
        ...mockDoctor,
        profileImage: { id: 'img-1', url: 'old-url', createdAt: new Date() },
        images: [
          { id: 'img-2', url: 'old-url-2', createdAt: new Date() },
        ],
      }

      vi.mocked(doctorsService.getDoctorProfile).mockResolvedValue(profileData as any)
      vi.mocked(getBatchImageUrls).mockResolvedValue({
        'img-1': 'https://signed-url-1.com',
        'img-2': 'https://signed-url-2.com',
      })

      const result = await getDoctorProfile()

      expect(result.success).toBe(true)
      expect(result.data?.profileImageUrl).toBe('https://signed-url-1.com')
      expect(result.data?.images[0].url).toBe('https://signed-url-2.com')
    })

    it('should handle missing doctor', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.getDoctorProfile).mockResolvedValue(null)

      const result = await getDoctorProfile()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Doctor no encontrado')
    })

    it('should return error if validation fails', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        error: 'No autorizado',
      } as any)

      const result = await getDoctorProfile()

      expect(result.success).toBe(false)
      expect(result.error).toBe('No autorizado')
    })
  })

  describe('getAllSpecialities', () => {
    it('should return all specialities', async () => {
      const specialities = [mockSpeciality]
      vi.mocked(doctorsService.getAllSpecialities).mockResolvedValue(specialities as any)

      const result = await getAllSpecialities()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(specialities)
    })

    it('should handle errors', async () => {
      vi.mocked(doctorsService.getAllSpecialities).mockRejectedValue(new Error('DB Error'))

      const result = await getAllSpecialities()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Error al cargar las especialidades')
    })
  })

  describe('getDoctorDashboard', () => {
    it('should return dashboard data', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const dashboardData = { ...mockDoctor, appointments: [] }
      vi.mocked(doctorsService.getDoctorDashboard).mockResolvedValue(dashboardData as any)

      const result = await getDoctorDashboard()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(dashboardData)
    })

    it('should handle missing doctor', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.getDoctorDashboard).mockResolvedValue(null)

      const result = await getDoctorDashboard()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Doctor no encontrado')
    })
  })

  describe('getDoctorPublicProfile', () => {
    it('should return public profile', async () => {
      const publicProfile = { ...mockDoctor }
      vi.mocked(doctorsService.getDoctorPublicProfile).mockResolvedValue(publicProfile as any)

      const result = await getDoctorPublicProfile('doctor-123')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(publicProfile)
    })

    it('should handle missing doctor', async () => {
      vi.mocked(doctorsService.getDoctorPublicProfile).mockResolvedValue(null)

      const result = await getDoctorPublicProfile('invalid-id')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Doctor no encontrado')
    })
  })

  describe('saveDoctorProfileExperience', () => {
    it('should create new profile experience', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.getProfileExperience).mockResolvedValue(null)
      vi.mocked(doctorsService.createProfileExperience).mockResolvedValue({} as any)

      const formData = createMockFormData({
        description: 'Professional bio',
      })

      const result = await saveDoctorProfileExperience(formData)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Perfil profesional guardado correctamente')
      expect(doctorsService.createProfileExperience).toHaveBeenCalledWith('doctor-123', 'Professional bio')
    })

    it('should update existing profile experience', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      vi.mocked(doctorsService.getProfileExperience).mockResolvedValue({ id: 'exp-123' } as any)
      vi.mocked(doctorsService.updateProfileExperience).mockResolvedValue({} as any)

      const formData = createMockFormData({
        description: 'Updated bio',
      })

      const result = await saveDoctorProfileExperience(formData)

      expect(result.success).toBe(true)
      expect(doctorsService.updateProfileExperience).toHaveBeenCalledWith('exp-123', 'Updated bio')
    })

    it('should reject empty description', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const formData = createMockFormData({
        description: '   ',
      })

      const result = await saveDoctorProfileExperience(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('La descripción no puede estar vacía')
    })
  })

  describe('getAllDoctorImages', () => {
    it('should return doctor images with signed URLs', async () => {
      vi.mocked(validateDoctor).mockResolvedValue({
        doctor: mockDoctor,
        session: mockSession,
      } as any)

      const images = [{ id: 'img-1', createdAt: new Date() }]
      vi.mocked(doctorsService.getDoctorImages).mockResolvedValue(images as any)
      vi.mocked(getBatchImageUrls).mockResolvedValue({
        'img-1': 'https://signed-url.com',
      })

      const result = await getAllDoctorImages()

      expect(result.success).toBe(true)
      expect(result.data?.[0].url).toBe('https://signed-url.com')
    })
  })

  describe('getDoctorImagesById', () => {
    it('should return images for specific doctor', async () => {
      const images = [{ id: 'img-1', createdAt: new Date() }]
      vi.mocked(doctorsService.getDoctorImages).mockResolvedValue(images as any)
      vi.mocked(getBatchImageUrls).mockResolvedValue({
        'img-1': 'https://signed-url.com',
      })

      const result = await getDoctorImagesById('doctor-123')

      expect(result.success).toBe(true)
      expect(result.data?.[0].url).toBe('https://signed-url.com')
    })
  })

  describe('getDoctorIdFromUserId', () => {
    it('should return doctor id', async () => {
      vi.mocked(doctorsService.getDoctorIdFromUserId).mockResolvedValue('doctor-123')

      const result = await getDoctorIdFromUserId('user-123')

      expect(result).toBe('doctor-123')
    })
  })
})
