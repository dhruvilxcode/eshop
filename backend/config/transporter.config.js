import nodemailer from "nodemailer";
import config from "./index";

const transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_EMAIL,
    port: config.SMTP_MAIL_PORT,
    secure: false, // use true, for https emails and 465 port
    auth: {
        user: config.SMTP_MAIL_USERNAME,
        pass: config.SMTP_MAIL_PASSWORD,
    },
})

export default transporter;