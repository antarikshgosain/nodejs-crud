const express = require('express')
const router = express.Router();
const Product = require('../models/product.model');
const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require('../controller/product.controller');

router.post('/', addProduct);
router.get('/all', getProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)

module.exports = router;
