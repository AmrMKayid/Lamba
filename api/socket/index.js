import { INSPECT_MAX_BYTES } from 'buffer';

const Message = require('../models/message.model');
var mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var config = require('../config');


// array the will store all the connected users
var clients = [];
var socketio;


module.exports = function socket(io) {

    console.log('TEST: SOCKET is connected');

    socketio = io;
    io.on('connection', onNewConnection);
};



/********************************************************
 *                                                      *
 *                 Private Functions                    *
 *                                                      *
 ********************************************************/

/** socket -> void
  * Makes sure the user is authenticated and adds him to the connected users list
  *
  */
function onNewConnection(socket) {

    console.log("User connected - IP: ", socket.request.headers['x-real-ip']);

    /*gets the authorization token*/
    socket.on("authorize", function (data) {
        try {
            // gets the logged in user id
            const secret = config.SECRET;
            decoded = jwt.verify(data, secret);
            var user_id = decoded.user._id;
            // adds user to the clients list
            client = {
                id: user_id,
                token: data,
                socket: socket
            };
            clients.push(client);
        }
        catch (e) {
            socket.disconnect(true);
        }
    });



    // removes the client from the list on disconnection
    socket.on('disconnect', function () {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var c = clients[i];

            if (c.socket.id == socket.id) {
                clients.splice(i, 1);
                console.log('User disconnected - IP: ', socket.request.headers['x-real-ip']);
                break;
            }
        }
    });


    //handles messages
    socket.on('message', onMessage);
}


/** Message -> void
  * recevies a message, stores it in the database and forwards it to the correct destination if any
  *
  */
function onMessage(data) {
    var msg;
    try {
        msg = JSON.parse(data)
    }
    catch (e) {
        return;
    }

    if (!msg.authorization || !msg.reciever_id) {
        return;
    }


    sendMessage(msg);

}

/** string -> void
  * searches for a client by his user id in the client list
  *
  * return the client or null if not found
  */
function getClient(user_id) {

    for (var i = 0; i < clients.length; i++) {
        if (clients[i].id == user_id) {
            return clients[i];
        }
    }
    return null;
}


function sendMessage(msg) {
    try {
        const secret = config.SECRET;
        decoded = jwt.verify(msg.authorization, secret);
        var user_id = decoded.user._id;
        message =
            {
                from: user_id,
                to: msg.reciever_id,
                text: msg.data,
                created: Date.now()
            };

        if (!message.from || !message.to || !message.text) {
            return res.status(422).json({
                err: null,
                msg: "Invalid message",
                data: null
            });
        }

        User.findById(message.to, function (err, retrievedUser) {
            if (err || retrievedUser._id != message.to) {
                return;
            }
            var messagedb = new Message(message);
            messagedb.save((err, savedMsg) => {
                if (err)
                    return next(err);
            });
        });

        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id == message.to) {
                messagestr = JSON.stringify(message);
                clients[i].socket.emit("message", messagestr);
            }
        }
    }
    catch (e) {

    }

}