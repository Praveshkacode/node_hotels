const express = require('express');
const app = express();
const db = require('./db');
const bodyParser =require('body-parser');
app.use(bodyParser.json());
const PORT = 3000;
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
