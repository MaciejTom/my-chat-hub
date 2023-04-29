export const baseHeaders = {
  'Content-Type': 'application/json',
};

export const headersWithAuth = () => {
  return {
    ...baseHeaders,
  };
};
