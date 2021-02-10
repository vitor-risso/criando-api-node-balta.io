'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

router.post('/', authService.authorize, controller.post);
router.get('/', controller.get);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;
