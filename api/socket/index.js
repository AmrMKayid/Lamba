function socket(io) {

    console.log('TEST: SOCKET is connected');

    io.on('connection', function(socket){
        console.log('a user connected');
    });
}

module.exports = socket;