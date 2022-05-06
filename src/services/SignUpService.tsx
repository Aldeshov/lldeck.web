import APIRequest from "./APIRequest";

const SignUpService = (name: string, phoneNumber: string, email: string, password: string) => {
    return APIRequest(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        "POST", new Headers(),
        {name, phoneNumber, email, password}
    )
}

export default SignUpService;
