const shopService = require('../../services/ShopService')


class ShopOwnerController {
    // [POST] /shopowner/api/shop/login
    handlerLogin( req, res, next){
        res.status(201).json("Người dùng đã đăng nhập");
    }

    async handlerRegister( req, res, next){
        const { Name, Email, Password, Phone, Address, Gender, ShopName, ShopAddress ,Scope } = req.body;
        if( !Name || !Email || !Password || !Phone || !Address || !Gender || !ShopName || !ShopAddress ||!Scope ){
            return res.status(400).json({
                Success : false,
                Data: ""
            })
        }
        let data = await shopService.createShopOwner(Name, Email, Password, Phone, Address, Gender, ShopName, ShopAddress ,Scope);
        return res.status(201).json( {data: data});
    }
    

    
}

module.exports = new ShopOwnerController;