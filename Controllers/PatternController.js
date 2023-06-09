import PatternService from "../Services/PatternService.js";
import UserService from "../Services/UserService.js";

class PatternController{
    async create(req, res, next){
        try {
            const pattern = await PatternService.create(req.body, req.files.img)
            return res.json(pattern)
        }
        catch (e){
            next(e)
        }
    }

    async getAll(req, res){
        try {
            const patterns = await PatternService.getAll()
            return res.json(patterns)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res,next){
        try {
            const pattern = await PatternService.getOne(req.params.id)
            return res.json(pattern)
        }
        catch (e){
            next(e)
        }
    }

    async update(req, res){
        try {
            const updatedPattern = await  PatternService.update(req.body)
            return res.json(updatedPattern)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const pattern = await PatternService.delete(req.params.id)
            return res.json(pattern)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }
}


export default new PatternController()