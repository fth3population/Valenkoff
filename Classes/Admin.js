import mongoose from "mongoose";

const Admin = new mongoose.Schema({
    login: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
});

export default mongoose.model('Admin', Admin)