import APIRequest from "./APIRequest";

const SignUpService = (name: string, phoneNumber: string, email: string, password: string, confirmPassword: string) => {
    return APIRequest(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        "POST", new Headers(),
        {name, email, phone_number: phoneNumber, password1: password, password2: confirmPassword},
        false
    )
}

export default SignUpService;
