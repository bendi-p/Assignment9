var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.post('/create', userCtrl.createUser);
router.delete('/delete', userCtrl.deleteUser);
router.put('/update', userCtrl.updateUser);
router.get('/getAll', userCtrl.getAllUsers);
router.post('/login', userCtrl.login);

module.exports = router;