const mongoose=require('mongoose')
const documentSchema=new mongoose.Schema({
    userId:{
        require:true,
        
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    branch:{
        require:true,
        type:String,
        enum:['CSE','ECE','EE','IT','CIVIL']//enum means
        // that i m restricting its default value as these in array none other
        // than this 

    },
    year:{
        require:true,
        type:Number
    },
    fileId:{
        require:true,
        type:mongoose.Schema.Types.ObjectId
    },
    fileName:{
        type:String,
        required:true
    },
     filePath:{
        type:String,
        required:true
    },
    fileType:{
        type:String
    },
    fileSize:{
        type:Number
    },
    uploadAt:{
        type:Date,
        default:Date.now
    },
})
module.exports=mongoose.model('Document',documentSchema)