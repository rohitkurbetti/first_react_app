const express= require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./Backend/Routes/users');
const excerciseRouter = require('./Backend/Routes/excercises');

require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

app.use('/users',userRouter);
app.use('/excercises',excerciseRouter);

if(process.env.NODE_ENV === 'production')
{
	app.use(express.static(__dirname));

	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname+'/public'),'index.html');
	});	

}



const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', ()=>{
	console.log('Mongodb db connection established succesfully');
});

app.listen(process.env.PORT||3200,()=>{
	console.log(`Server running on port: ${port}`);
});