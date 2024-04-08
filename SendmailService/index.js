const path = require('path');
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const {sendOTP} = require('./src/controllers/sendOTP')
const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL, EXCHANGE_NAME, SEND_MAIL_KEY} = require('./src/config/rabbitMQ');

const StartServer =  async () => {
  const app = express();
  const port = 9002;
  app.use(express.json());

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
      sendOTP( message.Email, message.OTP);
  },{
    noAck: true
  }) 

  app.listen(port, () => {
    console.log(`SendMail Service listening on port http://localhost:${port}`);
  })

}

StartServer();





