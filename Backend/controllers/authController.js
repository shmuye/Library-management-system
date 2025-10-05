import User from "../models/User.js";
import { generateToken, generateRefreshToken, genSalt } from "../utils/index.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const {name, email, password, role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).send({message: "User already exists"});
        }
        const user = await User.create({name, email, password: hashedPassword, role})
        if (user) {
            const accessToken = await generateToken(user._id, user.role);
            const refreshToken = await generateRefreshToken(user._id, user.role);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken,
                refreshToken,
            });
        }else {
            res.status(400).json({message: "Invalid user data"});
        }
    }catch(err){
      res.status(500).json({message: err.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (user && (await user.matchPassword(password))) {
            const accessToken = await generateToken(user._id, user.role);
            const refreshToken = await generateRefreshToken(user._id, user.role);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken,
                refreshToken,

            });
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }


}

export const refresh = async (req, res) => {

        const { refreshToken } = req.body;
        if (!refreshToken) {
         return res.status(401).json({ message: "Refresh token required" });
        }
       try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Optional: verify that the user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate new access token
        const newAccessToken = generateToken(user._id, user.role);

        res.json({
            token: newAccessToken,
            refreshToken, // can also issue a new refresh token if you want rotation
        });
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
    }

export const logout = async (req, res) => {
    res.json({message: "logout successful"});
}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id)

        if(user && (await bcrypt.compare(oldPassword, user.password))){
            const salt = await genSalt();
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save()

            res.json({message: "Password updated successfully"});
        }else  {
            res.status(401).json({message: "Invalid old password"});
        }
    }catch(err){
       res.status(500).json({message: err.message});
    }
}