export function setupEventListeners() {
  // Edit profile btn to open modal
  const editBtn = document.getElementById('editProfileBtn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const modal = document.getElementById('editProfileModal');
      if (modal) modal.classList.remove('hidden');
    });
  }

  // Add new Post btn to open modal of post
  const addNewPostBtn = document.getElementById('addNewPostBtn');
  if (addNewPostBtn) {
    addNewPostBtn.addEventListener('click', () => {
      const modal = document.getElementById('addPostModal');
      if (modal) modal.classList.remove('hidden');
    });
  }

  // Cancel edit profile modal btn to hide modal
  const cancelBtn = document.getElementById('cancelEditBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      const modal = document.getElementById('editProfileModal');
      if (modal) modal.classList.add('hidden');
    });
  }

  // Cancel add post modal btn to hide modal
  const cancelAddPostBtn = document.getElementById('cancelAddPostBtn');
  if (cancelAddPostBtn) {
    cancelAddPostBtn.addEventListener('click', () => {
      const modal = document.getElementById('addPostModal');
      if (modal) modal.classList.add('hidden');
    });
  }

  // Cancel edit post modal btn to hide modal
  const cancelEditPostBtn = document.getElementById('cancelEditsPostBtn');
  if (cancelEditPostBtn) {
      cancelEditPostBtn.addEventListener('click', () => {
          const modal = document.getElementById('editPostModal');
          if (modal) modal.classList.add('hidden');
      });
  }

}