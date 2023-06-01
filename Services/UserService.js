import User from "../Classes/User.js";
import bcrypt from 'bcrypt'
import TokenService from "./TokenService.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import MemeService from "./MemeService.js";
import Meme from "../Classes/Meme.js";
import Pattern from "../Classes/Pattern.js";
import fileService from "./FileService.js";
import mongoose from "mongoose";

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
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, userDto}
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
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, userDto}
    }

    async logout(refreshToken){
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnathorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if(!userData||!tokenFromDb){
            throw ApiError.UnathorizedError()
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, userDto}
    }

    async addMeme(pattern_id, user_id, img){
        if(!img){
            throw ApiError.BadRequest('Нет картинки')
        }
        if(!pattern_id){
            throw ApiError.BadRequest('Не указан ID шаблона')
        }
        const user = await User.findById(user_id)
        const meme = await MemeService.create(user._id, pattern_id, img)
        const pattern = await Pattern.findById(pattern_id)
        pattern.numberOfUses++
        user.memes.push(meme._id)
        await user.save()
        await pattern.save()
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
        const admin = await User.findById(id)
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

    async addLike(user_id, pattern_id){
        if(!pattern_id){
            throw ApiError.BadRequest('Не указан ID шаблона')
        }
        const user = await User.findById(user_id)
        const pattern = await Pattern.findById(pattern_id)
        if(!pattern){
            throw ApiError.BadRequest("Шаблон не найден")
        }

        user.likes.push(pattern_id)
        pattern.userLikes.push(user._id)
        await user.save()
        await pattern.save()
        return {user, pattern}
    }

    async deleteLike(user_id, pattern_id){
        if(!pattern_id){
            throw ApiError.BadRequest('Не указан ID шаблона')
        }
        const updatedUser = await User.updateOne(
            {_id:user_id},
            {$pull: {likes: pattern_id}},
            )
        const updatedPattern = await Pattern.updateOne(
            {_id: pattern_id},
            {$pull: {userLikes: user_id}}
        )
        return {updatedUser, updatedPattern}
    }

    async getAllLikedPatterns(id){
        const user = await User.findById(id)
        const patterns = await Pattern.find({
            _id:{$in: user.likes}
        });
        return patterns
    }

    async getSortedPatternsByUses(id){
        const admin = await User.findById(id)
        if(admin.role != "ADMIN"){
            throw ApiError.BadRequest('У вас нет прав администратора')
        }
        const patterns = await Pattern.find().sort({numberOfUses:-1})
        return patterns
    }

    async getSortedPatternsByLikes(id){
        const admin = await User.findById(id)
        if(admin.role != "ADMIN"){
            throw ApiError.BadRequest('У вас нет прав администратора')
        }
        const patterns = await Pattern.aggregate([
            {$addFields:{likes_count: {$size:"$userLikes"}}},
            {$sort: {"likes_count": -1}}
        ])
        return patterns
    }

    async getUserRole(id){
        const user = await User.findById(id)
        if(!user){
            throw ApiError('Такого пользователя не существует')
        }
        return user.role
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