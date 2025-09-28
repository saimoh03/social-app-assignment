import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function followingPost(authorName, action) {
    try {
        const response =  await fetch(`${API_BASE_URL}/social/profiles/${authorName}/${action}`, {
            method: "PUT",
            headers: headers(),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error following post:', error);
        throw error;
    }
}
