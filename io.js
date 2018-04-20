var io = require('socket.io')();

io.on('connection', function (socket) {
	socket.id = blblb;
    console.log('New User is connected with id: ' + socket.id);
});

module.exports = io;