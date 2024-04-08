const express = require('express');
const router = express.Router();
const shopOwnerController = require('../app/controllers/ShopOwnerController');

function testMiddleware(req, res , next ) {
    console.log("Middleware is runingggggggggg");
    
}


router.post('/api/shop/login', shopOwnerController.handlerLogin)
router.post('/api/shop/register', shopOwnerController.handlerRegister)


module.exports = router;