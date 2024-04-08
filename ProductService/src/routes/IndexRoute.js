const shopownerRoute = require('./shopOwnerRoute');
const managerRoute = require('./managerRoute');

function route(app){
    app.use('/shopowner',shopownerRoute);
    app.use('/manager', managerRoute); // Phân quyền cho route này. Của chủ shop
}
module.exports = route;