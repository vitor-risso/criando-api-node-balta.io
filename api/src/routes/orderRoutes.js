'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller')

router.post('/', controller.post);
router.get('/', controller.get);
router.delete('/:id', controller.delete);

module.exports = router;
