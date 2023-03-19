// import { JWT_STORAGE_KEY, REFRESH_STORAGE_KEY } from 'core/models/authorization/storage';
// import { TokenResponse } from 'core/models/authorization/tokenResponse';
// import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
// import { loginByRefreshToken, logInBySystemToken } from '../core/api/authApi';
// import { clearTypeAndValues } from '../core/helpers/authHelper';
// import { browserStorage } from '../core/helpers/browserStorageHelper';

export interface AuthContextData {
//   isLoggedIn: boolean;
//   isLoggingInProgress: boolean;
//   loggingError: string | undefined;
//   getUserToken: () => string | undefined;
//   getJwt: () => Promise<string | null>;
//   logOut: () => void;
}

export const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider(props: React.PropsWithChildren<any>) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggingInProgress, setIsLoggingInProgress] = useState<boolean>(true);
  const [loggingError, setLoggingError] = useState<string | undefined>();

//   useEffect(() => {
//     async function tryLogIn() {
//       if (!isLoggedIn) {
//         setIsLoggingInProgress(true);
//         try {
//           if ((await logInByToken()) || (await isStoredJwtValid()) || (await loginByRefresh())) {
//             setIsLoggedIn(true);
//             console.log('Succeded logged in!');
//           }
//         } catch (e) {
//           console.error('Error during starrtup logging: ', e);
//           setIsLoggedIn(false);
//         }
//       }
//       setIsLoggingInProgress(false);
//       return () => {
//         setIsLoggedIn(false);
//       };
//     }
//     tryLogIn();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const logInByToken = async () => {
//     const currentUrl = new URL(window.location.href);
//     const userId = currentUrl.searchParams.get('userId');
//     const authToken = currentUrl.searchParams.get('authToken');

//     try {
//       if (userId && authToken) {
//         const response = await logInBySystemToken(userId, authToken);
//         if (!response) return false;
//         storeTokenResp(clearTypeAndValues(response));
//         console.log('Succeded login by refresh system token');
//         return true;
//       }
//     } catch (err) {
//       console.log('Error during logging by system token');
//       setLoggingError('Error during logging by system token');
//     }

//     return false;
//   };

//   const loginByRefresh = async () => {
//     // const refreshToken = browserStorage.get(REFRESH_STORAGE_KEY);

//     // try {
//     //   if (refreshToken) {
//     //     const response: TokenResponse | null = await loginByRefreshToken(refreshToken);
//     //     if (!response) return false;

//     //     const cleanResults: TokenResponse = clearTypeAndValues<TokenResponse>(response);
//     //     storeTokenResp(cleanResults);
//     //     console.log('Succeded login by refresh token');
//     //     return true;
//     //   }
//     // } catch (err) {
//     //   console.log('Error during logging by refresh');
//     //   setLoggingError('Error during logging by refresh');
//     // }
//     // return false;
//   };

//   const isStoredJwtValid = () => {
//     // const storedToken = browserStorage.get(JWT_STORAGE_KEY);
//     // if (storedToken) {
//     //   const decoded = jwtDecode<JwtPayload>(storedToken);
//     //   console.log('Stored Jwt is valid');
//     //   return decoded && decoded.exp && new Date().getTime() < decoded.exp * 1000;
//     // }
//     // console.log('Stored Jwt is NOT valid!');
//     // return false;
//   };

//   const storeTokenResp = (tokenResponse: TokenResponse) => {
//     // browserStorage.set(JWT_STORAGE_KEY, tokenResponse.access_token);
//     // browserStorage.set(REFRESH_STORAGE_KEY, tokenResponse.refresh_token);
//   };

//   const getStoredJwt = () => {
//     // return browserStorage.get(JWT_STORAGE_KEY);
//   };

//   const getJwt = async () => {
//     // if (isStoredJwtValid()) {
//     //   return getStoredJwt();
//     // } else if (await loginByRefresh()) {
//     //   return getStoredJwt();
//     // } else {
//     //   setIsLoggedIn(false);
//     //   return null;
//     // }
//   };

//   const getUserToken = (): string | undefined => {
//     // const token = getStoredJwt();
//     // const userToken = token ? jwtDecode<JwtPayload>(token).sub : null;
//     // if (userToken) {
//     //   return userToken;
//     // }
//   };

//   const logOut = () => {
//     // browserStorage.remove(JWT_STORAGE_KEY);
//     // browserStorage.remove(REFRESH_STORAGE_KEY);
//     // setIsLoggedIn(false);
//   };

  return (
    <AuthContext.Provider
      value={{
        // getUserToken,
        // isLoggedIn,
        // isLoggingInProgress,
        // loggingError,
        // getJwt,
        // logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
