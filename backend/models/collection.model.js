import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide collection name'],
        trim: true,
        maxLength: [
            120, 
            "name should be less than 120 characters"
        ]
    }
}, {timestamps: true});

export default mongoose.model("Collection", collectionSchema);