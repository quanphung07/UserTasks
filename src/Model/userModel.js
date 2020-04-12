const mongoose=require('mongoose')
const valid=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
       
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate:function(value){
            if(value.includes(" ")){
                throw new Error('no space in username')
            }
        },
        minlength:6
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate:function(value){
            if(value.includes(" ")){
                throw new Error('Password is invalid')
            }
        },
        minlength:6
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate:function(value)
        {
            if(!valid.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
    
    
})

userSchema.methods.generateToken=async function () {
    const user=this

    const token=await jwt.sign({id:user._id.toString()},'phungquan')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

    
}
userSchema.statics.infoValidate=async function (username,password){
    const user=await User.findOne({username})
    if(!user)
    {
        return new Error("Can't get user's info")
    }
    const isPasswordTrue=await bcrypt.compare(password,user.password)
    if(!isPasswordTrue)
    {
        return new Error("Password invalid")
    }
    return user

}
userSchema.pre('save',async function (next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8)
         await user
         next()
    }
    
})
userSchema.virtual('jobs',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
const User=mongoose.model('User',userSchema)

module.exports=User