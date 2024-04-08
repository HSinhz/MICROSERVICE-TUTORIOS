const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const {CreateChannel} = require('./util/index')
require("dotenv").config();
const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL, EXCHANGE_NAME, USER_SERVICE} = require('./config/db/rabitMQ');
const routes = require( './routes/IndexRoute');
const db = require('./config/db/config');

const StartServer =  async () => {
  const port = 9001;
  const app = express();
  app.use(express.static(path.join(__dirname, 'public')));
  db.connect();
  // app.get( '/' , ( req, res ) => {
  //   res.send("DThis is UserService")
  // })

  // app.get( '/test' , ( req, res ) => {
  //   res.send("DThis is UserService Tesst")
  // })


  // Xử lý dũ liệu từ form subbmit lên bằng phương thức POST
  app.use(express.urlencoded(
    {
      extended: true
    }
  ));
  app.use(express.json());
  app.use(methodOverride('_method'))
  const connection = await amqplib.connect(MESSAGE_BROKER_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, "direct", {durable: false});

  const { queue } = await  channel.assertQueue('', {exclusive: true});
  console.log( 'Queue: ', queue);

  channel.bindQueue( queue.queue, EXCHANGE_NAME, USER_SERVICE);
  channel.consume( queue.queue, msg => {
    let message = JSON.parse(msg.content.toString())
      console.log('Received: ', message); 
      console.log('Routingkey = ', msg.fields.routingKey);
  },{
    noAck: true
  }) 


  routes(app);

  app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
  })

}


// Run UserService 
StartServer();