const mongoose = require ('mongoose');
require('dotenv').config();
console.log(">>>>>",process.env)

// define the MongoDB connection URL

//  const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;
// setup MongoDB connections
// mongoose.connect('mongodb://localhost:27017/hotel')
// .then(()=> console.log('Connected to MongoDB server')).catch(err => console.log('MonogDB connection error',err));
mongoose.connect(mongoURL)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('MongoDB connection error:', err));

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