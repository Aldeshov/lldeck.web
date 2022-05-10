import APIRequest from "./APIRequest";

const UserService = () => {
    return APIRequest(`/auth/users/me`, "GET", new Headers(), {})
}

export default UserService;
