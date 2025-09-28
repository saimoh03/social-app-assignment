import { deletePost } from "../../api/post/delete";
import { readPost } from "../../api/post/read";

export const userPostsHandlesInitialize = () => {

    window.onDeletePost = async function (id) {
        try {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) {
                const response = await deletePost(id);

                if (response) {
                    showNotification("Post deleted successfully!", "success");
                } else {
                    showNotification("Post deleted (unexpected response)", "warning");
                }
            }
        } catch (error) {
            console.error('Failed to delete post:', err);
            showNotification('Failed to delete post', 'error');
        }
    }

    window.onUpdatePost = async function (id) {
        try {
            const post = await readPost(id);
            if (!post) {
                showNotification("Could not load post details", "error");
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
            showNotification("Failed to load post", "error");
        }
    };

}