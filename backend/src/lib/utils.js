import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {
    // Function to generate a JWT token and set it as an HTTP-only cookie
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'7d'
    } )

    res.cookie('jwt', token, {
        maxAge:7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly:true, // prevents xss attacks creating a cookie from client side js
        sameSite: 'strict',// CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development', // Set secure flag in production
    });

    return token;
};