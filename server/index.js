const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8081 });
console.log('hello');
const rooms = {};
let roomId = 0;

server.on('connection', (ws) => {
    console.log('connected');
    ws.on('message', (msg) => {
        const { type, data } = JSON.parse(msg);

        switch(type) {
            case 'prepare':
                if (rooms[roomId]?.length === 2) {
                    roomId++;
                }

                if (rooms[roomId]) {
                    rooms[roomId].push(ws);
                } else {
                    rooms[roomId] = [ws];
                }

                const playerSymbol = rooms[roomId].length === 1 ? 'X' : 'O';

                ws.send(JSON.stringify({
                    type: 'start',
                    data: {
                        player: playerSymbol,
                        roomId,
                    },
                }));
                break;
            case 'move':
                const currentRoomId = data.roomId;
                rooms[currentRoomId]?.forEach((socket) => {
                    socket.send(JSON.stringify({
                        type: 'display',
                        data,
                    }));
                });
                break;
            default:
                break;
        }
    });
});