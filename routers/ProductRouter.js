const route = require('express').Router();
const productController = require('../controllers/ProductController');

route.get('/textQuery', productController.getProductByQuery)

route.post('/imageQuery', productController.getProductByImage)

route.get('/lastest', productController.getListNewProduct)

route.get('/:productId', productController.getProductDetail)

route.get('/', productController.getProductList)

route.post('/create', productController.create)

route.put('/:id', productController.update)



module.exports = route;