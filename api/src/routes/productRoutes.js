'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug); // a rota tem q estar que nem no controler. req.params.slug
router.get('/admin/:id', controller.getById); // a rota tem q estar que nem no controler. req.params.id
router.get('/tags/:tag', controller.getByTag); // a rota tem q estar que nem no controler. req.params.tag
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
