import { showNotification } from "../global/notifictaion";
import { createPost } from "../../api/post/create";
import { commentPost } from "../../api/post/comment";

export async function onCommentSubmit(event) {
  event.preventDefault();

  const commentBody = document.getElementById('commentBody')?.value.trim();
  const postId = document.getElementById('postId')?.value.trim();

  try {
    const response = await commentPost(postId, commentBody);

    if (response?.id) {
      showNotification("Comment added successfully!", "success");
      window.location.href = `/post/?id=${postId}`;
    } else {
      let message = response.errors?.[0]?.message || "Comment added (unexpected response)";
      showNotification(message, "warning");
      window.location.href = `/post/?id=${postId}`;
    }

  } catch (err) {
    let message = err.errors?.[0]?.message || "Failed to add comment";
    console.error("Failed to Add New Comment:", err);
    showNotification(message, "error");
  }
}
