const ShopOwner = require('../app/models/ShopOwner');


async function checkShopOwner( id){
    const shopOwner = await ShopOwner.findOne(  {_id: id} );
    let data = {}
    if( shopOwner) {
        data = {
            Success: true,
            Mess: 'User is required',
        }
    }  else {
        data = { 
            Success: false,
            Mess: 'ShopOwner is not required'
        }
    }
    return data;
}

module.exports = {
    checkShopOwner: checkShopOwner,
}