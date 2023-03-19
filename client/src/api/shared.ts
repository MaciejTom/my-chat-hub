import { ApiMethod } from '../models/authorization/apiRequest';
import { headersWithAuth } from './settings';
import bcrypt from 'bcryptjs';

export const baseUri = 'http://localhost:4000/api/v1'
export const authController = `${baseUri}/auth`;

export const postRequestInit = (body: any) => {
  return {
    method: ApiMethod.post,
    headers: headersWithAuth(),
    body: JSON.stringify(body),
  };
};

export const getRequestInit = () => {
  return {
    method: ApiMethod.get,
    headers: headersWithAuth(),
  };
};


export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}