import mongoose from "mongoose";

const Pattern = new mongoose.Schema({
    name: {type: String, default: "Unnamed"},
    hashtag: [{type:String, required: false}],
    img: {type:String, required:true},
    numberOfUses: {type: Number, default:0},
    userLikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}]
});

export default mongoose.model('Pattern', Pattern)