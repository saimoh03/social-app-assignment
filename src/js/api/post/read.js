import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function readPost(id) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
            {
                method: 'GET',
                headers: headers()
            }
        );

        const data = await handleResponse(response);
        return data.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

/**
 * Fetches all posts from the API
 * @param {number} limit - Number of posts to fetch
 * @param {number} page - Page number
 * @returns {Promise<Array>} Array of post objects
 */
export async function readPosts(limit = 12, page = 1, tag) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/social/posts?limit=${limit}&page=${page}&_author=true&_comments=true&_reactions=true`,
            {
                method: 'GET',
                headers: headers(true)
            }
        );

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/social/profiles/${username}/posts`,
            {
                method: 'GET',
                headers: headers()
            }
        );

        const data = await handleResponse(response);
        return data.data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
}
