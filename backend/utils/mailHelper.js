import transporter from "../config/transporter.config.js";
import config from "../config/index.js";

const mailHelper = async (options) => {
    const message = {
        from: config.SMTP_MAIL_EMAIL,
        to: options.email, // array of emails
        subject: options.subject, 
        html: options.html, // or use text for plain emails
        // text: options.text,
    }

    await transporter.sendMail(message);
}

export default mailHelper;