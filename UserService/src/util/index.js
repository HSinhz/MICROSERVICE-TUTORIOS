const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, AUTHOR_BINDING_KEY, USER_SERVICE} = require('../config/db/rabitMQ')

// create channel
module.exports.CreateChannel = async () => {
    try {
      const connection = await amqplib.connect(MESSAGE_BROKER_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
      return channel;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports.PublishMessage = (channel, service, msg) => { // service == RoutingKey
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  };
  
  module.exports.SubscribeMessage = async (channel, service) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, EXCHANGE_NAME, USER_SERVICE);
  
    channel.consume( q.queue, (msg) => {
      if (msg.content) {
          console.log("the message is:", msg.content.toString());
          service.SubscribeEvents(msg.content.toString());
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };














