const express = require('express');
const router = express.Router();

const Person=require('./../models/person');

// post route to add a person
router.post('/',async(req,res)=>{

    try{
        const data = req.body // assuming that request body contains person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);
    
    // save the new person to the database
    const savedPerson = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(savedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
    
})

router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log("Data Saved");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType; // extract the work type from the url parameter
    if(workType=='chef' || workType =='manager' || workType =='waiter'){
        
        const response = await Person.find({work:workType});
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

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        });

        if(!response){
            res.status(404).json({error:'Person not Found'});
        }

        console.log("Data updated");
        res.status(200).json(response);


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json({error:'Person not Found'});
        }

        console.log("Data Deleted");
        res.status(200).json({message:"Person Deleted Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;
