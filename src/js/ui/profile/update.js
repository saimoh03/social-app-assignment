import { showNotification } from "../../../../../js/ui";
import { updateProfile } from "../../api/profile/update";
import { getCurrentUser } from "../../utilities/currentUser";
import { renderProfileHeader } from "./header";

let currentUser = null;
export async function onUpdateProfile(event) {
    event.preventDefault();

    currentUser = getCurrentUser();
    const bioValue = document.getElementById('profileBioInput')?.value.trim();
    const avatarValue = document.getElementById('profileAvatarInput')?.value.trim();
    const bannerValue = document.getElementById('profileBannerInput')?.value.trim();

    // Build payload according to API (only include props if provided)
    const updateData = {};
    if (bioValue !== undefined) updateData.bio = bioValue || null;
    if (avatarValue) updateData.avatar = { url: avatarValue, alt: "Updated Avatar" };
    if (bannerValue) updateData.banner = { url: bannerValue, alt: "Updated banner" };
   
    try {
        const response = await updateProfile(currentUser.name, updateData);
        // response shape may vary; try to get updated user object
        const updatedUser = (response && response.data) ? response.data : (response || null);
        console.log(updatedUser);
        
        if (updatedUser) {
            // save updated user to localStorage (if you store user there)
            localStorage.setItem('user', JSON.stringify(updatedUser));
            currentUser = updatedUser;
            window.location.href = '/profile/';
            showNotification('Profile updated successfully!');
        } else {
            window.location.href = '/profile/';
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
