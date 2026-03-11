import 'dotenv/config.js';

export const ENV = {
    PORT : process.env.PORT,
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    CLIENT_URL : process.env.CLIENT_URL,
    Resend_API_KEY : process.env.Resend_API_KEY,
    EMAIL_FROM : process.env.EMAIL_FROM,
    EMAIL_FROM_NAME : process.env.EMAIL_FROM_NAME
}