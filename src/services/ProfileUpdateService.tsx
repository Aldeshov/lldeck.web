import APIRequest from "./APIRequest";

const ProfileUpdateService = (body: any) => {
    return APIRequest(`/auth/users/me/profile`, "PUT", body)
}

export default ProfileUpdateService
