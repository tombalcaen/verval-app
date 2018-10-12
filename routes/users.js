const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')


router.get('/',(req,res,next)=>{     
    User.getUserByUsername(req.query.username,(err,user)=>{
        console.log(err)
        console.log(user)
        if(err) res.json({success: false, message: "user not found!"})
        else { 
            res.json(user)
        } 
    })    
})

//register
router.post('/register',(req,res,next)=>{
  let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
  });

  console.log(newUser)

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
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if(err) throw(err);
        if(!user){
            return res.json({success: false, message: "user not found!"})
        }
        
        User.comparePassword(password,user.password,(err,isMatch)=>{
          if(err) throw(err);
          if(isMatch){              
            const token = jwt.sign(user.toJSON(),config.secret,{expiresIn: 804600})            
            res.json({
                success: true, 
                token: 'JWT ' +token, 
                user:{
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                    }
            })
          } else {
            return res.json({success: false, message: "user not found!"})
          }
        })
    })
})

//profile
router.get('/profile', passport.authenticate('jwt',{session:false}),(req,res,next)=>{    
    console.log('ik zit in router profile')
    res.json({user: req.user});
})

router.get('/find',(req,res,next)=>{
    console.log('ik zit in router find')
    User.getUserById(req.body.id)
})

module.exports = router;