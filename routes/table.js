const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const auth = require('../middleware/auth');
// User Signup
router.post('/',auth, tableController.createTable);
router.get('/',auth, tableController.getTables);

// User Login
router.put('/',auth, tableController.updateTableWithNumbers);
router.get('/:tableId',auth,tableController.getTableById);

module.exports = router;
