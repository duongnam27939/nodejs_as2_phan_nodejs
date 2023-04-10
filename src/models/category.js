import mongoose from "mongoose";

const categorySchame = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    products:[{type:mongoose.Types.ObjectId,ref:'Product'}],
},{timestamps:true,versionKey:false})

export default mongoose.model('Category',categorySchame)