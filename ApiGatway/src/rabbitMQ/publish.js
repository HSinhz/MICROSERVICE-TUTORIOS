const amqplib = require('amqplib');

const {MESSAGE_BROKER_URL, EXCHANGE_NAME} = require('../config/rabbitMQ');
const publish = async ( msg, routingkey) => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", {durable: false});

        await channel.publish(EXCHANGE_NAME, routingkey, Buffer.from(JSON.stringify(msg)));
        console.log(`[x] Send OK:::${msg}`)
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    publish: publish
}