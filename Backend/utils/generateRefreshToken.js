import jwt from 'jsonwebtoken';
const generateRefreshToken = async (id, role) => {
    jwt.sign(
        {id, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_SECRET,
        }

    )
}

export default generateRefreshToken;