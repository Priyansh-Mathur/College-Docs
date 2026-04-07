const express=require('express');
const mongoDB=require('./config/db')
const cors=require('cors')
const app=express();
const PORT=5000;

app.use(cors());//middlewares
app.use(express.json());//midleware

app.get('/',(req,res)=>{
    res.send("Hello baby");

})
mongoDB();//db connection establish

app.use('/api',require('./api/login.js'))
app.use('/api',require('./api/myinfo.js'))
app.use('/api',require('./api/upload.js'))
app.use('/api',require('./api/download.js'))
app.use('/api',require('./api/mydocs.js'))

app.listen(PORT,()=>{
    console.log("server started")
});