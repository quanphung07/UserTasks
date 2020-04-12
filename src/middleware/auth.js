const jwt=require('jsonwebtoken')
const User=require('../Model/userModel')
const auth=async (req,res,next)=>{
    const token=req.header("Authorization").replace('Bearer ','')
    if(!token)
    {
        return res.send({error:"user isn't authorated"})
    }
    const decoded=await jwt.verify(token,'phungquan')
    const user=await User.findOne({_id:decoded.id,'tokens.token':token})
    if(!user)
    {
        return res.send({error:"user isn't authorated"})
    }
    
    req.user=user
    req.token=token
    next()

}
module.exports=auth