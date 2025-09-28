import { getCurrentUser } from "../../utilities/currentUser";
import { onCommentSubmit } from "../post/comment";
import { setupFollowButton } from "../post/following";

export async function renderSinglePost(post, container) {
  const user = getCurrentUser();
  const isOwner = user && user.name === post.author?.name;

  container.innerHTML = `
    <div class="bg-white shadow-md rounded-lg p-6">
      <!-- Author -->
      <div class="flex items-center mb-4">
        <img src="${post.author?.avatar?.url || '/images/default-avatar.jpg'}"
             alt="${post.author?.avatar?.alt || 'User avatar'}"
             class="w-12 h-12 rounded-full mr-3">
        <div>
          <h3 class="font-semibold">${post.author?.name}</h3>
          <p class="text-gray-500 text-sm">${new Date(post.created).toLocaleDateString()}</p>
        </div>
        ${!isOwner
          ? `<button id="followBtn" class="bg-blue-200/50 text-black px-4 py-2 rounded ml-auto">
               Follow
             </button>`
          : ""}
      </div>

      <!-- Title & Body -->
      <h2 class="text-2xl font-bold mb-4">${post.title}</h2>
      <p class="mb-4">${post.body}</p>

      <!-- Media -->
      ${post.media?.url ? `<img src="${post.media.url}" class="w-full rounded mb-4"/>` : ""}

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        ${post.tags?.map(tag =>
          `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#${tag}</span>`
        ).join("")}
      </div>

      <!-- Comments & Reactions -->
      <div class="mt-4 flex justify-between text-gray-500 text-sm">
        <div class="mt-4">
          <h4 class="font-semibold text-sm mb-2">Comments (${post._count?.comments || 0})</h4>
          <div class="space-y-2">
            ${post.comments?.map(c => `
              <div class="flex items-start space-x-2">
                <img src="${c.author?.avatar?.url || '/default-avatar.png'}"
                     alt="${c.author?.avatar?.alt || 'User avatar'}"
                     class="w-6 h-6 rounded-full">
                <div>
                  <p class="text-sm font-medium">${c.author?.name || 'Anonymous'}</p>
                  <p class="text-gray-700 text-sm">${c.body}</p>
                </div>
              </div>
            `).join('') || '<p class="text-gray-500 text-sm">No comments yet</p>'}
          </div>
        </div>
        <div class="mt-4">
          <h4 class="font-semibold text-sm mb-2">Reactions (${post._count?.reactions || 0})</h4>
          <div class="flex space-x-3">
            ${post.reactions?.map(r => `
              <span class="flex items-center space-x-1 text-sm">
                <span>${r.symbol}</span>
                <span>${r.count}</span>
              </span>
            `).join('') || '<p class="text-gray-500 text-sm">No reactions yet</p>'}
          </div>
        </div>
      </div>

      <!-- Add Comment -->
      <div class="mt-6">
        <h4 class="font-semibold text-sm mb-2">Add a Comment</h4>
        <form name="commentForm" class="flex flex-col space-y-2">
          <div class="flex justify-around">
            <input type="text" id="commentBody" 
              class="border rounded p-2 text-sm w-full"
              placeholder="Write your comment..." required>
            <input type="hidden" value="${post.id}" id="postId">
            <button type="submit" 
              class="bg-blue-500 text-white px-4 py-2 rounded text-sm w-fit">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.forms.commentForm;
  if (form) {
    form.addEventListener("submit", onCommentSubmit);
  }

  if (!isOwner) {
    await setupFollowButton(post.author.name, user?.name);
  }
}
