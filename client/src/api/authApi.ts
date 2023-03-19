import {hashPassword, authController, postRequestInit} from './shared'
import {TokenResponse} from '../models/authorization/tokenResponse'

export const registerEndpoint = `${authController}/register`;
export const loginEndpoint = `${authController}/login`;

export const logInToChat = async (username: string, password: string): Promise<TokenResponse | null> => {
    console.log('logInToChat()');
  
    const body = {
      username,
      password: hashPassword(password),
    };
  
    try {
      const response = await fetch(loginEndpoint, postRequestInit(body));
      if (response.status === 200) {
        console.log('authApi(): logInToChat() Succeded');
        return response.json();
      }
    } catch (err) {
      console.log('authApi(): logInToChat() Error: ', err);
    }
  
    return null;
  };
  export const registerOnChat = async (username: string, password: string): Promise<TokenResponse | null> => {
    console.log('registerOnChat()');
  
    const body = {
      username,
      password: hashPassword(password),
    };
  
    try {
      const response = await fetch(registerEndpoint, postRequestInit(body));
      if (response.status === 200) {
        console.log('authApi(): registerOnChat() Succeded');
        return response.json();
      }
    } catch (err) {
      console.log('authApi(): registerOnChat() Error: ', err);
    }
  
    return null;
  };