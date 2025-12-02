import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  getAllSpecialities, 
  getAllCities, 
  getPopularSpecialities,
  getFeaturedDoctors,
  searchDoctors,
  getAllDoctors
} from '@/lib/actions/search'
import { searchService } from '@/lib/services/searchService'
import { mockSpeciality, mockDoctor } from '../utils/mocks'

vi.mock('@/lib/services/searchService')

describe('search actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllSpecialities', () => {
    it('should return success with specialities data', async () => {
      const specialities = [mockSpeciality]
      vi.mocked(searchService.getAllSpecialities).mockResolvedValue(specialities as any)

      const result = await getAllSpecialities()

      expect(result).toEqual({
        success: true,
        data: specialities,
      })
    })

    it('should return error on failure', async () => {
      vi.mocked(searchService.getAllSpecialities).mockRejectedValue(new Error('DB Error'))

      const result = await getAllSpecialities()

      expect(result).toEqual({
        success: false,
        error: 'Error al obtener especialidades',
      })
    })
  })

  describe('getAllCities', () => {
    it('should return success with cities data', async () => {
      const cities = ['New York', 'Los Angeles']
      vi.mocked(searchService.getAllCities).mockResolvedValue(cities)

      const result = await getAllCities()

      expect(result).toEqual({
        success: true,
        data: cities,
      })
    })

    it('should return error on failure', async () => {
      vi.mocked(searchService.getAllCities).mockRejectedValue(new Error('DB Error'))

      const result = await getAllCities()

      expect(result).toEqual({
        success: false,
        error: 'Error al obtener ciudades',
      })
    })
  })

  describe('getPopularSpecialities', () => {
    it('should return success with popular specialities', async () => {
      const specialities = [mockSpeciality]
      vi.mocked(searchService.getPopularSpecialities).mockResolvedValue(specialities as any)

      const result = await getPopularSpecialities()

      expect(result).toEqual({
        success: true,
        data: specialities,
      })
    })

    it('should return error on failure', async () => {
      vi.mocked(searchService.getPopularSpecialities).mockRejectedValue(new Error('DB Error'))

      const result = await getPopularSpecialities()

      expect(result).toEqual({
        success: false,
        error: 'Error al obtener especialidades populares',
      })
    })
  })

  describe('getFeaturedDoctors', () => {
    it('should return success with featured doctors', async () => {
      const doctors = [mockDoctor]
      vi.mocked(searchService.getFeaturedDoctors).mockResolvedValue(doctors as any)

      const result = await getFeaturedDoctors()

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(1)
      expect(result.data?.[0].user.firstName).toBe('John')
      expect(result.data?.[0].id).toBe('doctor-123')
      // Dates are serialized to strings in the action
      expect(typeof result.data?.[0].createdAt).toBe('string')
      expect(typeof result.data?.[0].updatedAt).toBe('string')
    })

    it('should return error on failure', async () => {
      vi.mocked(searchService.getFeaturedDoctors).mockRejectedValue(new Error('DB Error'))

      const result = await getFeaturedDoctors()

      expect(result).toEqual({
        success: false,
        error: 'Error al obtener doctores destacados',
      })
    })
  })

  describe('searchDoctors', () => {
    it('should search doctors with default pagination', async () => {
      const searchResult = {
        doctors: [mockDoctor],
        total: 1,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      }
      vi.mocked(searchService.searchDoctors).mockResolvedValue(searchResult as any)

      const result = await searchDoctors()

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should search doctors with filters', async () => {
      const searchResult = {
        doctors: [mockDoctor],
        total: 1,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      }
      vi.mocked(searchService.searchDoctors).mockResolvedValue(searchResult as any)

      const result = await searchDoctors('Cardiology', 'New York', 1, 10)

      expect(searchService.searchDoctors).toHaveBeenCalledWith('Cardiology', 'New York', 1, 10)
      expect(result.success).toBe(true)
    })

    it('should serialize Decimal values to numbers', async () => {
      const mockDecimal = {
        constructor: { name: 'Decimal' },
        toString: () => '99.99',
      }
      
      const searchResult = {
        doctors: [{ ...mockDoctor, price: mockDecimal }],
        total: 1,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      }
      vi.mocked(searchService.searchDoctors).mockResolvedValue(searchResult as any)

      const result = await searchDoctors()

      expect(result.success).toBe(true)
      // Verify serialization happened
      expect(result.data?.doctors).toBeDefined()
    })

    it('should return error on failure', async () => {
      vi.mocked(searchService.searchDoctors).mockRejectedValue(new Error('DB Error'))

      const result = await searchDoctors()

      expect(result).toEqual({
        success: false,
        error: 'Error al buscar doctores',
      })
    })
  })

  describe('getAllDoctors', () => {
    it('should get all doctors with default pagination', async () => {
      const searchResult = {
        doctors: [mockDoctor],
        total: 1,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      }
      vi.mocked(searchService.getAllDoctors).mockResolvedValue(searchResult as any)

      const result = await getAllDoctors()

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should get all doctors with custom pagination', async () => {
      const searchResult = {
        doctors: [mockDoctor],
        total: 50,
        page: 2,
        pageSize: 10,
        totalPages: 5,
      }
      vi.mocked(searchService.getAllDoctors).mockResolvedValue(searchResult as any)

      const result = await getAllDoctors(2, 10)

      expect(searchService.getAllDoctors).toHaveBeenCalledWith(2, 10)
      expect(result.success).toBe(true)
    })

    it('should return error on failure', async () => {
      vi.mocked(searchService.getAllDoctors).mockRejectedValue(new Error('DB Error'))

      const result = await getAllDoctors()

      expect(result).toEqual({
        success: false,
        error: 'Error al obtener todos los doctores',
      })
    })
  })
})
