var io = require('socket.io')();

io.on('connection', function (socket) {
    console.log('New User is connected');
});

module.exports = io;