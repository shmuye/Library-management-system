import User from "../models/User.js";
import generateTokens from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const {name, email, password, role} = req.body

    try{
        const userExists = await User.findOne({email});
        if (!userExists) {
            return res.status(400).send({message: "User already exists"});
        }
        const user = await User.create({name, email, password, role})
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateTokens(user._id, user.role)
            });
        }else {
            res.status(400).json({message: "Invalid user data"});
        }
    }catch(err){
      res.status(500).json({message: err.message});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({email})
        if(user && await user.matchPassword(password)) {
           res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               role : user.role,
               token: generateTokens(user._id, user.role)

              });
        }else {
            res.status(401).json({message: "Invalid email or password"});
        }
    }catch(err){
      res.status(500).json({message: err.message});
    }

}

export const logout = async (req, res) => {
    res.json({message: "logout successful"});
}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id)

        if(user && (await bcrypt.compare(oldPassword, newPassword))){
            const salt = await bcrypt.genSalt(10);
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