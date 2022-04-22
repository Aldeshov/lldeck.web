import APIRequest from "./APIRequest";

const SignInService = (email: string, password: string) => {
    return APIRequest(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        "POST", new Headers(),
        {email, password}
    )
}

export default SignInService;
