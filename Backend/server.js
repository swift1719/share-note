const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');


//creating object of express
const app = express();

//loads .env file content to application
dotenv.config();
const PORT=process.env.PORT || 5000;

connectDB();
// accepts json data from the user
app.use(express.json());

// whenever we try to fetch data from DB/backend then
//api end-point is the route from where the data is served

//GET : fetch data from backend and serves it to the frontend
// app.get('/',(req,res)=>{
//     res.send('API is running')
// })
// app.get('/api/notes',(req,res)=>{
//     res.json(notes); 
// })

// app.get('/api/notes/:id',(req,res)=>{
//     const note=notes.find((n)=>n._id===req.params.id)
//     res.send(note);
// })

//using routes for a particular aspect/user mode
// from within a separate file from routes folder
app.use('/api/users',userRoutes);
app.use('/api/notes',notesRoutes);


// using middlewares
app.use(notFound);
app.use(errorHandler);

//creating http server 
app.listen(PORT,console.log(`Server started at port ${PORT}`));