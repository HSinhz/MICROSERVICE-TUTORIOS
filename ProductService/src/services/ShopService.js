require("dotenv").config();

const ShopOwner = require('../app/models/ShopOwner');


async function createShopOwner( Name, Email, Password, Phone, Address, Gender, ShopName, ShopAddress ,Scope) {
    return new Promise( async (resolve, reject) => {
        try {
            let data = {};
            let existShopOwner = await ShopOwner.findOne({Email});
            if(existShopOwner) { 
                data = {
                    ER : false,
                    MES : "Account is exist"
                }
            } else {
                const shopOwner = new ShopOwner({
                    Name: Name,
                    Email: Email, 
                    Password: Password, 
                    Phone: Phone, 
                    Address: Address, 
                    Gender: Gender, 
                    Shop_Name: ShopName, 
                    Shop_Address: ShopAddress ,
                    Scope: Scope
                })
                let document = await shopOwner.save();
                data = { ER: true, MES: "Successfully Created Shop"}
                console.log(`Account Successfully Created with id: ${document._id.toString()}`)
            }
            resolve( data ) 
        } catch ( error ){
            reject(error);
        }
    })
}


module.exports = {
    createShopOwner: createShopOwner,
    
}