const express=require('express')
const router=express.Router();
const Document=require('../models/Document')
router.get(`/mydocs`,async(req,res)=>{
    const {year,branch}=req.query;
    try{
    //    we now will create the filter
    const filter={}
    if(year)filter.year=Number(year);//year can be stored as string in db
    if(branch)filter.branch=branch;
    const docs=await Document.find(filter)
    res.status(200).json(docs);



    }
    catch(e){
         console.error('Error fetching documents:', e);
        res.status(400).json({"message":"Server Error"});
    }
})

module.exports=router;