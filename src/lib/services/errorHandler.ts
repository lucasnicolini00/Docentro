/**
 * Service Layer Error Handling Utility
 * 
 * Provides consistent error handling and logging for all service layer methods.
 * Wraps service operations with try-catch blocks and logs errors with context.
 */

interface ErrorContext {
  service: string;
  method: string;
  params?: Record<string, any>;
}

/**
 * Wraps a service operation with error handling and logging
 * 
 * @param operation - The async operation to execute
 * @param context - Context information for error logging
 * @returns The result of the operation
 * @throws Re-throws the error after logging for action layer to handle
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: ErrorContext
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    // Log error with full context
    console.error(
      `[Service Error] ${context.service}.${context.method}`,
      {
        context,
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        } : error,
      }
    );

    // Re-throw for action layer to handle
    throw error;
  }
}

/**
 * Helper to create error context
 */
export function createErrorContext(
  service: string,
  method: string,
  params?: Record<string, any>
): ErrorContext {
  return { service, method, params };
}
