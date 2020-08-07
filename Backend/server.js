const express= require('express');
const cors = require('cors');

const userRouter = require('./Routes/users');
const excerciseRouter = require('./Routes/excercises');

require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

app.use('/users',userRouter);
app.use('/excercises',excerciseRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', ()=>{
	console.log('Mongodb db connection established succesfully');
});

app.listen(port,()=>{
	console.log(`Server running on port: ${port}`);
});