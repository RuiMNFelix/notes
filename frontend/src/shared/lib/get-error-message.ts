export const getErrorMessage = (err: any, fallback: string): string => {
  const data = err?.response?.data;

  if (typeof data === 'string') return data;

  if (data?.errors && typeof data.errors === 'object') {
    const firstError = Object.values(data.errors)[0];
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
      return firstError[0];
    }
  }

  return fallback;
};