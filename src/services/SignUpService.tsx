import APIRequest from "./APIRequest";

const SignUpService = (first_name: string,last_name: string, email: string, password: string) => {
    return APIRequest(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        "POST", new Headers(),
        {first_name, last_name, email, password}
    )
}

export default SignUpService;
