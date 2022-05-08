import ResponseError from "../models/ResponseError";
import Cookies from 'js-cookie';

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
    const response = await fetch(new Request(url, data));
    const result = await response.json();
    if (!response.ok) throw {message: response.statusText, data: result || {}} as ResponseError;
    return result;
}
