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
    let error;
    try {
      error = await response.json();
    } catch {
      error = { message: "Unknown error" };
    }
    return Promise.reject(error);
  }

  // 204 means "No Content", so just return true
  if (response.status === 204) {
    return true;
  }

  return response.json();
}

