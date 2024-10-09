import React from 'react';
import { Alert } from 'evergreen-ui';

export type ErrorWithMessage = {
  message: string;
};

// Type guard to check if an error has a message
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// Convert any error to ErrorWithMessage type
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

// Get error message from any error
function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

// Props for the ErrorMessage component
interface ErrorMessageProps {
  error: unknown;
  title?: string;
  width?: string;
}

// ErrorMessage component
export function ErrorMessage({
  error,
  title = 'An error occurred.',
  width = '100%',
}: ErrorMessageProps) {
  const errorMessage = getErrorMessage(error);

  return (
    errorMessage && (
      <Alert intent='danger' title={title} marginY={20} width={width}>
        {errorMessage}
      </Alert>
    )
  );
}

// Utility function to handle errors in async functions
export async function handleError<T>(
  promise: Promise<T>
): Promise<[T | null, ErrorWithMessage | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, toErrorWithMessage(error)];
  }
}

export { isErrorWithMessage, toErrorWithMessage, getErrorMessage };
