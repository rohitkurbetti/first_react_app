const express= require('express');
const cors = require('cors');
const userRouter = require('./Routes/users');
const excerciseRouter = require('./Routes/excercises');
const path = require("path");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT||3200;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI||uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', ()=>{
	console.log('Mongodb db connection established succesfully');
});

app.use('/users',userRouter);
app.use('/excercises',excerciseRouter);


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('Client/build'));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname,'Client','build','index.html'));
	});
}

app.listen(port,()=>{
	console.log(`Server running on port: ${port}`);
});