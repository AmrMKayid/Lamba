module.exports = function socket(io) {

    console.log('TEST: SOCKET is connected');

    io.on('connection', function (socket) {

        console.log('a user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('message', (message) => {
            // Received Message From Angular Client
            console.log("Message Received: " + message);

            // Sending the message back to the client
            io.emit('message', {type: 'new-message', text: message});
        });

    });
};