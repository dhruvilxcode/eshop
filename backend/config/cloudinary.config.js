import config from "./index.js";
import { v2 } from "cloudinary";

const cloudinary = v2;

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

export default cloudinary;