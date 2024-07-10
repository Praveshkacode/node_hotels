const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser =require('body-parser');
const passport = require('./auth');

app.use(bodyParser.json());
const PORT = process.env.PORT|| 3000;

const logRequest =(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
    next(); // move to next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})


app.get("/", (req, res) => {
    res.send("Hello Pravesh");
});

// import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


// use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
