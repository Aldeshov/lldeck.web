import APIRequest from "./APIRequest";

const ProfileService = () => {
    return APIRequest(`/auth/users/me/profile`,
        "GET", new Headers(), {})
}

export default ProfileService
