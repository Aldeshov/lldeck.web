import ResponseError from "../models/ResponseError";

export default async function APIRequest(url: string, method: string, headers: Headers, body: any, auth = false) {
    const token = localStorage.getItem("Token");
    headers.set("Content-Type", "application/json")
    if (auth && token) headers.set("Authorization", `JWT ${token}`);
    const data = {method, headers, body: JSON.stringify(body)} as RequestInit;
    const response = await fetch(url, data);
    const result = await response.json();
    if (!response.ok) throw {message: response.statusText, data: result} as ResponseError;
    return result;
}