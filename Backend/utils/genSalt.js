import bcrypt from "bcrypt";

const generateSalt =  () => {
    const rounds = 10
    return bcrypt.genSalt(rounds)
}

export default generateSalt

