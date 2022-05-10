import Cookies from 'js-cookie';
import ResponseError from "../models/ResponseError";

export default async function APIRequest(url: string, method: string, headers: Headers, body: any, auth = true) {
    const csrfToken = Cookies.get('csrftoken');
    const token = localStorage.getItem('Token') || sessionStorage.getItem('Token')
    let h = {
        ...headers,
        "Content-Type": "application/json",
        "X-CSRFToken": auth && csrfToken ? csrfToken : '',
        "Authorization": auth && token ? `Token ${token}` : '',
    }
    const data = method === "GET" ? {method, headers: h} :
        {method, headers: h, body: JSON.stringify(body)} as RequestInit;
    const response = await fetch(new Request(`${process.env.REACT_APP_API_URL}${url}`, data));
    const result = await response.json().catch((reason) => reason);
    if (!response.ok) throw new ResponseError(response.statusText, result);
    return result;
}
