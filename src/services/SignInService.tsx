import APIRequest from "./APIRequest";

const SignInService = (email: string, password: string) => {
    return APIRequest<any>(`${process.env.REACT_APP_API_URL}/auth/login`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
}

export default SignInService;
