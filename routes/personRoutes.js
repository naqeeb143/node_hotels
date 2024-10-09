const express = require('express');
const router = express.Router();

const Person = require('./../models/Person');

router.post('/', async (req, res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
});

router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error' });
    }

});

router.get('/:workType', async (req, res)=>{
    try{
        const workType = req.params.workType;   // extract the work type form the URL
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work: workType});
            console.log('Data Fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work Type'}); 
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal service error'});
    }

});

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // extract the id from the URL parameter
        const updatedPersonData = req.body;  // Updated data from the person
        const response = await Person.findByIdAndUpdate( personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });
        if(!response){
            return res.status(404).json({error: "person not found"});
        }
        console.log(" Updated Successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: " Interval server Error"});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Person delete')
        res.status(200).json({ message: 'Person deleted Successfully'})

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Interval server error"});

    }
})

module.exports = router;