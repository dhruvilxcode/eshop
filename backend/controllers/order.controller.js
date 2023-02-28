import CONFIG from "../config/index.js";
import { stripeObj } from "../config/stripe.config.js";
import Order from "../models/order.model.js";

export const createPaymentIntent = async (req, res) => {
    try {
        const { 
            amount
        } = req.body;
    
        const paymentIntent = await stripeObj.paymentIntents.create({
            amount,
            currency: CONFIG.CURRENCY,
            automatic_payment_methods: {enabled: true},
        })
    
        return res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
};

export const saveOrderDetails = async (req, res) => {
    try {
        const {
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
        } = req.body;

        const order = await Order.create({
            products,
           name: {
            firstname,
            lastname,
           } ,
           amount: amount,
           coupon: coupon,
           transactionId: paymentId,
           email,
           phoneNumber: phone,
           address: {
            line1,
            line2,
            area,
            city,
            state,
            pincode: postalcode,
            country,
           }
        });

        return res.status(200).json({
            success: true,
            order
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
};