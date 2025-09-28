import { readPosts } from "../../api/post/read";
import { searchPost } from "../../api/post/search";
import { renderPostFeed } from "../global/renderPost";
import { showNotification } from "../global/notifictaion";

export async function fetchAndRenderPosts() {
    const { data } = await readPosts();
    renderPostFeed(data, 'postsContainer');
}