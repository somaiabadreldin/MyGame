const io = require('socket.io')(3000, {
    cors: {
        origin: '*'
    }
});

const players = {};

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    players[socket.id] = { x: 0, y: 0 };

    socket.emit('updatePlayers', players);

    socket.on('newPlayer', () => {
        players[socket.id] = { x: 400, y: 300 };
        io.emit('updatePlayers', players);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
    });
});
