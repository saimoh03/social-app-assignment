import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function deletePost(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/posts/${id}`, {
            method: 'DELETE',
            headers: headers()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}
