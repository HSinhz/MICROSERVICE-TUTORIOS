const path = require('path');
const express = require('express');
const { createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');
const proxy = require('express-http-proxy');
const methodOverride = require('method-override');
require("dotenv").config();
const routes = require( './routes/IndexRoute')
const app = express();
const port = 9000;
const configCors = require('./config/cors');




// http://127.0.0.1.9000/UserService => http://127.0.0.1.3000/
// app.use('/UserService', createProxyMiddleware({
//   target:'http://localhost:3000',
//   pathRewrite: {
//     '^/UserService' : ''
//   }
// }))

// // http://127.0.0.1.9000/UserService => http://127.0.0.1.3001/
// app.use('/AuthorService', createProxyMiddleware({
//   target:'http://localhost:3001',
//   pathRewrite: {
//     '^/AuthorService' : ''
//   }
// }))

configCors(app);

app.use(express.static(path.join(__dirname, 'public')));
// kết nối với dtb ở đây
const db = require('./config/config');
// Connect to DB
db.connect();

// Xử lý dũ liệu từ form subbmit lên bằng phương thức POST
app.use(express.urlencoded(
  {
    extended: true
  }
));
app.use(express.json());
app.use(methodOverride('_method'))
// app.use(cors());

// app.use('/UserService', proxy('http://localhost:9000'));  
// app.use('/AuthorService', proxy('http://localhost:3001'));



routes(app);




app.listen(port, () => {
  console.log(`API gateway listening on port http://localhost:${port}`);
})