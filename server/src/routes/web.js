const express = require('express');
const { getHomepage, getTest } = require('../controllers/home.controller');

const router = express.Router();

router.post('/test', getTest)
router.get('/', getHomepage)



module.exports = router;
