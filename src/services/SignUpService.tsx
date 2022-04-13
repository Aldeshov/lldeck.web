import APIRequest from "./APIRequest";

const SignUpService = (name: string, email: string, password: string) => {
    return APIRequest<any>(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
}

export default SignUpService;
