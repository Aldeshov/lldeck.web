import APIRequest from "./APIRequest";

const UserService = () => {
    return APIRequest(`${process.env.REACT_APP_API_URL}/auth/users/me`, "GET", new Headers(), {})
}

export default UserService;
