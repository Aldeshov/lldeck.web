import APIRequest from "./APIRequest";

const UserService = () => {
    return APIRequest(`${process.env.REACT_APP_API_URL}/auth/profile`, "GET", new Headers(), null, true)
}

export default UserService;