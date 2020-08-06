const express = require('express');
const router = express.Router();

let Excercise = require('../models/excercise.model');

//get Excercise date
router.get('/home',(req,res)=>{
    Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json({'Error:':err}));
});

//get excercise data by id
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Excercise.findById(id)
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json({'Error: ':err}));
});

//save excercise data
router.post('/add',(req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);
    
    const newExcercise = new Excercise({
        username,
        description,
        duration,
        date        
    });

    newExcercise.save()
    .then( ()=> res.json('Exercise added'))
    .catch(err => res.status(400).json({'Error: ':err}));

});

//update excercise data
router.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    Excercise.findByIdAndUpdate(id)
    .then(excercises => {
        excercises.username = req.body.username;
        excercises.description = req.body.description;
        excercises.duration = req.body.duration;
        excercises.date = req.body.date;

        excercises.save()
        .then(()=> res.json('Excercise Updated'))
        .catch(err=> res.status(400).json({'Error: ':err}));
    })
    .catch(err=> res.status(400).json({'Error: ':err}));
});

//delete excercise data
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Excercise.findByIdAndDelete(id)
    .then(excercises => res.json(excercises))
    .catch(err=> res.status(400).json({'Error: ':err}));
});

module.exports = router;