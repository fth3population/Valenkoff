import mongoose from "mongoose";

const Meme = new mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId,required:true, ref: 'User'},
    pattern_id: {type:mongoose.Schema.Types.ObjectId,required:true, ref: 'Pattern'},
    creatingDate: {type:Date, default: Date.now()}
});

export default mongoose.model('Meme', Meme)