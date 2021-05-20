const route = require('express').Router();
const productController = require('../controllers/ProductController');

route.get('/:productId', productController.getProductDetail)

route.get('/', productController.getProductList)

route.post('/create', productController.create)

route.put('/:id', productController.update)



module.exports = route;