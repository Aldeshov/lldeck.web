import TokenStorage from "../models/TokenStorage";
import Cookies from "js-cookie";

export default class TokenStore {
    static put(data: TokenStorage) {
        if (data.isPermanent) localStorage.setItem('Token', data.data);
        else sessionStorage.setItem('Token', data.data);
    }

    static delete() {
        Cookies.remove('csrftoken');
        localStorage.removeItem('Token');
        sessionStorage.removeItem('Token');
    }
}