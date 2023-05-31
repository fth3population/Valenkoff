import MemeService from "../Services/MemeService.js";

class MemeController{
    async create(req, res, next){
        try {
            const meme = await MemeService.create(req.body, req.files.img)
            res.status(200).json(meme)
        }
        catch (e){
            next(e)
        }
    }

    async getAll(req, res){
        try {
            const memes = await MemeService.getAll()
            return res.json(memes)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }


    async getOne(req, res){
        try {
            const meme = await MemeService.getOne(req.params.id)
            return res.json(meme)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async update(req, res){
        try {
            const updatedMeme = await MemeService.update(req.body)
            return res.json(updatedMeme)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const meme = await MemeService.delete(req.params.id)
            return res.json(meme)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }
}


export default new MemeController()