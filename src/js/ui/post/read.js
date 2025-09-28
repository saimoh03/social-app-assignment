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
            let message = post.errors?.[0]?.message || "Single Post Fetched (unexpected response)";
            showNotification(message, "warning");
        }

    } catch (err) {
        console.error("Failed to load post:", err);
        let message = err.errors?.[0]?.message || "Failed to load post";
        showNotification(message, "error");
        container.innerHTML = `<p class="text-red-500">Failed to load post</p>`;
    }
}


