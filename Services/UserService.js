import User from "../Classes/User.js";
import bcrypt from 'bcrypt'
import TokenService from "./TokenService.js";
import tokenService from "./TokenService.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

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
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(username, password){
        const user = await User.findOne({username: username})
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