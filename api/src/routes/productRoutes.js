'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug); // a rota tem q estar que nem no controler. req.params.slug
router.get('/admin/:id', controller.getById); // a rota tem q estar que nem no controler. req.params.id
router.get('/tags/:tag', controller.getByTag); // a rota tem q estar que nem no controler. req.params.tag
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
