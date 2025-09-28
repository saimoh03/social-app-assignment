import { deletePost } from "../../api/post/delete";
import { readPost } from "../../api/post/read";

export const userPostsHandlesInitialize = () => {

    window.onDeletePost = async function (id) {
        try {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) {
                const response = await deletePost(id);

                if (response) {
                    window.location.href = '/profile/';
                    showNotification("Post deleted successfully!", "success");
                } else {
                    window.location.href = '/profile/';
                    let message = response.errors?.[0]?.message || "Post deleted (unexpected response)";
                    showNotification(message, "warning");
                }
            }
        } catch (error) {
            console.error('Failed to delete post:', err);
            let message = err.errors?.[0]?.message || "Failed to delete post";
            showNotification(message, 'error');
        }
    }

    window.onUpdatePost = async function (id) {
        try {
            const post = await readPost(id);
            if (!post) {
                let message = post.errors?.[0]?.message || "Could not load post details";
                showNotification(message, "error");
                return;
            }
            
            document.getElementById("editPostTitle").value = post.title || "";
            document.getElementById("editPostContent").value = post.body || "";
            document.getElementById("editPostTags").value = post.tags?.join(", ") || "";
            document.getElementById("editPostUrl").value = post.media?.[0]?.url || "";

            const form = document.getElementById("editPostForm");
            form.dataset.postId = id;

            const modal = document.getElementById("editPostModal");

            if (modal) modal.classList.remove("hidden");
        } catch (err) {
            console.error("Failed to load post:", err);
            let message = err.errors?.[0]?.message || "Failed to load post";
            showNotification(message, "error");
        }
    };

}