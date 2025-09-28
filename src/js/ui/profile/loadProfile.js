import { getCurrentUser } from "../../utilities/currentUser"
import { normalizePostsResponse } from "../../utilities/utils"
import { readProfile } from "../../api/profile/read";

let currentUser = null;

export async function loadUserPosts() {
    currentUser = getCurrentUser();
    const container = document.getElementById('userPostsContainer');
    const loading = document.getElementById('userPostsLoading');
    if (loading) loading.style.display = 'block';

    try {
        const res = await readProfile(currentUser.name);
        
        const posts = normalizePostsResponse(res);
        console.log(posts);
        // replace content
        if (container) {
            container.innerHTML = ''; // clear loading
            if (!posts.length) {
                container.innerHTML = `<p class="text-center text-gray-500">No posts found.</p>`;
            } else {
                renderPostFeed(posts, 'userPostsContainer');
            }
        }
    } catch (err) {
        console.error('Error loading user posts:', err);
        if (container) {
            container.innerHTML = `<p class="text-center text-gray-500">Failed to load posts.</p>`;
        }
    } finally {
        if (loading) loading.style.display = 'none';
    }
}