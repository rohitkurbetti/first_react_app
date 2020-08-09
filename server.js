const express= require('express');
const cors = require('cors');
const userRouter = require('./Backend/Routes/users');
const excerciseRouter = require('./Backend/Routes/excercises');
const path = require("path");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT||3200;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/users',userRouter);
app.use('/excercises',excerciseRouter);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'));
}
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname,'./build/index.html'));
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', ()=>{
	console.log('Mongodb db connection established succesfully');
});

app.listen(port,()=>{
	console.log(`Server running on port: ${port}`);
});