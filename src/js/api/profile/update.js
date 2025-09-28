import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function updateProfile(username, updateData) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/profiles/${username}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(updateData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
