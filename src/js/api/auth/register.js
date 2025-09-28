import { API_AUTH_REGISTER } from "../constants";
import { handleResponse, headers } from "../headers";

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {Object} profile
 * @returns {Promise<Object>}
 */
export async function registerUser(name, email, password, profile = {}) {
    try {
        const response = await fetch(`${API_AUTH_REGISTER}`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({
                name,
                email,
                password,
                ...profile
            })
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}