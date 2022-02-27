const bcrypt = require("bcryptjs/dist/bcrypt");
const async = require("hbs/lib/async");
const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
    

})

signupSchema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the password is ${this.password}`);

        this.confirmpassword = undefined;
    }
    next();
})

const Signup = new mongoose.model("Signup", signupSchema);
module.exports= Signup;