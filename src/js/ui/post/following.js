import { followingPost } from "../../api/post/following";
import { readProfile } from "../../api/profile/read";
import { showNotification } from "../global/notifictaion";

export async function setupFollowButton(authorName, currentUserName) {
  const btn = document.getElementById("followBtn");
  if (!btn) return;

  try {
    const profile = await readProfile(authorName);
    const isFollowing = profile.followers.some(f => f.name === currentUserName);
    btn.innerText = isFollowing ? "Unfollow" : "Follow";

    btn.addEventListener("click", async () => {
      const action = btn.innerText === "Unfollow" ? "unfollow" : "follow";

      try {
        await followingPost(authorName, action);
        btn.innerText = action === "follow" ? "Unfollow" : "Follow";
        showNotification(`You ${action}ed ${authorName}`, "success");
      } catch (err) {
        console.error(`Failed to ${action} user:`, err);
        let message = err.errors?.[0]?.message || "Failed to update follow status";
        showNotification(message, "warning");
      }
    });
  } catch (err) {
    console.error("Failed to fetch profile for follow state:", err);
  }
}
