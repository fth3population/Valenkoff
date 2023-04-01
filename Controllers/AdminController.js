import AdminService from "../Services/AdminService.js";

class AdminController{
    async create(req, res){
        try {
            const admin = await AdminService.create(req.body)
            res.status(200).json(admin)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res){
        try {
            const admins = await AdminService.getAll()
            return res.json(admins)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res){
        try {
            const admin = await AdminService.getOne(req.params.id)
            return res.json(admin)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async update(req, res){
        try {
            const updatedAdmin = await AdminService.update(req.body)
            return res.json(updatedAdmin)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const admin = await AdminService.delete(req.params.id)
            return res.json(admin)
        }
        catch (e){
            res.status(500).json(e.message)
        }
    }
}


export default new AdminController()