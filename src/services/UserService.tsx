import APIRequest from "./APIRequest";

const UserService = () => {
    return APIRequest(`/auth/users/me`, "GET")
}

export default UserService;
