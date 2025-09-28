import { loginUser } from "../../api/auth/login";

export async function onLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');

    try {
        await loginUser(email, password);
        window.location.href = '/';
    } catch (error) {     
        errorDiv.textContent = error.errors[0].message || error.message;
        errorDiv.classList.remove('hidden');
    }
}
