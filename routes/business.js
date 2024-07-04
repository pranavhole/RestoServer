const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const auth = require('../middleware/auth');

// Business Create
router.post('/', auth, businessController.createBusiness);
router.get('/', auth, businessController.getBusness);
router.post('/project',auth,businessController.createProjectUnderBusiness);
router.post('/embededlink',auth,businessController.generateWabaLink)
module.exports = router;
