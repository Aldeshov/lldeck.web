import APIRequest from "./APIRequest";

const ProfileUpdateService = (about: string, selected_theme_mode: string | number, selected_language: string | number) => {
    return APIRequest(`/auth/users/me/profile`,
        "PUT", new Headers(), {about, selected_theme_mode, selected_language})
}

export default ProfileUpdateService
