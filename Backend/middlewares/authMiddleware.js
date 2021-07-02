const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(
    async (req,res,next) => {
        let token;

        // checking the presence of authorization header in user's request
        if(req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer"))
        {
            try {

                //taking out token from authorization header 
                // authorization header has two parts a bearer and a token
                // splitting to obtain token
                token=req.headers.authorization.split(" ")[1];

                //decoding token id
                const decoded = jwt.verify(token,process.env.JWT_SECRET);

                // if token works then finds the user by id and obtain the user document expcept the password column
                 req.user = await User.findById(decoded.id).select("-password");

                 next();

            } catch (error) {
                res.status(401);
                throw new Error("Not authorized, token failed!!!");
            }
        }
        if(!token){
            res.status(401);
            throw new Error("Not authorized, no token found!!!");
        }
    }
);

module.exports = {protect};
