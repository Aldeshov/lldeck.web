import APIRequest from "./APIRequest";

const UserDeleteService = () => {
    return APIRequest(`/auth/users/me`, "DELETE")
}

export default UserDeleteService;
