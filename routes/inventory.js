const express = require('express');
const router = express.Router();
const Inventory = require("../models/inventory");

router.get('/',(req,res,next)=>{    
    Inventory.getInventory(req.query.uid,(err, items)=>{        
    if(err){
        res.json({success: false, message: "failed to register user."})
      } else {
          res.json(items);
      }
    })
})

router.post('/',(req,res,next)=>{       
    let newItem = new Inventory({
        uid: req.body.uid,
        listId: req.body.listId,
        name: req.body.name,
        amount: req.body.amount,
        expiration_date: req.body.expiration_date
    });

    Inventory.addItem(newItem, (err, Item)=>{
        if(err){
            res.json({success: false, message: "Failed to add new item."})
        } else {
            res.json({success: true, message: "Item added!"});
        }
      });
})

router.delete('/',(req,res,next)=>{    
    var test = req.query.items.split(",").map((data)=>{
        return data;         
    })

    Inventory.deleteItem(test,(err,Item)=>{ 
        if(err){
            res.json({success: false, message: "could not delete items."})
        } else {
            res.json({success: true, message: "Items deleted!"})
        }
    })
})

module.exports = router;