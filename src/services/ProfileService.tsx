import APIRequest from "./APIRequest";

const ProfileService = () => {
    return APIRequest(`/auth/users/me/profile`, "GET")
}

export default ProfileService
