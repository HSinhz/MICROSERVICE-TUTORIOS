const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// detailsController.index

router.get('/test', userController.show);
router.post('/register', userController.register);




module.exports = router;