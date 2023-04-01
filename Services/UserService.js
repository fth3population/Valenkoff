import User from "../Classes/User.js";

class UserService {
    async create(user) {
        const createdUser = await User.create(user)
        return createdUser
    }

    async getAll() {
        const users = await User.find();
        return users
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const user = await User.findById(id);
        return user
    }

    async update(user) {
        if (!user._id) {
            throw new Error('Не указан ID')
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true})
        return updatedUser
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const user = await User.findByIdAndDelete(id)
        return user
    }
}

export default new UserService();