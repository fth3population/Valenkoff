import {Router} from "express";
import PatternController from "../Controllers/PatternController.js";

const routerPattern = new Router()

routerPattern.post('/patterns', PatternController.create)
routerPattern.get('/patterns', PatternController.getAll)
routerPattern.get('/patterns/:id',PatternController.getOne)
routerPattern.put('/patterns',PatternController.update)
routerPattern.delete('/patterns/:id', PatternController.delete)

export default routerPattern;