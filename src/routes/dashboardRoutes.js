const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers/dashboardControllers');




router.get('/', dashboardController);


module.exports = router;