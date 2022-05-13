import Cookies from 'js-cookie';
import ResponseError from "../models/ResponseError";

export default async function APIRequest(url: string, method: string, body?: any, auth = true) {
    const csrfToken = Cookies.get('csrftoken');
    let headers: any = {"Content-Type": "application/json"}
    const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');

    if (auth && csrfToken) headers["X-CSRFToken"] = csrfToken
    if (auth && token) headers["Authorization"] = `Token ${token}`

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}${url}`,
        method === "GET" ? {method, headers} : {method, headers, body: JSON.stringify(body)}
    );

    const result = await response.json().catch((reason) => reason);

    if (!response.ok) throw new ResponseError(response.statusText, result);
    return result;
}
