import {createStore} from "redux";
import TokenStorage from "../models/TokenStorage";


const tokenReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'GET':
            return localStorage.getItem('Token') || sessionStorage.getItem('Token');
        case 'PUT':
            let payload = action.payload as TokenStorage;
            if (payload.isPermanent) localStorage.setItem('Token', payload.data);
            else sessionStorage.setItem('Token', payload.data);
            return payload.data;
        case 'DELETE':
            localStorage.removeItem('Token');
            sessionStorage.removeItem('Token');
            return '';
        default:
            console.log(`TokenReducer 'default' access for: state(${JSON.stringify(state)}), action(${JSON.stringify(action)})`)
            return state;
    }
}

const defaultStore = createStore<string, any, any, any>(tokenReducer);

export default defaultStore;