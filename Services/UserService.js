import User from "../Classes/User.js";
import bcrypt from 'bcrypt'
import TokenService from "./TokenService.js";
import tokenService from "./TokenService.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import MemeService from "./MemeService.js";
import Meme from "../Classes/Meme.js";
import Pattern from "../Classes/Pattern.js";
import Token from "../Classes/Token.js";

class UserService {

    async registration(username, email, password) {
        const candidate = await User.findOne({email: email})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({username: username, email: email, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken, tokens.accessToken)

        return {...tokens, user: userDto}
    }

    async login(email, password){
        const user = await User.findOne({email: email})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if(!isPasswordEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async addMeme(pattern_id, accessToken){
        if (!accessToken) {
            throw ApiError.BadRequest('Не указан токен')
        }
        if(!pattern_id){
            throw ApiError.BadRequest('Не указан ID шаблона')
        }
        const token = await Token.findOne({
            accessToken: accessToken
        })
        if(!token){
            throw ApiError.BadRequest("Пользователь с таким токеном не найден")
        }
        const user = await User.findById(token.user)
        const meme = await MemeService.create(user._id, pattern_id)

        user.memes.push(meme._id)
        await user.save()
        return {user: user, meme:meme}
    }

    async getAllMemes(id){
        if (!id) {
            throw ApiError.BadRequest('Не указан ID')
        }
        const user = await User.findById(id);
        const memes = await Meme.find({
            _id:{$in: user.memes}
        });
        return memes
    }

    async numberOfRegisteredUsers(id, startDate, endDate){
        if (!id) {
            throw ApiError.BadRequest('Не указан ID')
        }
        const admin = await User.findById(id)
        if(!admin){
            throw ApiError.BadRequest('Пользователя с таким ID не существует')
        }
        if(admin.role != "ADMIN"){
            throw ApiError.BadRequest('У вас нет прав администратора')
        }
        const users = await User.find({
            registerDate:{
                $gte: new Date(startDate).toISOString(),
                $lte: new Date(endDate).toISOString()
            }
        })
        return users
    }

    async addLike(accessToken, pattern_id){
        if (!accessToken) {
            throw ApiError.BadRequest('Не указан токен')
        }
        if(!pattern_id){
            throw ApiError.BadRequest('Не указан ID шаблона')
        }
        const token = await Token.findOne({
            accessToken: accessToken
        })
        if(!token){
            throw ApiError.BadRequest("Пользователь с таким токеном не найден")
        }
        const user = await User.findById(token.user)
        const pattern = await Pattern.findById(pattern_id)
        if(!pattern){
            throw ApiError.BadRequest("Шаблон не найден")
        }

        user.likes.push(pattern_id)
        pattern.userLikes.push(user._id)
        pattern.numberOfUses++
        await user.save()
        await pattern.save()
        return {user, pattern}
    }

    async getAllLikedPatterns(id){
        if (!id) {
            throw ApiError.BadRequest('Не указан ID')
        }
        const user = await User.findById(id)
        const patterns = await Pattern.find({
            _id:{$in: user.likes}
        });
        return patterns
    }



    async create(username, email, password, likes) {
        const createdUser = await User.create({username: username, email: email, password: password, likes: likes})
        return createdUser
    }

    async getAll() {
        const users = await User.find();
        return users
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const user = await User.findById(id);
        return user
    }

    async update(user) {
        if (!user._id) {
            throw new Error('Не указан ID')
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true})
        return updatedUser
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const user = await User.findByIdAndDelete(id)
        return user
    }
}

export default new UserService();