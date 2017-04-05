/**
 * Created by sebastiandebin on 31/03/17.
 */
const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//MONGO - CONNECT TO DATABASE
mongoose.connect('mongodb://localhost/todos')


//GET THE DEFAULT CONNECTION
const db = mongoose.connection;
const path = require('path');

//Bind connection to error event (to get notifications of connections errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:  '));


////
app.use('/static', express.static('build'));

//api routes async

app.use('/api/todos', require('./todos/todos-routes'));

// API routes
app.use('/', function (req, res, next)
{

    res.sendFile(path.join(__dirname + '/../../build/index.html'));
});


app.use('/api/todos', require('./todos/todos-routes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




// app.get('/:greeting',(req,res,next)=>{
//     const {greeting} =  req.params;
//     const {to} =  req.query;
//     res.status(200).send(  greeting +" - "+to);
// });


app.listen(PORT, ()=>{
   console.log("Server running on " + PORT);
})
