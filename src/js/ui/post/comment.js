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
      showNotification("Comment added (unexpected response)", "warning");
      window.location.href = `/post/?id=${postId}`;
    }

  } catch (err) {
    console.error("Failed to Add New Comment:", err);
    showNotification("Failed to add comment", "error");
  }
}
