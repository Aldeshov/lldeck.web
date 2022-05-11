import APIRequest from "./APIRequest";

const ProfileStatusService = () => {
    return APIRequest(`/auth/users/me/profile/status`, "GET")
}

export default ProfileStatusService;
