import { readProfile } from "../api/profile/read";

export function getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

export async function getCurrentUserWithUpdated() {
    const userData = localStorage.getItem('user');
    try {
        const response = await readProfile(JSON.parse(userData).name);
        return response;
    } catch (error) {

    }
}