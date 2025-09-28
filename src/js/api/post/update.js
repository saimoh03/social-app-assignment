import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function updatePost(id, { title, body, tags, media }) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/posts/${id}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify({
                title,
                body,
                tags,
                media
            })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}
