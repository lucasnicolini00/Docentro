import { describe, it, expect, vi, beforeEach } from 'vitest'
import { withErrorHandling, createErrorContext } from '@/lib/services/errorHandler'

describe('errorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('withErrorHandling', () => {
    it('should return the result of a successful operation', async () => {
      const operation = vi.fn().mockResolvedValue('success')
      const context = { service: 'testService', method: 'testMethod' }

      const result = await withErrorHandling(operation, context)

      expect(result).toBe('success')
      expect(operation).toHaveBeenCalledTimes(1)
      expect(console.error).not.toHaveBeenCalled()
    })

    it('should log error with context and re-throw', async () => {
      const error = new Error('Test error')
      const operation = vi.fn().mockRejectedValue(error)
      const context = { 
        service: 'testService', 
        method: 'testMethod',
        params: { id: '123' }
      }

      await expect(withErrorHandling(operation, context)).rejects.toThrow('Test error')
      
      expect(console.error).toHaveBeenCalledWith(
        '[Service Error] testService.testMethod',
        expect.objectContaining({
          context,
          error: expect.objectContaining({
            message: 'Test error',
            name: 'Error',
          }),
        })
      )
    })

    it('should handle non-Error objects', async () => {
      const error = 'String error'
      const operation = vi.fn().mockRejectedValue(error)
      const context = { service: 'testService', method: 'testMethod' }

      await expect(withErrorHandling(operation, context)).rejects.toBe('String error')
      
      expect(console.error).toHaveBeenCalledWith(
        '[Service Error] testService.testMethod',
        expect.objectContaining({
          context,
          error: 'String error',
        })
      )
    })

    it('should preserve error stack trace', async () => {
      const error = new Error('Test error')
      const operation = vi.fn().mockRejectedValue(error)
      const context = { service: 'testService', method: 'testMethod' }

      await expect(withErrorHandling(operation, context)).rejects.toThrow(error)
      
      expect(console.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          error: expect.objectContaining({
            stack: expect.any(String),
          }),
        })
      )
    })
  })

  describe('createErrorContext', () => {
    it('should create error context without params', () => {
      const context = createErrorContext('myService', 'myMethod')
      
      expect(context).toEqual({
        service: 'myService',
        method: 'myMethod',
      })
    })

    it('should create error context with params', () => {
      const params = { userId: '123', doctorId: '456' }
      const context = createErrorContext('myService', 'myMethod', params)
      
      expect(context).toEqual({
        service: 'myService',
        method: 'myMethod',
        params,
      })
    })
  })
})
