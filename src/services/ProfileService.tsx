import APIRequest from "./APIRequest";

const ProfileService = () => {
    return APIRequest(`${process.env.REACT_APP_API_URL}/auth/users/me/profile`,
        "GET", new Headers(), {})
}

export default ProfileService
