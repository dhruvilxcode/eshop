import dotenv from "dotenv";

dotenv.config();

const config = {
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 3000,
    SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    SMTP_MAIL_EMAIL: process.env.SMTP_MAIL_EMAIL,

    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ENDPOINT: process.env.ENDPOINT,

    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,

    STRIPE_SECRET: process.env.STRIPE_SECRET,
    CURRENCY: process.env.CURRENCY || "inr",

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default config;