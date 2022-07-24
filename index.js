const express = require("express");
const port = 5000;
const app = express();
const http = require("http");
const expressServer = http.createServer(app);

// create socket server 
const { Server } = require("socket.io");
const io = new Server(expressServer);



let user = 0;
io.on("connection", (socket) => {
    user++;
    console.log("new user connected", user);
    socket.on("disconnect", () => {
        user--;
        console.log("user disconnected", user);
    })

    // send data to client
    socket.send(user);


    setInterval(() => {
        const date = new Date();
        const getDate = date.getTime();
        socket.emit("myTimeEvent", getDate)
    }, 1000)

    // ------received data from client--
    socket.on("clientToServer", (name) => {
        // console.log(name);
        io.emit("serverToClient", name);
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
        // res.send(`<h1>socket.io server...</h1>`)
})
expressServer.listen(port, () => {
    console.log("Listening to port", port)
})