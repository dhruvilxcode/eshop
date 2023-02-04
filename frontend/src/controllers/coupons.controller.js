import { API } from "../config/api.config";
import axios from "axios";
import useSWR from 'swr';

axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url).then(res=>res.data);

export function useCoupons() {
    const APIURL = `${API}/coupons/`;
    const {data, error, isLoading} = useSWR(APIURL, fetcher);
    return {
        coupons: data,
        isError: error,
        isLoading,
        APIURL,
    };
}

export async function getCoupons() {
    const resp = await axios.get(`${API}/coupons/`);
    return resp;
}

/**
 * @param {string} couponCode unique code for coupon
 * @param {number} discount coupon discount value between 1-100%
 * */  
export async function createCoupon(couponCode, discount) {
    const resp = await axios.post(`${API}/coupons/create`, {
        code: couponCode,
        discount: discount,
    });
    return resp;
}

/**
 * @param {string} couponCode unique code for coupon
 * */  
export async function deleteCoupon(couponCode) {
    const resp = await axios.delete(`${API}/coupons/delete/${couponCode}`);
    return resp;
}

/**
 * @param {string} couponCode unique code for coupon
 * */  
export async function activateCoupon(couponCode) {
    const resp = await axios.put(`${API}/coupons/activate/${couponCode}`);
    return resp;
}

/**
 * @param {string} couponCode unique code for coupon
 * */  
export async function deactivateCoupon(couponCode) {
    const resp = await axios.put(`${API}/coupons/deactivate/${couponCode}`);
    return resp;
}