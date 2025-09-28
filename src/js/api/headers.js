import { API_KEY } from "./constants";

export function headers(requiresAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
};

if (requiresAuth) {
    const token = localStorage.getItem('accessToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
}

return headers;
}

export async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return response.json();
}
