import Cookies from 'js-cookie';
import axios from "axios";

export default async function AxiosRequest(url: string, method: string, body: any, auth = true) {
    const csrfToken = Cookies.get('csrftoken');
    const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    let headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": auth && csrfToken ? csrfToken : '',
        "Authorization": auth && token ? `Token ${token}` : '',
    }

    const response = await axios.request({
        url: `${process.env.REACT_APP_API_URL}${url}`,
        method: method,
        data: body,
        headers,
    });

    return response.data;
}
