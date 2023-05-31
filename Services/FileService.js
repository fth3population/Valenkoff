import * as uuid from 'uuid';
import * as path from 'path';

class FileService{
    saveFile(file, key, next){
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(key == 'meme'? 'static/memes':'static/patterns', fileName);
            file.mv(filePath);
            return fileName;
        }
        catch (e){
            next(e)
        }
    }
}

export default new FileService()