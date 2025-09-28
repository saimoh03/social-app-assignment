import { onUpdateProfile } from "./update";

export function setupEventListeners() {
    // Edit profile open
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.classList.remove('hidden');
      });
    }
  
    // Add new Post
    const addNewPostBtn = document.getElementById('addNewPostBtn');
    if (addNewPostBtn) {
      addNewPostBtn.addEventListener('click', () => {
        const modal = document.getElementById('addPostModal');
        if (modal) modal.classList.remove('hidden');
      });
    }
  
    // Cancel edit
    const cancelBtn = document.getElementById('cancelEditBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.classList.add('hidden');
      });
    }
  
    // Submit edit form
    const editForm = document.getElementById('editProfileForm');
    if (editForm) editForm.addEventListener('submit', onUpdateProfile);
  }