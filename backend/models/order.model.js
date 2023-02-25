import mongoose from "mongoose";
import {OrderStatus} from "../utils/orderStatus"

const orderSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    max: [10, "You can only order 10 or less quantity for product at single time."]
                },
                size: {
                    type: String,
                }
            }
        ],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        }
    },
    address: {
        line1: {
            type: String,
            required: true,
        },
        line2: String,
        area: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        country: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    coupon: String,
    transactionId: String, 
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.ORDERED,
    }
}, {timestamps: true});

export default mongoose.model('Order', orderSchema);