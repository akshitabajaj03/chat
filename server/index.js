const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {
    origin: "http://localhost:3000", // Adjust the origin as needed
    methods: ["GET", "POST"]
 }
  });
app.use(cors());

io.on('connection', (socket) =>{
    socket.on('join', ({name,room}, callback) =>{
        const {error, user} = addUser({id:socket.id, name, room});

        if(error)
        {
            return callback(error);
        }

        socket.emit('message', 
        {user: "admin", text: `${user.name}, welcome to the room ${user.room}`});

        socket.broadcast.to(user.room).emit('message', 
        {user: "admin", text:`${user.name}has joined!`});

        socket.join(user.room);

        callback();
    })

    socket.on('sendMessage', )

    socket.on('disconnect', ()=>{
        console.log("User left");
    })
});

app.use(router);

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`);
})