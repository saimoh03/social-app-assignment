import { API_AUTH_LOGIN } from "../constants";
import { handleResponse, headers } from "../headers";

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export async function loginUser(email, password) {        
    try {
        const response = await fetch(`${API_AUTH_LOGIN}`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ email, password })
        });
        
        const data = await handleResponse(response);
        
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.data));
        
        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}