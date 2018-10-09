const express = require('express');
const router = express.Router();
const Inventory = require("../models/inventory");

router.get('/',(req,res,next)=>{    
    Inventory.getInventory((err, items)=>{
        console.log(items)
    if(err){
        res.json({success: false, message: "failed to register user."})
      } else {
          res.json(items);
      }
    })
})

router.get('/inventory',(req,res,next)=>{    
    Inventory.getInventory((err, items)=>{
    console.log(items)
    if(err){
        res.json({success: false, message: "failed to register user."})
      } else {
          res.json(items);
      }
    })
})

module.exports = router;