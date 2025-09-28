import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function commentPost(postId, commentBody) {
    try {
        const response = await fetch(`${API_BASE_URL}/social/posts/${postId}/comment`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({
                body: commentBody,
            })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}
