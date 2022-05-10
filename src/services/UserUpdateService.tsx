import APIRequest from "./APIRequest";

const UserUpdateService = (
    name: string,
    email: string,
    phone_number: string,
    old_password: string,
    new_password1: string,
    new_password2: string
) => {
    return APIRequest(`/auth/users/me`,
        "PUT", new Headers(), {name, email, phone_number, old_password, new_password1, new_password2})
}

export default UserUpdateService;
