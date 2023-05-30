import {Router} from "express";
import UserController from "../Controllers/UserController.js";
import PatternController from "../Controllers/PatternController.js";

import {body} from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";
import MemeController from "../Controllers/MemeController.js";

const index = new Router()

index.post('/register',
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('email').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min:3, max:32}),
    UserController.registration)
index.post('/login',
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('password').isLength({min:3, max:32}),
    UserController.login)
index.post('/logout', UserController.logout)
index.get('/refresh', UserController.refresh)
index.post('/patterns/:id/add',authMiddleware, UserController.addMeme)
index.get('/memes',authMiddleware, UserController.getAllMemes)
index.post('/users',authMiddleware, UserController.numberOfRegisteredUsers)
index.post('/patterns/add', PatternController.create)
index.post('/patterns/:id', authMiddleware, UserController.addLike)
index.get('/patterns', authMiddleware, UserController.getAllLikedPatterns)
index.get('/all_patterns',PatternController.getAll)
index.get('/all_memes', MemeController.getAll)

export default index;