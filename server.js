const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {
    v4: uuidv4
} = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.redirect(`/gapchat/`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/gapchat/', (req, res) => {
    const roomId = uuidv4().slice(0, 4);
    res.redirect(`/gapchat/${roomId}`);
});

app.get('/gapchat/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const rooms = {};

io.on('connection', (socket) => {
    const roomId = socket.handshake.query.roomId;
    if (!rooms[roomId]) {
        rooms[roomId] = [];
    }

    socket.join(roomId);
    io.to(roomId).emit('messages', rooms[roomId]);

    socket.on('message', (message) => {
        console.log('Message received:', message);
        const serverMessage = {
            ...message,
            timestamp: new Date().toISOString()
        };
        rooms[roomId].push(serverMessage);
        io.to(roomId).emit('messages', rooms[roomId]);
        console.log('Message sent to room', roomId, ':', serverMessage);
    });

    socket.on('disconnect', () => {
        // Clean up when a user disconnects
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
