import UserService from "../Services/UserService.js";
import ApiError from "../exceptions/api-error.js";
import {validationResult} from "express-validator";


class UserController{
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const{username, email, password} = req.body
            const user = await UserService.registration(username, email, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 60 * 1000, httpOnly: true})
            return res.json(user)
        }
        catch (e){
            next(e);
        }
    }

    async login(req, res,next){
        try {
            const{username, password} = req.body
            const user = await UserService.login(username, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 60 * 1000, httpOnly: true})
            return res.json(user)
        }catch (e){
            next(e);
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

    async refresh(req, res,next){
        try {

        }catch (e){
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