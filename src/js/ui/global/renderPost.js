import { getCurrentUser } from "../../utilities/currentUser";


export function renderPostFeed(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No posts found.</p>';
        return;
    }
    
    container.innerHTML = posts.map(post => renderPostCard(post)).join('');
}

export function renderPostCard(post) {
    const user = getCurrentUser();
    const isOwner = user && user.name === post.author?.name;
    
    return `
        <div class="bg-white rounded-lg shadow-md p-6 mb-4 w-[50%]" mx-auto data-post-id="${post.id}">
            <div class="flex items-center mb-4">
                <img src="${post.author?.avatar?.url || '/default-avatar.png'}" 
                     alt="${post.author?.avatar?.alt || 'User avatar'}"
                     class="w-10 h-10 rounded-full mr-3">
                <div>
                    <h3 class="font-semibold">${post.author?.name || 'Unknown User'}</h3>
                    <p class="text-gray-500 text-sm">${new Date(post.created).toLocaleDateString()}</p>
                </div>
            </div>
            
            <h2 class="text-xl font-bold mb-2">${post.title}</h2>
            <p class="text-gray-700 mb-4">${post.body}</p>
            
            ${post.media?.url ? `
                <img src="${post.media.url}" alt="${post.media.alt || 'Post media'}" 
                     class="w-[70%] h-auto object-cover rounded mb-4 mx-auto">
            ` : ''}
            
            <div class="flex justify-between items-center">
                <div class="flex space-x-2">
                    ${post.tags?.map(tag => 
                        `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">#${tag}</span>`
                    ).join('')}
                </div>
                
                ${isOwner ? `
                    <div class="flex space-x-2">
                        <button onclick="editPost(${post.id})" 
                                class="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                            Edit
                        </button>
                        <button onclick="deletePost(${post.id})" 
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm">
                            Delete
                        </button>
                    </div>
                ` : ''}
            </div>
            
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
        </div>
    `;
}