const jwt = require('jsonwebtoken');


// token that frontend uses to autheticate to backend
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
};

module.exports = generateToken;