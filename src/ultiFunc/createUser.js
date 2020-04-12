const User=require('../Model/userModel')
require('../../db/mongoose')

const createUser=(userInfo)=>{
    const user=new User({
        name:userInfo.name,
        username:userInfo.username,
        password:userInfo.password,
        email:userInfo.email
    })
   
    return user

}
module.exports=createUser