import { ApiMethod } from '../models/authorization/apiRequest';
import { headersWithAuth } from './settings';

export const baseUri = import.meta.env.VITE_API_URL;
export const authController = `${baseUri}/auth`;
export const chatController = `${baseUri}/chat`;

export const postRequestInit = (body: any) => {
  return {
    method: ApiMethod.post,
    headers: headersWithAuth(),
    body: JSON.stringify(body),
    credentials: "include" as RequestCredentials,
  };
};

export const getRequestInit = () => {
  return {
    method: ApiMethod.get,
    headers: headersWithAuth(),
    credentials: "include" as RequestCredentials,
  };
};