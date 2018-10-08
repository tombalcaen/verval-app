const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//register
router.post('/register',(req,res,next)=>{
  let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
  });

  User.addUser(newUser, (err, user)=>{
    if(err){
        res.json({success: false, message: "failed to register user."})
    } else {
        res.json({success: true, message: "user registered"});
    }
  })
})

//authenticate
router.post('/authenticate',(req,res,next)=>{
    res.send("authenticate");
})

router.get('/',(req,res,next)=>{
    console.log(req.query.username)
    User.getUserByUsername(req.query.username,(user)=>{
        console.log('terug')
        console.log(user)
        res.json(user)
    })    
})

//profile
router.get('/profile',(req,res,next)=>{
    res.send("profile");
})

router.get('/find',(req,res,next)=>{
    console.log('ik zit in router find')
    User.getUserById(req.body.id)
})

module.exports = router;