class AuctionFinishedConsumer {
    constructor(channel, hub) {
      this.channel = channel;
      this.hub = hub;
      this.consume();
    }
  
    async consume() {
      await this.channel.assertQueue('auction_finished');
      this.channel.consume('auction_finished', (message) => {
        if (message !== null) {
          const content = JSON.parse(message.content.toString());
          console.log('--> auction finished message received');
          this.hub.invoke('AuctionFinished', content);
          this.channel.ack(message);
        }
      });
    }
  }
  
  module.exports = AuctionFinishedConsumer;
  