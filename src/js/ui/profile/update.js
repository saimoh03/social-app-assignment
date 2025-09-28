import { showNotification } from "../../../../../js/ui";

export async function onUpdateProfile(event) {
    event.preventDefault();

    const bioValue = document.getElementById('profileBioInput')?.value.trim();
    const avatarValue = document.getElementById('profileAvatarInput')?.value.trim();
    const bannerValue = document.getElementById('profileBannerInput')?.value.trim();

    // Build payload according to API (only include props if provided)
    const updateData = {};
    if (bioValue !== undefined) updateData.bio = bioValue || null;
    if (avatarValue) updateData.avatar = { url: avatarValue };
    if (bannerValue) updateData.banner = { url: bannerValue };

    try {
        const response = await updateProfile(currentUser.name, updateData);
        // response shape may vary; try to get updated user object
        const updatedUser = (response && response.data) ? response.data : (response || null);

        if (updatedUser) {
            // save updated user to localStorage (if you store user there)
            localStorage.setItem('user', JSON.stringify(updatedUser));
            currentUser = updatedUser;
            renderProfileHeader();
            showNotification('Profile updated successfully!');
        } else {
            showNotification('Profile updated (response shape unexpected)', 'success');
        }

        // hide modal
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.classList.add('hidden');

    } catch (err) {
        console.error('Failed to update profile:', err);
        showNotification('Failed to update profile', 'error');
    }
}
