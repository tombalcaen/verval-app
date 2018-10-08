const express = require('express');
const router = express.Router();
const Inventory = require("../models/inventory");

router.get('/inventory',(req,res,next)=>{
    res.json("inside inventory")
    Inventory.getInventory((err, items)=>{
    if(err){
        res.json({success: false, message: "failed to register user."})
      } else {
          res.json(items);
      }
    })
})

module.exports = router;