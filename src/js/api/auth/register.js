import { API_AUTH_REGISTER } from "../constants";
import { handleResponse, headers } from "../headers";

/**
 * Registers a new user
 * @param {string} name - Username
 * @param {string} email - User email (must be @stud.noroff.no)
 * @param {string} password - User password
 * @param {Object} profile - Optional profile data
 * @returns {Promise<Object>} User data
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