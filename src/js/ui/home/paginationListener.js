import { readPosts } from "../../api/post/read";
import { searchPost } from "../../api/post/search";
import { renderPostFeed } from "../global/renderPost";
import { showNotification } from "../global/notifictaion";

export async function setPaginationlistener() {
    try {
        const pagination = createPagination("pagination", async (page) => {
            const { data, meta } = await readPosts(20, page);
            renderPostFeed(data, "postsContainer");
            return meta;
        });

        const { data, meta } = await readPosts(20, 1);
        renderPostFeed(data, "postsContainer");
        pagination.render(meta);
        // Setup event listeners
    } catch (error) {
        console.error('Error initializing app:', error);
        const message = error.errors[0].message || 'Failed to load posts';
        showNotification(message, "error");
    }
}



export function createPagination(containerId, onPageChange) {    
    const pagination = document.getElementById(containerId);
    let state = { currentPage: 1, pageCount: 1 };

    function render(meta) {
        state = {
            currentPage: meta?.currentPage || 1,
            pageCount: meta?.pageCount || 1,
            previousPage: meta?.previousPage,
            nextPage: meta?.nextPage,
        };

        pagination.innerHTML = "";
        if (!meta || meta.pageCount <= 1) return;

        // Prev button
        if (state.previousPage) {
            const prevBtn = document.createElement("button");
            prevBtn.textContent = "Prev";
            prevBtn.className = "px-3 py-1 rounded bg-gray-200 hover:bg-gray-300";
            prevBtn.onclick = async () => {
                const newMeta = await onPageChange(state.previousPage);
                render(newMeta); // update pagination internally
            };
            pagination.appendChild(prevBtn);
        }

        // Info
        const pageInfo = document.createElement("span");
        pageInfo.textContent = `Page ${state.currentPage} of ${state.pageCount}`;
        pageInfo.className = "px-4 py-1 text-gray-600";
        pagination.appendChild(pageInfo);

        // Next button
        if (state.nextPage) {
            const nextBtn = document.createElement("button");
            nextBtn.textContent = "Next";
            nextBtn.className = "px-3 py-1 rounded bg-gray-200 hover:bg-gray-300";
            nextBtn.onclick = async () => {
                const newMeta = await onPageChange(state.nextPage);
                render(newMeta);
            };
            pagination.appendChild(nextBtn);
        }
    }

    return { render };
}