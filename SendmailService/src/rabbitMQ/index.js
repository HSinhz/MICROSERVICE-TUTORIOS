const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL, EXCHANGE_NAME, SEND_MAIL_KEY} = require('../config/rabbitMQ');

module.exports.SubscribeMessage = async () => {
    let payload = {};
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", {durable: false});

    const { queue } = await  channel.assertQueue('', {exclusive: true});
    console.log( 'Queue: ', queue);

    channel.bindQueue( queue.queue, EXCHANGE_NAME, SEND_MAIL_KEY);
    channel.consume( queue.queue, msg => {
        let message = JSON.parse(msg.content.toString())
            console.log('Received: ', message); 
            console.log('Routingkey = ', msg.fields.routingKey);
    }) 
};
