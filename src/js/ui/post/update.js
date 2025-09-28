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
            let message = response.errors?.[0]?.message || "Unexpected response from server";
            showNotification(message, "warning");
            window.location.href = '/profile/';
        }

        // hide modal
        document.getElementById("editPostModal").classList.add("hidden");
        form.reset();
    } catch (err) {
        console.error("Failed to update post:", err);
        let message = err.errors?.[0]?.message || "Failed to update post";
        showNotification(message, "error");
    }
};