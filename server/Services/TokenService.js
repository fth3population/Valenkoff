import jwt from 'jsonwebtoken'
import Token from "../Classes/Token.js";
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
        return{
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }catch (e) {
            return null
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({user: userId, refreshToken: refreshToken})
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await Token.deleteOne({refreshToken: refreshToken})
        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = await Token.findOne({refreshToken: refreshToken})
        return tokenData;
    }
}

export default new TokenService();