const express = require('express');
const http = require('http');
const signalR = require('@microsoft/signalr');
const { connectRabbitMQ } = require('./rabbitmq');
const AuctionCreatedConsumer = require('./consumers/AuctionCreatedConsumer');
const AuctionFinishedConsumer = require('./consumers/AuctionFinishedConsumer');
const BidPlacedConsumer = require('./consumers/BidPlacedConsumer');

const app = express();
const server = http.createServer(app);

(async () => {
  try {
    const channel = await connectRabbitMQ();

    // Set up consumers
    new AuctionCreatedConsumer(channel, hub);
    new AuctionFinishedConsumer(channel, hub);
    new BidPlacedConsumer(channel, hub);
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
})();

const PORT = process.env.PORT || 7004;

const hub = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:7004/notifications')
  .build();

app.get('/signalr.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/@microsoft/signalr/dist/browser/signalr.js');
});

hub.on('AuctionCreated', (data) => {
  console.log('--> auction created message received', data);
});

hub.on('AuctionFinished', (data) => {
  console.log('--> auction finished message received', data);
});

hub.on('BidPlaced', (data) => {
  console.log('--> bid placed message received', data);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});