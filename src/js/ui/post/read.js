import { readPost } from "../../api/post/read";
import { showNotification } from "../global/notifictaion";
import { renderSinglePost } from "../global/renderSinglePost";


export async function loadPost() {
    const container = document.getElementById("post-container");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try {
        const post = await readPost(id);
        if (post?.id) {
            showNotification("Single Post Fetched successfully!", "success");
            renderSinglePost(post, container);
        } else {
            renderSinglePost(post, container);
            showNotification("Single Post Fetched (unexpected response)", "warning");
        }

    } catch (err) {
        console.error("Failed to load post:", err);
        container.innerHTML = `<p class="text-red-500">Failed to load post</p>`;
    }
}


