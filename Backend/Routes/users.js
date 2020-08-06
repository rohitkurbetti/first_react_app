const express = require('express');
const router = express.Router();

let User = require('../models/user.model'); 


//getUser data
router.get('./',(req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json({'error' : err}));
});

//save user data
router.post('/add',(req,res)=>{
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(()=>res.json('user added'))
    .catch(err => res.status(400).json('Error: '+err));
});

//get user by id
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    User.findById(id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json({'Error: ':err}));
});

//update user by id
router.put('/update/:id',(req,res)=>{
    const id = req.params.id;

    User.findById(id)
    .then(users => {
        users.username = req.body.username;

        users.save()
        .then(users => res.json('User Updated'))
        .catch(err => res.status(400).json({'Error: ':err}));
    })
    .catch(err=> res.status(400).json({'Error: ':err}));

});

//delete specific user
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json({'Error: ':err}));
});

module.exports = router;