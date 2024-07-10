const Person = require('./models/person');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(async (USERNAME,password,done)=>{
    // authenticationn login here
    try{
        // console.log(`Received credentials`,USERNAME,password);
        const user = await Person.findOne({username:USERNAME});
    
        if(!user){
            return done(null,false,{message:'Incorrect username'});
    
        }
    
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect Password'});
        }
    
    
    }catch(err){
        return done(err);
    }
    }))

module.exports = passport; // export configured passport
    