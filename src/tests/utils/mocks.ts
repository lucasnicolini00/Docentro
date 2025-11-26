/**
 * Test Mocks and Factory Functions
 */

export const mockSession = {
  user: {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  },
  expires: '2025-12-31',
}

export const mockDoctor = {
  id: 'doctor-123',
  userId: 'user-123',
  name: 'John',
  surname: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  user: {
    id: 'user-123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    phone: '+1234567890',
  },
  specialities: [],
  experiences: [],
}

export const mockPatient = {
  id: 'patient-123',
  userId: 'user-123',
  name: 'Jane',
  surname: 'Smith',
  email: 'jane.smith@example.com',
  phone: '+0987654321',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  user: {
    id: 'user-123',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'test@example.com',
    phone: '+0987654321',
  },
}

export const mockSpeciality = {
  id: 'spec-123',
  name: 'Cardiology',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockClinic = {
  id: 'clinic-123',
  name: 'Test Clinic',
  address: '123 Main St',
  city: 'Test City',
  neighborhood: 'Downtown',
  isVirtual: false,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockExperience = {
  id: 'exp-123',
  doctorId: 'doctor-123',
  experienceType: 'WORK' as const,
  title: 'Senior Cardiologist',
  institution: 'Test Hospital',
  startDate: new Date('2020-01-01'),
  endDate: null,
  description: 'Working as a senior cardiologist',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockImage = {
  id: 'img-123',
  url: 'https://example.com/image.jpg',
  doctorId: 'doctor-123',
  profileForDoctor: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

/**
 * Factory function to create a mock FormData
 */
export function createMockFormData(data: Record<string, string>): FormData {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return formData
}

/**
 * Factory function to create a mock doctor with custom properties
 */
export function createMockDoctor(overrides: Partial<typeof mockDoctor> = {}) {
  return {
    ...mockDoctor,
    ...overrides,
  }
}

/**
 * Factory function to create a mock patient with custom properties
 */
export function createMockPatient(overrides: Partial<typeof mockPatient> = {}) {
  return {
    ...mockPatient,
    ...overrides,
  }
}

/**
 * Factory function to create a mock speciality with custom properties
 */
export function createMockSpeciality(overrides: Partial<typeof mockSpeciality> = {}) {
  return {
    ...mockSpeciality,
    ...overrides,
  }
}
