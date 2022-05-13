import Cookies from 'js-cookie';
import axios from "axios";

export default async function AxiosRequest(url: string, method: string, body: any, auth = true) {
    const csrfToken = Cookies.get('csrftoken');
    let headers: any = {"Content-Type": "application/json"}
    const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');

    if (auth && csrfToken) headers["X-CSRFToken"] = csrfToken
    if (auth && token) headers["Authorization"] = `Token ${token}`

    const response = await axios.request({
        url: `${process.env.REACT_APP_API_URL}${url}`,
        method: method,
        data: body,
        headers,
    });

    return response.data;
}
