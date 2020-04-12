const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/TaskApp11',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Conneted to DB')
}).catch(err=>console.log('can not connect DB'+err))