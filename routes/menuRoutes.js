const express = require('express');
const router = express.Router();

const Menu=require('./../models/menu');

// post route to add a menu

router.post('/',async(req,res)=>{

    try{
        const data = req.body 
    const newMenu = new Menu(data);
    
    const savedMenu = await newMenu.save();
    console.log("Data Saved");
    res.status(200).json(savedMenu);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
    
})

router.get('/',async (req,res)=>{
    try{
        const data = await Menu.find();
        console.log("Data Saved");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:taste',async (req,res)=>{
    try{
        const taste = req.params.taste; // extract the taste from the url parameter
    if(taste=='spicy' || taste =='sour' || taste =='sweet'){
        
        const response = await Person.find({taste:taste});
        console.log('response Fatched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error:'Invalid server error'});
    }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

})

module.exports = router;