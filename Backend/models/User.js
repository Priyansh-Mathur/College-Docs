const mongoose=require('mongoose')
// this is a schema format to store the user in db
const userSchema=new mongoose.Schema({
    name:String,

    email:{type:String,required:true,unique :true},
    password:{type:String,required:true},
    scholar_id:{type:Number,required:true,unique:true},
    branch:{type:String},
    year:{type:Number}
})

module.exports=mongoose.model('User',userSchema);