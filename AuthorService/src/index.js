const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
require("dotenv").config();
const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, 'public')));
const routes = require( './routes/IndexRoute');

// kết nối với dtb ở đây
const db = require('./config/db/config');
db.connect();

app.get( '/' , ( req, res ) => {
  res.send("DThis is AuthorService")
})

// Xử lý dũ liệu từ form subbmit lên bằng phương thức POST
app.use(express.urlencoded(
  {
    extended: true
  }
));
app.use(express.json());
app.use(methodOverride('_method'))

routes(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})