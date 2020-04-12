const router=require('express').Router()
const createUser=require('../ultiFunc/createUser')
require('../../db/mongoose')
const User=require('../Model/userModel')
const auth=require('../middleware/auth.js')

router.post('/users',async (req,res)=>{
    try
    {
    const userInfo=req.body
    const user =createUser(userInfo)
    await user.save()
    console.log(user)
    res.send({success:'ok'})
    }catch(e)
    {
        res.send({error:e.message})
    }
})
router.post('/users/login',async (req,res)=>{
   try
    {
        const username=req.body.username
        const password=req.body.password
        let user=new User()
         user=await User.infoValidate(username,password)
         const token=await user.generateToken()
        await user.save()
        res.status(200).send({user,token})
    }
    catch(e)
    {
        res.send({error:e.message})
        console.log(e)
    }

   
})
router.get('/users/me',auth,async (req,res)=>{
   res.send(req.user)
})
router.patch('/users/me/update',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const validProperty=['name','username','password','email']
    const isValid=updates.every(update=>validProperty.includes(update))
    if(!isValid)
    {
        return res.send({error:'some property went of of property'})
    }
    try{
    updates.forEach(update=>req.user[update]=req.body[update])
    await req.user.save()
    res.send({success:'Update successful'})
   }catch(e)
   {
       res.send({error:'Update error'})
   }
})
router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter(token=>req.token!==token.token)
    await req.user.save()
    res.send({success:'ok'})
    }
    catch(e)
    {
        res.send({error:'error'})
    }
})
router.post('/users/logoutAll',auth,async (req,res)=>{
    try
    {
        req.user.tokens=[]
        await req.user.save()
    }
    catch(e)
    {
        res.send({error:'error'})
    }
})
router.delete('/users/remove',auth,async (req,res)=>{
    try{
        await req.user.remove()
    res.send({remove:'success'})
    }catch(e){
        res.send({error:'error'})
    }
})


module.exports=router