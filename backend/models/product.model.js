import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxLength: [120, 'Product name should be less than 120 character'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        maxLength: 10,
    },
    mrp: {
        type: Number,
    },
    sku_id: {
        type: String,
    },
    description: {
        type: String // use editorjs or similar
    },
    variants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ],
    sizes: [
        {
            type: String,
        }
    ],
    featured: {
        type: Boolean,
        default: false,
    },
    photos: [
        {
            secure_url: {
                type: String,
                required: true
            },
            public_id: String,
        }
    ],
    stock: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    },
}, {timestamps: true});

export default mongoose.model("Product", productSchema);