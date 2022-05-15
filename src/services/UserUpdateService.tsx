import AxiosRequest from "./AxiosRequest";

const UserUpdateService = (body: any) => {
    return AxiosRequest(`/auth/users/me`, "PUT", body)
}

export default UserUpdateService;
