import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function followUser(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/profiles/${username}/follow`, {
            method: 'PUT',
            headers: headers()
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
}

/**
 * Unfollows a user
 * @param {string} username - Username to unfollow
 * @returns {Promise<Object>} Unfollow response
 */
export async function unfollowUser(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/profiles/${username}/unfollow`, {
            method: 'PUT',
            headers: headers()
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
}