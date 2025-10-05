import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
    return  jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
};

export default generateToken;
