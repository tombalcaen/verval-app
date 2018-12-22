const express = require('express');
const router = express.Router();
const List = require("../models/list");

router.get('/',(req,res,next)=>{    
    List.getList(req.query.uid,(err, items)=>{        

    console.log(err)
    console.log(items)

    if(err){
        res.json({success: false, message: "failed to get lists."})
      } else {          
          res.json(items);
      }
    })
})

router.post('/',(req,res,next)=>{
    let newList = new List({
        uid: req.body.uid,
        name: req.body.name,        
    });

    List.addList(newList, (err, List)=>{
        if(err){
            res.json({success: false, message: "Failed to add new list."})
        } else {
            res.json({success: true, message: "List added!"});
        }
      });
})

router.delete('/',(req,res,next)=>{    
    var test = req.query.items.split(",").map((data)=>{
        return data;         
    })

    List.deleteList(test,(err,Item)=>{ 
        if(err){
            res.json({success: false, message: "could not delete lists."})
        } else {
            res.json({success: true, message: "List deleted!"})
        }
    })
})

module.exports = router;