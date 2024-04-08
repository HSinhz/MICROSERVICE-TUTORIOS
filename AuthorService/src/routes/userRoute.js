const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const { checkUserJWT } = require('../middleware/checkuserlogin');


router.post('/api/auth/login',  userController.handlerLogin);
router.get('home', checkUserJWT , userController.index);
module.exports = router;