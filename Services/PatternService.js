import Pattern from "../Classes/Pattern.js";
import fileService from "./FileService.js";

class PatternService {
    async create(hashtag, img) {
        const fileName = fileService.saveFile(img)
        const createdPattern = await Pattern.create({...hashtag, img: fileName})
        return createdPattern
    }

    async getAll() {
        const patterns = await Pattern.find();
        return patterns
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const pattern = await Pattern.findById(id);
        return pattern
    }

    async update(pattern) {
        if (!pattern._id) {
            throw new Error('Не указан ID')
        }
        const updatedPattern = await Pattern.findByIdAndUpdate(pattern._id, pattern, {new: true})
        return updatedPattern
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const pattern = await Pattern.findByIdAndDelete(id)
        return pattern
    }
}

export default new PatternService();