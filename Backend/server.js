const express = require('express');
const notes = require('./data/notes');

//creating object of express
const app = express();

// whenever we try to fetch data from DB/backend then
//api end-point is the route from where the data is served

//GET : fetch data from backend and serves it to the frontend
app.get('/',(req,res)=>{
    res.send('API is running')
})
app.get('/api/notes',(req,res)=>{
    res.json(notes);
})
//creating http server 
app.listen(5000,console.log("server started at port 5000"));