const User = require("../models/User");
const jwt=require("jsonwebtoken");

const maxAge=5*24*60*60;
const createToken=id=>{
return jwt.sign({id},"create token key",{
  expiresIn:maxAge
})
}
const bcrypt=require("bcrypt")
const alertError = (err) => {
  let errors = { name: "", email: "", password: "" };
  if(err.code === 11000){
    errors.email="Email already exist";
    return errors;
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
     });
  }
  return errors;
};
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({ user });
  } catch (err) {
    let error=alertError(err);
    console.log(error);
    res.status(400).json({error});
  }
};
const login = async(req, res) => {
    const {email,password}=req.body;
    if(email && password)
  {try{
   const find=await User.find({email})
   console.log("find on login",find[0]._id)
   if(find.length === 0) return res.send("Invalid credentials")
 const validpassword=await bcrypt.compare(password,find[0].password)
if(validpassword){
       const token=createToken(find[0]._id);
       console.log(find[0]._id)
       res.cookie("id",find[0]._id,{
         httpOnly:true,
         secure:true,
         maxAge:maxAge*1000
       });
       res.status(200).json({msg:"User login successfully",find})
   }else{

       res.status(401).send("invalid credentials")
   }
  }
  catch(err){
      console.log("error",err)
  }}
  else{
    res.status(201).send("Please enter Credentials")
  }
};

const verifyuser=async(req,res,next)=>{
  const token=req.cookies.id;
  if(token){
    const find=await User.findById(token);
    console.log("find",find)
    res.json(find)
  }
  else{
    next();
  }

}

const logout = (req, res) => {
  res.cookie("id","",{maxAge:1})
  res.status(200).json({logout:true})
};

module.exports = { login, signup, logout, verifyuser  }