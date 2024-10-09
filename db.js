const mongoose = require ('mongoose');

// define the MongoDB connection URL

const mongoURL = ' mongodb://127.0.0.1:27017/hotels';

// setup MongoDB connections
mongoose.connect('mongodb://localhost:27017/hotel')
.then(()=> console.log('Connected to MongoDB server')).catch(err => console.log('MonogDB connection error',err));

// get default connection
// mongoose maintains a default connection object respresenting the mongoDB connection

const db = mongoose.connection;

// define event listener for Database connection
db.on('connected', ()=> {
    console.log('Connected to MongoDB server')
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})
db.on('error', (err)=>{
    console.log('MongoDB connection error', err);
})

module.exports = db;