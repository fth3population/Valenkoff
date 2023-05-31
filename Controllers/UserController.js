import UserService from "../Services/UserService.js";
import ApiError from "../exceptions/api-error.js";
import {validationResult} from "express-validator";
import userService from "../Services/UserService.js";


class UserController{
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const{username, email, password} = req.body
            const user = await UserService.registration(username, email, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(user)
        }
        catch (e){
            next(e);
        }
    }

    async login(req, res,next){
        try {
            const{email, password} = req.body
            const user = await UserService.login(email, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(user)
        }catch (e){
            next(e);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        }catch (e) {
            next(e)
        }
    }

    async refresh(req, res,next){
        try {
            const {refreshToken} = req.cookies
            const user = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(user)
        }catch (e){
            next(e);
        }
    }

    async getAllMemes(req, res, next){
        try{
            const memes = await UserService.getAllMemes(req.user.id)
            return res.json(memes)
        }catch (e) {
            next(e)
        }
    }

    async addMeme(req, res, next){
        try{
            const user = await UserService.addMeme(req.params.id, req.user.id, req.files.img)
            return res.json(user)
        }catch (e){
            next(e)
        }
    }

    async numberOfRegisteredUsers(req, res, next){
        try{
            const {startDate, endDate} = req.body;
            const users = await UserService.numberOfRegisteredUsers(req.user.id, startDate, endDate)
            return res.json(users)
        }catch (e) {
            next(e)
        }
    }

    async getAllLikedPatterns(req, res, next){
        try{
            const patterns = await UserService.getAllLikedPatterns(req.user.id)
            return res.json(patterns)
        }catch (e) {
            next(e)
        }
    }

    async addLike(req, res, next){
        try{
            const user = await UserService.addLike(req.user.id, req.params.id)
            return res.json(user)
        }catch (e) {
            next(e)
        }
    }

    async create(req, res,next){
        try {
            const user = await UserService.create(req.body)
            res.status(200).json(user)
        }
        catch (e){
            next(e);
        }
    }

    async getAll(req, res,next){
        try {
            const users = await UserService.getAll()
            return res.json(users)
        }
        catch (e){
            next(e);
        }
    }

    async getOne(req, res,next){
        try {
            const user = await UserService.getOne(req.params.id)
            return res.json(user)
        }
        catch (e){
            next(e)
        }
    }

    async update(req, res,next){
        try {
            const updatedUser = await UserService.update(req.body)
            return res.json(updatedUser)
        }
        catch (e){
            next(e)
        }
    }

    async delete(req, res,next){
        try {
            const user = await UserService.delete(req.params.id)
            return res.json(user)
        }
        catch (e){
            next(e)
        }
    }
}


export default new UserController()