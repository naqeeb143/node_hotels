const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res)=>{
    try{
        const data = req.body;
        const newItems = new MenuItem(data);
        const response = await newItems.save();
        console.log('Data Saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
});
router.get('/', async (req , res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data Fetched');
        res.status(200).json(data)

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/:taste', async( req ,res)=>{
    try{
        const taste = req.params.taste;
        if (taste == "sweet" || taste == "sour" || taste == "spicy") {
            const response = await MenuItem.find({taste: taste});
            console.log(" Items Taste Fetched");
            res.status(200).json(response);

        } else {
            res.status(404).json({error: 'Invalid taste Type'}); 
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: " Interval server error"});

    }
});

// comment added for testing purpose
module.exports = router;
