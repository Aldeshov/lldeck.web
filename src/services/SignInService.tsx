import APIRequest from "./APIRequest";

const SignInService = (email: string, password: string, rememberMe: boolean) => {
    return APIRequest(
        `${process.env.REACT_APP_API_URL}/auth/users/me`,
        "POST", new Headers(),
        {username: email, password, remember_me: rememberMe},
        false
    )
}

export default SignInService;
