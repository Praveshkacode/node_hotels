const mongoose = require('mongoose');

// Define the mongo Db connection url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

// Setup mongodb connection
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((err) => {
        console.log("MongoDB connection error", err);
    });

// Get default connection
const db = mongoose.connection;

// Define event listeners
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
