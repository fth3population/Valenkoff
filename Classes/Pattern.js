import mongoose from "mongoose";

const Pattern = new mongoose.Schema({
    hashtag: [{type:String}],
    img: {type:String, required:true},
});

export default mongoose.model('Pattern', Pattern)