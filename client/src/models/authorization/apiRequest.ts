export interface ApiRequest {
  url: string;
  body?: string;
  payload: RequestInit;
}

export const ApiMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};
