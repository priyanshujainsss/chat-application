const mongoose=require("mongoose");
const MessageSchema=new mongoose.Schema({
    name:{
        type:String
    },
    user_id:{
        type:String
    },
    text:{
        type:String
    },
    room_id:String
})
const Message=mongoose.model("messages",MessageSchema);
module.exports=Message