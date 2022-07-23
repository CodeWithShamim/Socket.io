const express = require("express");
const port = 5000;
const app = express();
const http = require("http");
const expressServer = http.createServer(app);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
expressServer.listen(port, () => {
    console.log("Listening to port", port)
})