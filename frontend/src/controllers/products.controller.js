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
 * @param {string} productId Product ID to get Product Object from DB
 *  */ 
export function useProduct(productId) {
    const APIURL = `${API}/products/${productId}`;
    const {data, error, isLoading} = useSWR(APIURL, fetcher);
    return {
        product: data?.product,
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

/**
 * @param {string} productId ID of the product to update
 * @param {FormData} form pass form data 
 * */  
export async function updateProductBasicDetails(productId, form) {
    const resp = await axios.post(`${API}/products/${productId}/update/basic_details`, form);
    return resp;
}

/**
 * @param {string} productId ID of the product to update
 * @param {FormData} form pass form data 
 * */  
export async function updateProductAdvanceDetails(productId, form) {
    const resp = await axios.post(`${API}/products/${productId}/update/advance_details`, form);
    return resp;
}

/**
 * @param {string} productId ID of the product to update
 * @param {FormData} form pass form data 
 * */  
export async function updateProductImages(productId, form) {
    const resp = await axios.post(`${API}/products/${productId}/update/images`, form);
    return resp;
}

export async function deleteProductImage(productId, imageId, secure_url, public_id) {
    const resp = await axios.post(`${API}/products/${productId}/delete/image`, {
        imageId, secure_url, public_id
    });
    return resp;
}