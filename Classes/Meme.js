import mongoose from "mongoose";

const Meme = new mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId,required:true, ref: 'users'},
    pattern_id: {type:mongoose.Schema.Types.ObjectId,required:true, ref: 'patterns'},
    creatingDate: {type:Date, default: Date.now()},
    userLikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});

export default mongoose.model('Meme', Meme)