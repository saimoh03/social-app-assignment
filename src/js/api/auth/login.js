import { API_AUTH_LOGIN } from "../constants";
import { handleResponse, headers } from "../headers";

/**
 * Logs in a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data with access token
 */
export async function loginUser(email, password) {        
    try {
        const response = await fetch(`${API_AUTH_LOGIN}`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ email, password })
        });
        
        const data = await handleResponse(response);
        
        // Store token and user data
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.data));
        
        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}