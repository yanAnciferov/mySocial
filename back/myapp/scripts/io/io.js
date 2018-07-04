var socket = require("socket.io");
var onConnection = require("./handlers")
var io;

let initialazeIO = (server) => {
    io = socket(server);
    io.on('connection', (socket) => { onConnection(socket, io) });
    console.log("socket initialized")
}

let getIO = () => {
    return io;
}

module.exports = {
    initialazeIO,
    getIO
};