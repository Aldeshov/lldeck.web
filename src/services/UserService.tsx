import APIRequest from "./APIRequest";

const UserService = (token: string) => {
    return APIRequest<any>(`${process.env.REACT_APP_API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export default UserService;