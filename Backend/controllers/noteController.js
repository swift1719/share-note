const Note = require("../models/noteModel");
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(
    async (req,res)=>{

        // to fetch notes of a user 
        // we need to provide user's id
        // that will be achieved with the help of a middleware
        const notes = await Note.find({
            user:req.user._id
        });

        res.json(notes);
    }
);

const createNote = asyncHandler(
    async (req,res) => {
        const { title, content, category} = req.body;

        if(!title || !content || !category){
            res.status(400);
            throw new Error("Please fill all the fields");
        }else{
            const note = new Note({
                user:req.user._id,
                title,
                content,
                category
            });
            const createNote = await note.save();

            res.status(201).json(createNote);
        }

    }
);

module.exports = {getNotes,createNote};