import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { setSearchListener } from "../../ui/home/search";
import { fetchAndRenderPosts } from "../../ui/home/showPosts";
import { setPaginationlistener } from "../../ui/home/paginationListener";

authGuard();
setLogoutListener();

setSearchListener();

fetchAndRenderPosts();

setPaginationlistener();