import Meme from "../Classes/Meme.js";

class MemeController{
    async create(req, res){
        try {
            const {author, pattern_id, userLikes} = req.body
            const meme = await Meme.create({author, pattern_id, userLikes})
            res.status(200).json(meme)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const memes = await Meme.find();
            return res.json(memes)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async getOne(req, res){
        try {
            const {id} = req.params
            if(!id){
                res.status(400).json("Id не указан")
            }
            const meme = await Meme.findById(id);
            return res.json(meme)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async update(req, res){
        try {
            const meme = req.body
            if(!meme._id){
                res.status(400).json("Id не указан")
            }
            const updatedMeme = await  Meme.findByIdAndUpdate(meme._id, meme, {new: true})
            return res.json(updatedMeme)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async delete(req, res){
        try {
            const {id} = req.params
            if(!id){
                res.status(400).json("Id не указан")
            }
            const meme = await Meme.findByIdAndDelete(id)
            return res.json(meme)
        }
        catch (e){
            res.status(500).json(e)
        }
    }
}


export default new MemeController()