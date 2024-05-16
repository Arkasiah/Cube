class AuctionCreatedConsumer {
    constructor(channel, io) {
      this.channel = channel;
      this.io = io;
      this.consume();
    }
  
    async consume() {
      await this.channel.assertQueue('auction_created');
      this.channel.consume('auction_created', (message) => {
        if (message !== null) {
          const content = JSON.parse(message.content.toString());
          console.log('--> auction created message received');
          this.io.emit('AuctionCreated', content);
          this.channel.ack(message);
        }
      });
    }
  }
  
  module.exports = AuctionCreatedConsumer;
  