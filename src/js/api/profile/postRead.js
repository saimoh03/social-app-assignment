import { API_BASE_URL } from "../constants";
import { handleResponse, headers } from "../headers";

export async function readProfilePosts(username) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/social/profiles/${username}/posts?_author=true&_comments=true&_reactions=true`,
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

export async function readProfiles(limit, page) { }
