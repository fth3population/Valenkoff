import Pattern from "../Classes/Pattern.js";

class PatternController{
    async create(req, res){
        try {
            const {hashtag, img} = req.body
            const pattern = await Pattern.create({hashtag, img})
            res.status(200).json(pattern)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const patterns = await Pattern.find();
            return res.json(patterns)
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
            const pattern = await Pattern.findById(id);
            return res.json(pattern)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async update(req, res){
        try {
            const pattern = req.body
            if(!pattern._id){
                res.status(400).json("Id не указан")
            }
            const updatedPattern = await  Pattern.findByIdAndUpdate(pattern._id, pattern, {new: true})
            return res.json(updatedPattern)
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
            const pattern = await Pattern.findByIdAndDelete(id)
            return res.json(pattern)
        }
        catch (e){
            res.status(500).json(e)
        }
    }
}


export default new PatternController()