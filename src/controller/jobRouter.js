const router=require('express').Router()
const Task=require('../Model/jobModel')
const User=require('../Model/userModel')
const auth=require('../middleware/auth')

router.post('/users/jobs',auth,async (req,res)=>{
    const task=new Task({
        description:req.body.description,
        completed:req.body.completed,
        owner:req.user.id
    })
    await task.save()
    res.send(task)
})
router.get('/users/alljobs',auth,async (req,res)=>{
    await req.user.populate('jobs').execPopulate()
    res.send(req.user.jobs)
})
router.get('/users/jobs/:id',auth,async (req,res)=>{
    try{
        const jobId=req.params.id
    const task=await Task.findById(jobId)
    if(!task)
    {
        return res.send({error:'not found'})
    }
    res.send({task,name:req.user.name})

    }catch(e){
        res.send({error:'error'})
    }
})
router.delete('/users/jobs/delete/:id',auth,async (req,res)=>{
    const jobId=req.params.id
    const task=await Task.findByIdAndDelete(jobId)
    if(!task)
    {
       return res.send({error:'error'})
    }
    res.send({success:'ok'})
  
})
module.exports=router
