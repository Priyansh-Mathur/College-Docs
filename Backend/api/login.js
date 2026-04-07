const express = require('express');
const router = express.Router();
const User = require('../models/User'); // import the model
const bcrypt = require('bcrypt');// does encryption and decruption
const jwt = require('jsonwebtoken');//does making token only


// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found ❌' ,success:false});
    }

    // 2️⃣ Compare entered password with hashed one
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials ❌' ,success:false});
    }

    // 3️⃣ Generate JWT token (hardcoded secret for now)
    const token = jwt.sign(
      {id:user._id,email:user.email,year:user.year,branch:user.branch,scholar_id:user.scholar_id},
      'secretkey123', // use .env later
      { expiresIn: '1h' }
    );

    // 4️⃣ Send success response
    res.status(200).json({
      message: 'Login successful 🚀',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        branch:user.branch,
        year:user.year,
        scholar_id:user.scholar_id
      },
      success:true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error 💀' });
  }
});
// POST /api/signup
 router.post('/signup',async(req,res)=>{
    const {name,email,password,year,scholar_id,branch}=req.body;
    // we need to create user 
    // checking that user with this email exist already or not
   try{
    const user=await User.findOne({email});
    if(user){
        res.status(800).json({message:"user already exists",success:false})
    }
    // hashing the password
    const hashedPassword=await bcrypt.hash(password,10);

   const newUser=new User({
    name,
    email,
    password:hashedPassword,
    scholar_id,
    branch,
    year,
   });
   await newUser.save();

//    create token

   const token=jwt.sign(
    {id:newUser._id,email:newUser.email,year:newUser.year,branch:newUser.branch,scholar_id:newUser.scholar_id},
    'secretkey123',
    {expiresIn:'1h'}
   );

   return res.status(201).json({
    message:"sign up successful",
    token:token,
    user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        scholar_id:newUser.scholar_id,
        branch:newUser.branch,
        year:newUser.year
    },
    success:true
   })
   }
   catch{
   return  res.status(400).json({message:"SERVER IS DOWN "});
    
   }

 })



module.exports = router;
