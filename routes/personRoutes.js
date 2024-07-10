const express = require('express');
const router = express.Router();

const Person=require('./../models/person');
const {jwtAuthMiddleware,generateToken} = require('../jwt');

// post route to add a person
router.post('/signup',async(req,res)=>{

    try{
        const data = req.body // assuming that request body contains person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);
    
    // save the new person to the database
    const response = await newPerson.save();
    console.log("Data Saved");

    const payload = {
        id:response.id,
        username:response.username
    }
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token is : ",token);


    res.status(200).json({response:response ,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
    
})

// Login routes
router.post('/login', async(req,res)=>{
    try{
        // Extract username and password from the request body
        const {username,password} = req.body;

        // find the user by username

        const user = await Person.findOne({username:username});

        // if username does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or Password'});
        }
        // generate token
        const payload = {
            id:user.id,
            username:user.username,
        }

        const token = generateToken(payload);

        // return token as response
        res.json({token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Profile routes
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData = req.user;
        console.log("user Data: ",userData)

        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// get method to get the person
router.get('/',jwtAuthMiddleware,async (req,res)=>{
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
