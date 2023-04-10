import {Router} from "express";
import UserController from "../Controllers/UserController.js";

const routerUser = new Router()

routerUser.post('/registration', UserController.registration)
routerUser.post('/login', UserController.login)
routerUser.get('/get', UserController.getAll)
routerUser.get('/get/:id',UserController.getOne)
routerUser.put('/update',UserController.update)
routerUser.delete('/delete/:id', UserController.delete)

export default routerUser;