import Meme from "../Classes/Meme.js";
import fileService from "./FileService.js";

class MemeService {
    async create(author, pattern_id, img) {
        const fileName = fileService.saveFile(img)
        const createdMeme = await Meme.create({author: author, pattern_id: pattern_id, img: fileName})
        return createdMeme
    }

    async getAll() {
        const memes = await Meme.find();
        return memes
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const meme = await Meme.findById(id);
        return meme
    }

    async update(meme) {
        if (!meme._id) {
            throw new Error('Не указан ID')
        }
        const updatedMeme = await Meme.findByIdAndUpdate(meme._id, meme, {new: true})
        return updatedMeme
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const meme = await Meme.findByIdAndDelete(id)
        return meme
    }
}

export default new MemeService();