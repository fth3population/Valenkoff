import UserService from "../Services/UserService.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../Classes/User.js";

const Secret_Key = '123'

const generateJwt = (id, email) => {
    return jwt.sign(
        {id: id, email: email},
        "444",
        {expiresIn: "30s"}
    )
}

class UserController{
    async registration(req, res){
        try {
            const {username, email, password, likes} = req.body;
            if(!username||!email||!password){throw new Error("Не указаны данные")}
            const candidate = await User.findOne({email: email})
            if(candidate){throw new Error("Пользователь с такими данными уже зарегистрирован")}
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await UserService.create(username, email, hashPassword,likes)
            const token = generateJwt(user.id, user.email)
            return res.json(token)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async login(req, res){
        try {
            const{email, password} = req.body
            const user = await User.findOne({email: email})
            if(!user){
                throw new Error("Пользователь не найден")
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword){
                throw new Error("Неправильный пароль")
            }
            const token = generateJwt(user.id, user.email)
            return res.json(token)
        }catch (e){
            res.status(500).json(e.message)
        }
    }

    async create(req, res){
        try {
            const user = await UserService.create(req.body)
            res.status(200).json(user)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res){
        try {
            const users = await UserService.getAll()
            return res.json(users)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res){
        try {
            const user = await UserService.getOne(req.params.id)
            return res.json(user)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async update(req, res){
        try {
            const updatedUser = await UserService.update(req.body)
            return res.json(updatedUser)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const user = await UserService.delete(req.params.id)
            return res.json(user)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }
}


export default new UserController()