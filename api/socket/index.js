const Message = require('../models/message.model');
const jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');

// array the will store all the connected users
var clients = [];
var socketio; 


module.exports = function socket(io) {

    console.log('TEST: SOCKET is connected');

    socketio = io;
    io.on('connection',  socketioJwt.authorize({
    secret: 'SECRET_KEY',
    timeout: 7000 // 7 seconds to send the authentication message
    })).on('authenticated',onNewConnection);
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
function onNewConnection(socket)
{

    console.log("new user is attempting to connect");
    // close the connection
    if(!socket.decoded_token)
    {
        console.log("Unauthorized");
        socket.disconnect(true);
        return;
    }


    client = 
    {
        id: socket.decoded_token._id,
        socket: socket
    };
    console.log(client.id);

    // removes the client from the list on disconnection
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


    //handles messages
    socket.on('message', onMessage);
}


/** Message -> void
  * recevies a message, stores it in the database and forwards it to the correct destination if any
  *
  */
function onMessage(data)
{
    if(!data.decoded_token)
    {
        return;
    }
    // Received Message From Angular Client
    console.log("Message Received: " + data);

    // Sending the message back to the client
    io.emit('message', {type: 'new-message', text: data});

    let message = new Message(data.message);
    Message.addMessage(message, (err, newMsg) => {});
}