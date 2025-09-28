export function authGuard() {
  if (!localStorage.accessToken) {
    // alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}


async function initializeApp() {
  try {
      const pagination = createPagination("pagination", async (page) => {
          const { data, meta } = await fetchAllPosts(20, page);
          renderPostFeed(data, "postsContainer");
          return meta; // hand back to pagination so it updates itself
      });
      
      const { data, meta } = await fetchAllPosts(20, 1);
      renderPostFeed(data, "postsContainer");
      pagination.render(meta);
      // Setup event listeners
  } catch (error) {
      console.error('Error initializing app:', error);
      const message = error.errors[0].message || 'Failed to load posts';
      showNotification(message, "error");
  }
}

export const logoutHandler = () => {
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
}
}