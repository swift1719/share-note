const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        },
        pic:{
            type:String,
            required:true,
            default:"http://www.newdesignfile.com/postpic/2013/01/generic-user-icon-windows_321380.png",
        },
    },
    //time stamp to create a timeline for the data when it's created and updated
    {
        
        timeStamp:true,
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;