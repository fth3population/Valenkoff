import jwt from 'jsonwebtoken'
import Token from "../Classes/Token.js";
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30d"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30m"})
        return{
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken, accessToken){
        const tokenData = await Token.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            tokenData.accessToken = accessToken
            return tokenData.save();
        }
        const token = await Token.create({user: userId, refreshToken: refreshToken, accessToken: accessToken})
        return token;
    }
}

export default new TokenService();