const express=require('express');
require('dotenv').config();
const mongoDB=require('./config/db')
const cors=require('cors')
const app=express();
const PORT=process.env.PORT || 5000;

const allowedOrigins = [
    'https://peppy-naiad-93c25a.netlify.app',
    'http://localhost:3000'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));//middlewares
app.use(express.json());//midleware

app.get('/',(req,res)=>{
    res.send("Hello baby");

})
mongoDB().catch((err) => {
    console.error('Mongo init failed:', err.message);
});

app.use('/api',require('./api/login.js'))
app.use('/api',require('./api/myinfo.js'))
app.use('/api',require('./api/upload.js'))
app.use('/api',require('./api/download.js'))
app.use('/api',require('./api/mydocs.js'))

if (require.main === module) {
    app.listen(PORT,()=>{
        console.log("server started")
    });
}

module.exports = app;