const express = require('express');
const router = express.Router();
const ManagerPermissionController = require('../app/controllers/ManagerPermissionController');


router.post('/api/createemployee', ManagerPermissionController.createEmployee);  // Còn thiếu middleware để xem người dùng đã đăng nhập chưa
router.get('/api/Employee' , ManagerPermissionController.managerRole);
router.put('/api/updateemploy/:id', ManagerPermissionController.updateEmploy);  
router.delete('/api/deleteemploy/:id', ManagerPermissionController.deleteEmployee)
module.exports = router;