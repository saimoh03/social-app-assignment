import { showNotification } from "../global/notifictaion";
import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();

  const title = document.getElementById('postTitle')?.value.trim();
  const content = document.getElementById('postContent')?.value.trim();
  const postTags = document.getElementById('postTags')?.value.trim();
  const postUrl = document.getElementById('postUrl')?.value.trim();

  const tags = postTags ? postTags.split(",").map(tag => tag.trim()) : [];

  try {
    const response = await createPost({
      title,
      body: content,
      tags,
      ... (postUrl && {media: {
        url: postUrl,
        alt: `${title} image`
      }})
    });

    if (response?.id) {
      showNotification("Post created successfully!", "success");
      window.location.href = '/profile/';
    } else {
      let message = response.errors?.[0]?.message || "Post created (unexpected response)";
      showNotification(message, "warning");
      window.location.href = '/profile/';
    }

    event.target.reset();

    const modal = document.getElementById('addPostModal');
    if (modal) modal.classList.add('hidden');

  } catch (err) {
    console.error("Failed to Add New Post:", err);
    let message = err.errors?.[0]?.message || "Failed to create post";
    showNotification(message, "error");
  }
}
