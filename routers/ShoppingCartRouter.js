const route = require('express').Router();
const shoppingCartController = require('../controllers/ShoppingCartController');

//Adjust product in cart (increase/decrease/remove one product)
route.post('/customer/:customerId/update/:productId', shoppingCartController.updateProductInCart)

//Update state of multi product in cart
route.put('/customer/:customerId/update/state', shoppingCartController.updateMultiProductStateInCart)

//Get product from cart by customerId
route.get('/customer/:customerId/getCart', shoppingCartController.getShoppingCart)

//Delete all product in cart from 1 seller
route.post('/customer/:customerId/deleteAll', shoppingCartController.deleteAllProductInShop)


module.exports = route;