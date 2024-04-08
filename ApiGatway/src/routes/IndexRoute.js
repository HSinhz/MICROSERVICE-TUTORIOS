const apiRoute = require('./apiRoute');

function route(app){
    
    app.use('/api/v1', apiRoute);
    
}
module.exports = route;