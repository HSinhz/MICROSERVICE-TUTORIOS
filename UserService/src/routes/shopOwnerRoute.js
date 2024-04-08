const express = require('express');
const router = express.Router();
const shopOwnerController = require('../app/controllers/ShopOwnerController');
const { confirmNewPass} = require('../middleware/MDWshopowenr')
router.post('/api/shopowner/register', shopOwnerController.handlerRegister);
router.get('/api/shopowner/show/:id', shopOwnerController.showProfile);
router.put('/api/shopowner/:id/update',shopOwnerController.updateProfile);
router.delete('/api/shopowner/:id/delete',shopOwnerController.deleteProfile);
router.put('/api/shopowner/:id/update/password', confirmNewPass, shopOwnerController.updatePassword);


module.exports = router;