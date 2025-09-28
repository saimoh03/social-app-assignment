import { showNotification } from "../global/notifictaion";
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

    const updateData = {};
    if (bioValue !== undefined) updateData.bio = bioValue || null;
    if (avatarValue) updateData.avatar = { url: avatarValue, alt: "Updated Avatar" };
    if (bannerValue) updateData.banner = { url: bannerValue, alt: "Updated banner" };
   
    try {
        const response = await updateProfile(currentUser.name, updateData);
        const updatedUser = (response && response.data) ? response.data : (response || null);
        
        if (updatedUser) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            currentUser = updatedUser;
            window.location.href = '/profile/';
            showNotification('Profile updated successfully!');
        } else {
            window.location.href = '/profile/';
            let message = response.errors?.[0]?.message || "Profile updated (response shape unexpected)";
            showNotification(message, 'success');
        }

        // hide modal
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.classList.add('hidden');

    } catch (err) {
        console.error('Failed to update profile:', err);
        let message = err.errors?.[0]?.message || "Failed to update profile";
        showNotification(message, 'error');
    }
}
