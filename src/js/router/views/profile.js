import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";
import { onUpdateProfile } from "../../ui/profile/update";
import { setupEventListeners } from "../../ui/profile/eventLister";
import { loadUserPosts } from "../../ui/profile/loadProfile";
import { renderProfileHeader } from "../../ui/profile/header";
import { onCreatePost } from "../../ui/post/create";
import { userPostsHandlesInitialize } from "../../ui/post/delete";
import { onUpdatePost } from "../../ui/post/update";

authGuard();
setLogoutListener();
renderProfileHeader();
loadUserPosts();
setupEventListeners();
userPostsHandlesInitialize();
document.forms.editProfileForm.addEventListener('submit', onUpdateProfile);
document.forms.createPostForm.addEventListener('submit', onCreatePost);
document.forms.editPostForm.addEventListener('submit', onUpdatePost);
