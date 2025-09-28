import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";
import { onUpdateProfile } from "../../ui/profile/update";
import { setupEventListeners } from "../../ui/profile/eventLister";
import { loadUserPosts } from "../../ui/profile/loadProfile";
import { renderProfileHeader } from "../../ui/profile/header";

authGuard();
setLogoutListener();
renderProfileHeader();
loadUserPosts();
setupEventListeners();
document.forms.editProfileForm.addEventListener('submit', onUpdateProfile);
