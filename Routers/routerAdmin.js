import {Router} from "express";
import AdminController from "../Controllers/AdminController.js";

const routerAdmin = new Router()

routerAdmin.post('/admins', AdminController.create)
routerAdmin.get('/admins', AdminController.getAll)
routerAdmin.get('/admins/:id',AdminController.getOne)
routerAdmin.put('/admins',AdminController.update)
routerAdmin.delete('/admins/:id', AdminController.delete)

export default routerAdmin;