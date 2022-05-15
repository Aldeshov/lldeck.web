import AxiosRequest from "./AxiosRequest";

const ProfileUpdateService = (body: any) => {
    return AxiosRequest(`/auth/users/me/profile`, "PUT", body)
}

export default ProfileUpdateService
