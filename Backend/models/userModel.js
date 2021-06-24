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

// operation that needs to be performed before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    // generate unique salt
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

// function to decrypt password
userSchema.methods.matchPassword = async function(enteredPassword){
    //comparing user provided password with that stored in DB
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model("User",userSchema);

module.exports = User;