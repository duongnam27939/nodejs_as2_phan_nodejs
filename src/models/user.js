import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default:"member",
    }
})

export default mongoose.model("User",userSchame)