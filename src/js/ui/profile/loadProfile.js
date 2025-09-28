import { getCurrentUser, getCurrentUserWithUpdated } from "../../utilities/currentUser"
import { normalizePostsResponse } from "../../utilities/utils"
import { readProfilePosts } from "../../api/profile/postRead";
import { renderPostFeed } from "../global/renderPost";

let currentUser = null;

export async function loadUserPosts(profile = null) {
    if (profile) {
        currentUser = await getCurrentUserWithUpdated(profile);
        let editProfileBtn = document.getElementById('addNewPostBtn');
        if (editProfileBtn) editProfileBtn.classList.add('hidden');
    }else {
        currentUser = getCurrentUser(profile);
    }
    const container = document.getElementById('userPostsContainer');
    const loading = document.getElementById('userPostsLoading');
    if (loading) loading.style.display = 'block';

    try {
        const res = await readProfilePosts(currentUser.name);
        
        const posts = normalizePostsResponse(res);
        if (container) {
            container.innerHTML = '';
            if (!posts.length) {
                container.innerHTML = `<p class="text-center text-gray-500">No posts found.</p>`;
            } else {
                renderPostFeed(posts, 'userPostsContainer', true);
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