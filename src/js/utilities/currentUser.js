import { readProfile } from "../api/profile/read";

export function getCurrentUser(profile) {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

export async function getCurrentUserWithUpdated(profile) {
    const userData = localStorage.getItem('user');
    try {
        if (profile) {
            const response = await readProfile(profile);
            return response;
            
        }else{
            const response = await readProfile(JSON.parse(userData).name);
            return response;
        }
    } catch (error) {

    }
}