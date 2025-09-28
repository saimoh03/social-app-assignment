import { showNotification } from "../global/notifictaion";
import { updatePost } from "../../api/post/update";

export const onUpdatePost = async (event) => {
    event.preventDefault();
    const form = event.target;
    const id = form.dataset.postId;

    const title = document.getElementById("editPostTitle").value.trim();
    const content = document.getElementById("editPostContent").value.trim();
    const tags = document
        .getElementById("editPostTags")
        .value.trim()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    const postUrl = document.getElementById("editPostUrl").value.trim();

    const payload = {
        title,
        body: content,
        tags,
        ... (postUrl && {media: {
          url: postUrl,
          alt: `${title} image`
        }})
      };

    try {
        const response = await updatePost(id, payload);

        if (response) {
            showNotification("Post updated successfully!", "success");
            window.location.href = '/profile/';
        } else {
            showNotification("Unexpected response from server", "warning");
            window.location.href = '/profile/';
        }

        // Hide modal
        document.getElementById("editPostModal").classList.add("hidden");
        form.reset();
    } catch (err) {
        console.error("Failed to update post:", err);
        showNotification("Failed to update post", "error");
    }
};