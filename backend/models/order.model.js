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
                }
            }
        ],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true,
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