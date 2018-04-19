const Message = require('../models/message.model');

const users = [];
const connections = [];

const searchUser = (username) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            return users[i];
        }
    }

    return false;
};

const searchConnections = (username) => {
    let found = [];
    for (let conn of connections) {
        if (conn.username == username) {
            found.push(conn);
        }
    }

    if (found.length > 0) {
        return found;
    } else {
        return false;
    }
}

module.exports = function socket(io) {

    console.log('TEST: SOCKET is connected');

    io.on('connection', function (socket) {

        console.log('a user connected');

        socket.emit("welcome", {
            msg: "Welcome to the chat server!"
        });

        socket.on("email", (data) => {
            if (data.email) {
                socket.email = data.email;
                let user = {email: socket.email, id: socket.id};
                let existing = searchUser(user.email);
                if (existing == false) {
                    users.push(user);
                }

                io.emit("active", users);
                console.log("[%s] connected", socket.username);
                console.log("<users>:", users);
            }
        });

        socket.on("getactive", () => {
            socket.emit("active", users);
        });

        socket.on('disconnect', function () {
            // console.log('user disconnected');
            let instances = searchConnections(socket.username);
            if (instances.length == 1) {
                let user = searchUser(socket.username);
                if (user != false) {
                    users.splice(users.indexOf(user), 1);
                }
            }

            io.emit("active", users);
            console.log("[%s] disconnected", socket.username);
            console.log("<users>:", users);

            let connIndex = connections.indexOf(socket);
            if (connIndex > -1) {
                connections.splice(connIndex, 1);
            }
        });

        socket.on('message', (data) => {
            // // Received Message From Angular Client
            // console.log("Message Received: " + message);
            //
            // // Sending the message back to the client
            // io.emit('message', {type: 'new-message', text: message});

            let user = searchUser(data.to);

            if (user != false) {
                let instances = searchConnections(data.to);
                if (instances.length > 0) {
                    for (let instance of instances) {
                        socket.broadcast.to(instance.id).emit("message", data.message);
                    }
                    let myOtherInstances = searchConnections(socket.username);
                    if (myOtherInstances.length > 1) {
                        for (let conn of myOtherInstances) {
                            // exclude me
                            if (conn != socket) {
                                socket.broadcast.to(conn.id).emit("message", data.message);
                            }
                        }
                    }
                }
            }
            console.log(data)

            // console.log("[%s].to(%s)<< %s", data.message.from, data.to, data.message.text);

            // save the message to the database
            let message = new Message(data.message);
            Message.addMessage(message, (err, newMsg) => {});
        });

    });
};