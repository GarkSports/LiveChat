const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('A new client connected.');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all other connected clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log('Sent message to client:', message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

console.log('WebSocket server is running on ws://localhost:8081');
module.exports= wss