// routes/api.js
const express = require('express');
const router = express.Router();
const { authenticateManager, generateReport } = require('../controllers/managerControllers');

// Manager login route
router.post('/login', authenticateManager);

// Generate report route
router.post('/generate-report', generateReport);

module.exports = router;
