import Pattern from "../Classes/Pattern.js";
import fileService from "./FileService.js";
import ApiError from "../exceptions/api-error.js";

class PatternService {
    async create(data, img) {
        const fileName = fileService.saveFile(img, 'pattern')
        const createdPattern = await Pattern.create({...data, img: fileName})
        return createdPattern
    }

    async getAll() {
        const patterns = await Pattern.find();
        return patterns
    }

    async getOne(id) {
        if (!id) {
            throw ApiError('Не указан ID')
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