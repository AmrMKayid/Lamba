const Message = require('../models/message.model');

module.exports = function socket(io) {

    console.log('TEST: SOCKET is connected');

    io.on('connection', function (socket) {

        console.log('a user connected');


        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('message', (data) => {
            // Received Message From Angular Client
            console.log("Message Received: " + data);

            // Sending the message back to the client
            io.emit('message', {type: 'new-message', text: data});

            let message = new Message(data.message);
            Message.addMessage(message, (err, newMsg) => {});
        });

    });
};