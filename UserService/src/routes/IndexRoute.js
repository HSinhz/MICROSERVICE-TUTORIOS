const shopownerRoute = require('./shopOwnerRoute');
const managerRoute = require('./managerRoute');
const otpRoute = require('./otpRoute');


async function routes(app){
    app.use('/',shopownerRoute);
    app.use('/', managerRoute);
    app.use('/', otpRoute);
}
module.exports = routes;