export function setLogoutListener() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/auth/login/';
            }
        });
    }
}
