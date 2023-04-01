import {Router} from "express";
import MemeController from "../Controllers/MemeController.js";

const routerMeme = new Router()

routerMeme.post('/memes', MemeController.create)
routerMeme.get('/memes', MemeController.getAll)
routerMeme.get('/memes/:id',MemeController.getOne)
routerMeme.put('/memes',MemeController.update)
routerMeme.delete('/memes/:id', MemeController.delete)

export default routerMeme;