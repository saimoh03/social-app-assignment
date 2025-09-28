import { getCurrentUser } from "../../utilities/currentUser";

let currentUser = null;
let userStats = { posts: 0, followers: 0, following: 0 };

export function renderProfileHeader() {

    currentUser = getCurrentUser();

    const bannerWrapper = document.getElementById('profileBannerWrapper');
    bannerWrapper.innerHTML = ''; // clear
    if (currentUser.banner?.url) {
        const img = document.createElement('img');
        img.src = currentUser.banner.url;
        img.alt = currentUser.banner?.alt || 'Banner';
        img.className = 'w-full h-full object-cover';
        bannerWrapper.appendChild(img);
    }

    // Ensure Edit Profile button exists inside banner wrapper (so it visually overlays)
    let editBtn = document.getElementById('editProfileBtn');
    if (!editBtn) {
        editBtn = document.createElement('button');
        editBtn.id = 'editProfileBtn';
        editBtn.className = 'absolute top-4 right-4 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm';
        editBtn.textContent = 'Edit Profile';
        bannerWrapper.appendChild(editBtn);
    }

    // Avatar
    const avatarImg = document.getElementById('profileAvatarImg');
    avatarImg.src = currentUser.avatar?.url || '/default-avatar.png';
    avatarImg.alt = currentUser.avatar?.alt || 'User avatar';

    // Basic info
    document.getElementById('profileName').textContent = currentUser.name || '';
    document.getElementById('profileEmail').textContent = currentUser.email || '';

    const bioDisplay = document.getElementById('profileBioDisplay');
    if (currentUser.bio) {
        bioDisplay.textContent = currentUser.bio;
        bioDisplay.classList.remove('hidden');
    } else {
        bioDisplay.textContent = '';
        bioDisplay.classList.add('hidden');
    }

    // Stats: try to use _count if present on user, otherwise fallback to local values
    if (currentUser._count) {
        userStats.posts = currentUser._count.posts || 0;
        userStats.followers = currentUser._count.followers || 0;
        userStats.following = currentUser._count.following || 0;
    }

    document.getElementById('statPosts').textContent = userStats.posts || 0;
    document.getElementById('statFollowers').textContent = userStats.followers || 0;
    document.getElementById('statFollowing').textContent = userStats.following || 0;

    // Pre-fill edit form inputs (if modal exists)
    const bioInput = document.getElementById('profileBioInput');
    const avatarInput = document.getElementById('profileAvatarInput');
    const bannerInput = document.getElementById('profileBannerInput');

    if (bioInput) bioInput.value = currentUser.bio || '';
    if (avatarInput) avatarInput.value = currentUser.avatar?.url || '';
    if (bannerInput) bannerInput.value = currentUser.banner?.url || '';
}