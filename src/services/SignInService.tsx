import APIRequest from "./APIRequest";

const SignInService = (username: string, password: string, remember_me: boolean) => {
    return APIRequest(
        `/auth/users/me`, "POST", {username, password, remember_me}, false
    )
}

export default SignInService;
