import { readPosts } from "../../api/post/read";
import { searchPost } from "../../api/post/search";
import { renderPostFeed } from "../global/renderPost";
import { showNotification } from "../global/notifictaion";

export async function setSearchListener() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
}

async function handleSearch() {
    console.log("search");
    
    const query = document.getElementById('searchInput').value.trim();

    if (!query) {
        const { data } = await readPosts();
        renderPostFeed(data, 'postsContainer');
        return;
    }

    try {
        const posts = await searchPost(query);
        renderPostFeed(posts, 'postsContainer');
        showNotification(`Found ${posts.length} posts matching "${query}"`);
    } catch (error) {
        const message = error.errors[0].message || 'Search failed';
        showNotification(message, 'error');
    }
}