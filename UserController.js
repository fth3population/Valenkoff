import User from "./User.js";

class UserController{
    async create(req, res){
        try {
            const {username, email, password, likes} = req.body
            const user = await User.create({username, email, password, likes})
            res.status(200).json(user)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const users = await User.find();
            return res.json(users)
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
            const user = await User.findById(id);
            return res.json(user)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async update(req, res){
        try {
            const user = req.body
            if(!user._id){
                res.status(400).json("Id не указан")
            }
            const updatedUser = await  User.findByIdAndUpdate(user._id, user, {new: true})
            return res.json(updatedUser)
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
            const user = await User.findByIdAndDelete(id)
            return res.json(user)
        }
        catch (e){
            res.status(500).json(e)
        }
    }
}


export default new UserController()