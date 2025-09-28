import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function searchPost(query, limit = 12, page = 1) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/social/posts/search?q=${query}&limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`,
            {
                method: 'GET',
                headers: headers()
            }
        );

        const data = await handleResponse(response);
        return data.data;
    } catch (error) {
        console.error('Error searching posts:', error);
        throw error;
    }
}
