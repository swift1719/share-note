const Note = require("../models/noteModel");
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(
    async (req,res)=>{

        // to fetch notes of a user 
        // we need to provide user's id
        // that will be achieved with the help of a middleware
        const notes = await Note.find();

        res.json(notes);
    }
);

module.exports = {getNotes};