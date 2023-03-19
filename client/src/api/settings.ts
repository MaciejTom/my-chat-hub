import { JWT_STORAGE_KEY } from '../models/authorization/storage';
import { browserStorage } from '../utils/browserStorageHelper';

export const baseHeaders = {
  'Content-Type': 'application/json',
};

export const headersWithAuth = () => {
  const jwt = browserStorage.get(JWT_STORAGE_KEY);
  return {
    ...baseHeaders,
    Authorization: 'Bearer ' + jwt,
  };
};