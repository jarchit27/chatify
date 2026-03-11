import jwt from 'jsonwebtoken';
import { ENV } from './env';

export const generateToken = (userId,res) => {

    const {JWT_SECRET} = ENV;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign({userId }, JWT_SECRET, { 
        expiresIn: '7d' 
    });
    res.cookie('jwt', token, {
        httpOnly: true,  // prevents xss attacks: cross site scripting
        secure: ENV.NODE_ENV === 'development' ? false : true, // set to true in production
        sameSite: 'Strict', // CSRF attack prevention
        maxAge: 7 * 24 * 60 * 60 * 1000 // in milliseconds
    });
    
    return token;
}