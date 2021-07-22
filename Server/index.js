const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const socketio = require("socket.io");
const io = socketio(http);
const PORT = process.env.PORT || 5000;
const { adduser, getUser, removeUser } = require("./helper/helper");
const Room = require("./models/Room");
const Message =require("./models/Message");
const authRoutes=require("./Routes/authRoutes");
const cookieParser = require('cookie-parser')
mongoose.connect(
  "mongodb+srv://users:users@cluster0.8fwys.mongodb.net/chat-data?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  },
  (err, data) => {
    if (err) {
      console.log("database not connect");
    } else {
      console.log("database connect");
    }
  }
  );
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors({credentials:true,origin:"http://localhost:3000"}));
  app.use(authRoutes);
app.get("/setcookie",(req,res)=>{
  res.cookie("jwt","token");
  res.send("cookies are set")
})
io.on("connection", async (socket) => {
  console.log(socket.id);

  Room.find({}).then((result) => {
    socket.emit("output-rooms", result);
  });

  Message.find().then(result=>{
      socket.emit("output-message",result)
  })

  socket.on("create-room", (name) => {
    const room = new Room({ name });
    room
      .save()
      .then((saved) => {
        console.log("room inserted in db");
        io.emit("room-created", saved);
      })
      .catch((err) => console.log("Failed to insert room in db"));
  });
  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = adduser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });
    socket.join(room_id);
    if (error) console.log("join error", error);
    else console.log("join user", user);
  });
  socket.on("sendmessage", (message, room_id, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    console.log("message", msgToStore);
    const msg=new Message(msgToStore);
    msg.save().then(result=> {io.to(room_id).emit("message", result)})
    .catch(err=>console.log("error from fetch msgs",err))

    
      

    callback();
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
    });
  });
});

http.listen(PORT, () => {
  console.log(`Listeing on ${PORT}`);
});
