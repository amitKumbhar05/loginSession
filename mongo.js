import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/Login')
.then(()=>{
    console.log('Mongodb Connected');
}).catch((error)=>{
    console.log('connection error',error);
})


const userDataSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const userData = mongoose.model('users',userDataSchema);