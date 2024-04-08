const shopService = require('../../services/ShopService')

class ShopOwnerController {
    
    async handlerRegister( req, res, next){
        const { Name, Email, Password, Phone, Address, Gender, ShopName, ShopAddress  } = req.body;
        if( !Name || !Email || !Password || !Phone || !Gender ||!Address || !ShopName || !ShopAddress ){
            return res.status(400).json({
                Success : false,
                Data: ""
            })
        }
        let data = await shopService.createShopOwner(Name, Email, Password, Phone, Address, Gender, ShopName, ShopAddress );
        if( data.ER ){
            res.redirect(`/api/verify/${data.url}`);
        } else {
            return res.status(201).json( {data: data});
        }
    }
    
    async showProfile( req, res, next ){
        let id = req.params.id;
        let data = await shopService.getProfileShopOwner( id );
        if( data.Success ){
            return res.status(201).json( data );
        } 
        return res.status(400).json( data );
    }

    async updateProfile( req, res, next ){
        const { Name , Phone } = req.body;
        if( !Name || !Phone  ){
            return res.status(400).json({
                Success : false,
                Data: ""
            })
        }
        let data = await shopService.updateProfileShopOwner(req.params.id, req.body );
        if( data.Success ){
            return res.status(201).json( data );
        }
        return res.status(400).json(data);  
    }
    
    async deleteProfile( req, res, next ){
        let data = await shopService.deleteProfile( req.params.id);
        if( data.Success ){
            return res.status(201).json( data );
        }
        return res.status(400).json(data); 
    }

    async updatePassword( req, res, next ){
        let { Oldpass, Newpass, ConfirmNewPass } = req.body;
        if( !Oldpass || !Newpass || !ConfirmNewPass ){
            return res.status(400).json({
                Success : false,
                Mess: 'Please enter complete information'
        })}
        let data = await shopService.updatePass( req.params.id, Oldpass, Newpass, ConfirmNewPass);
        if( data.Success ){
            return res.status(201).json( data );
        }
        return res.status(400).json(data); 
    }
}

module.exports = new ShopOwnerController;