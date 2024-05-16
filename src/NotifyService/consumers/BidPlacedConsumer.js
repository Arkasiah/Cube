class BidPlacedConsumer {
    constructor(channel, hub) {
      this.channel = channel;
      this.hub = hub;
      this.consume();
    }
  
    async consume() {
      await this.channel.assertQueue('bid_placed');
      this.channel.consume('bid_placed', (message) => {
        if (message !== null) {
          const content = JSON.parse(message.content.toString());
          console.log('--> bid placed message received');
          this.hub.invoke('BidPlaced', content);
          this.channel.ack(message);
        }
      });
    }
  }
  
  module.exports = BidPlacedConsumer;
  