import Admin from "../Classes/Admin.js";

class AdminController{
    async create(req, res){
        try {
            const {login, email, password} = req.body
            const admin = await Admin.create({login, email, password})
            res.status(200).json(admin)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const admins = await Admin.find();
            return res.json(admins)
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
            const admin = await Admin.findById(id);
            return res.json(admin)
        }
        catch (e){
            res.status(500).json(e)
        }
    }

    async update(req, res){
        try {
            const admin = req.body
            if(!admin._id){
                res.status(400).json("Id не указан")
            }
            const updatedAdmin = await  Admin.findByIdAndUpdate(admin._id, admin, {new: true})
            return res.json(updatedAdmin)
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
            const admin = await Admin.findByIdAndDelete(id)
            return res.json(admin)
        }
        catch (e){
            res.status(500).json(e)
        }
    }
}


export default new AdminController()