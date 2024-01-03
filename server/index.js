const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require('cors');

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
    console.log("We have a new connection");

    socket.on('join', ({name,room}) =>{
        console.log(name,room);
    })

    socket.on('disconnect', ()=>{
        console.log("User left");
    })
});

app.use(router);

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`);
})