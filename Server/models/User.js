const mongoose=require("mongoose");
const {isEmail} =require("validator");
const bcrypt=require("bcrypt");
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter a name"]
    },
    email:{
        type:String,
        unique:[true,"Email already exist"],
        require:[true,"Please Enter a email"],
        validate:[isEmail,"Please Enter a valid email address"]
    },
    password:{
        type:String,
        require:[true,"Please Enter a password"],
        minLength:[6,"Password should be atleast 6 characters"]
    },
   
})

UserSchema.pre("save",async function(next){
      const salt=await bcrypt.genSalt();
      console.log("salt",salt);
     this.password= await bcrypt.hash(this.password,salt) 
    next();
})

const User=mongoose.model("users",UserSchema);
module.exports=User