import PatternService from "../Services/PatternService.js";

class PatternController{
    async create(req, res){
        try {
            const pattern = await PatternService.create(req.body, req.files.img)
            res.status(200).json(pattern)
        }
        catch (e){
            res.status(500).json(e.message)
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

    async getOne(req, res){
        try {
            const pattern = await PatternService.getOne(req.params.id)
            return res.json(pattern)
        }
        catch (e){
            res.status(500).json(e.message)
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