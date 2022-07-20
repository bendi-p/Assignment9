var express = require('express');
var router = express.Router();
var userRoutes = require('../services/user-service/routes/index');

router.use('/user', userRoutes);

module.exports = router;