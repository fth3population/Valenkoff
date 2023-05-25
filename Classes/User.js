import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    likes: [{type:mongoose.Schema.Types.ObjectId, ref: 'Pattern', required:false}],
    memes: [{type:mongoose.Schema.Types.ObjectId, ref: 'Meme', required:false}],
    registerDate: {type:Date, default: Date.now()},
    role: {type: String, default: "USER"}
});

export default mongoose.model('User', User)