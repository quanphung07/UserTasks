const mongoose=require('mongoose')
const User=require('../Model/userModel')
const auth=require('../middleware/auth')
const jonScheme=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true

    },
    completed:{
        type:Boolean,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

    }
})
module.exports=mongoose.model('Task',jonScheme)