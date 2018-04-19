const Message = require('../models/message.model');
const jwt = require('jsonwebtoken');

// array the will store all the connected users
var clients = [];
module.exports = function socket(io) {

    console.log('TEST: SOCKET is connected');

    io.on('connection', function (socket) {

        console.log('a user connected with id: ' + socket.id);

        // gets the logged in user id
        const authorization = req.headers.authorization;
        const secret = req.app.get('secret');
        decoded = jwt.verify(authorization, secret);
        var user_id = decoded.user._id;

		client = {
            id: user_id,
            socket: socket
        };


        clients.push(client);

        socket.on('disconnect', function () {
            for( var i=0, len=clients.length; i<len; ++i )
            {
                var c = clients[i];

                if(c.clientId == socket.id)
                {
                    clients.splice(i,1);
                    break;
                }
            }
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