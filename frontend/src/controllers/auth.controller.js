import { API } from "../config/api.config";
import axios from "axios";

axios.defaults.withCredentials = true; 

export const signIn = async (email, password) => {
    axios.defaults.withCredentials = true; 

    const resp = await axios.post(`${API}/auth/login`, {
        email,
        password
    });

    return resp;
}

export const getProfile = async () => {
    axios.defaults.withCredentials = true; 
    
    const resp = await axios.get(`${API}/auth/profile`);
    return resp;
}