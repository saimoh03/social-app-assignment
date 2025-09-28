import { registerUser } from "../../api/auth/register";

export async function onRegister(event) {
    event.preventDefault();
    console.log("register");
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const bio = document.getElementById('bio').value;
    const avatar = document.getElementById('avatar').value;
    
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    errorDiv.classList.add('hidden');
    successDiv.classList.add('hidden');
    
    if (!email.endsWith('@stud.noroff.no')) {
        errorDiv.textContent = 'Email must be a @stud.noroff.no address';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    if (password.length < 8) {
        errorDiv.textContent = 'Password must be at least 8 characters long';
        errorDiv.classList.remove('hidden');
        return;
    }
    
    try {
        const profileData = {};
        if (bio) {
            profileData.bio = bio
        };
        if (avatar) {
            profileData.avatar = { url: avatar }
        };
        
        const response = await registerUser(name, email, password, profileData);
        console.log(response);
        
        successDiv.textContent = 'Registration successful! Redirecting to login...';
        successDiv.classList.remove('hidden');
        
        // redirect after 1.5s
        setTimeout(() => {
            window.location.href = '/auth/login/';
        }, 1500);
        
    } catch (error) {        
        errorDiv.textContent = error.errors[0].message || 'Registration failed. Please try again.';
        errorDiv.classList.remove('hidden');
    }
}
