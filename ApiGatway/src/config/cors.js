require("dotenv").config();

const configCors = ( app ) => {
    // Xử lý CORS
app.use( function( req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Witdh,content-type');
  
    //Set to true if you need the website to include cookies in the request sent to API ( e.g, in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next player of middleware
    next();
  })
}
 
module.exports = configCors;