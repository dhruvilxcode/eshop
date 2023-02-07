import { API } from "../config/api.config";
import axios from "axios";
import useSWR from 'swr';

axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then(res=>res.data);

export function useProducts() {
    const APIURL = `${API}/products/`;
    const {data, error, isLoading} = useSWR(APIURL, fetcher);
    return {
        products: data,
        isError: error,
        isLoading,
        APIURL,
    };
}

/**
 * @param {FormData} form pass form data 
 * */  
export async function createProduct(form) {
    const resp = await axios.post(`${API}/products/create`, form);
    return resp;
}