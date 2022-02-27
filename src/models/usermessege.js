const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3
    },

    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address")
            }
        }
    },

    number:{
        type:Number,
        required:true,
        minLength:11
    },

    subject:{
        type:String,
        required:true,
        minLength:3
    },

})


const User = mongoose.model("User",userSchema);

module.exports = User;

