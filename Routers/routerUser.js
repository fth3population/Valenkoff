import {Router} from "express";
import UserController from "../Controllers/UserController.js";

const routerUser = new Router()

import {body} from "express-validator";

routerUser.post('/registration',
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('email').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min:3, max:32}),
    UserController.registration)
routerUser.post('/login',
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('password').isLength({min:3, max:32}),
    UserController.login)
routerUser.get('/users', UserController.getAll)
routerUser.get('/users/:id',UserController.getOne)
routerUser.get('/refresh')
routerUser.put('/update',UserController.update)
routerUser.delete('/delete/:id', UserController.delete)

export default routerUser;