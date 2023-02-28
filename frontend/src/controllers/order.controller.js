import { API } from "../config/api.config";
import axios from "axios";

axios.defaults.withCredentials = true;

/**
 * @param {number} amount - original price * 100
 *  */
export const getStripeClientSecret = async (amount) => {
  const resp = await axios.post(`${API}/order/paymentintent`, {
    amount,
  });

  return resp;
};
export const saveOrderDetails = async (
  products,
  firstname,
  lastname,
  phone,
  email,
  line1,
  line2,
  area,
  city,
  state,
  postalcode,
  country,
  paymentId,
  coupon,
  amount
) => {
  const resp = await axios.post(`${API}/order/save`, {
    products,
    firstname,
    lastname,
    phone,
    email,
    line1,
    line2,
    area,
    city,
    state,
    postalcode,
    country,
    paymentId,
    coupon,
    amount,
  });

  return resp;
};
