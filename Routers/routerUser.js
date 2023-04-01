import {Router} from "express";
import UserController from "../Controllers/UserController.js";

const routerUser = new Router()

routerUser.post('/users', UserController.create)
routerUser.get('/users', UserController.getAll)
routerUser.get('/users/:id',UserController.getOne)
routerUser.put('/users',UserController.update)
routerUser.delete('/users/:id', UserController.delete)

export default routerUser;