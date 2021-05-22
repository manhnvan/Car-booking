const route = require('express').Router();
const shoppingCartController = require('../controllers/ShoppingCartController');

//Adjust product in cart (increase/decrease/remove one product)
route.post('/customer/:customerId/add/:productId', shoppingCartController.adjustProductInCart)

//Get product from cart by customerId
route.get('/customer/:customerId/getCart', shoppingCartController.getShoppingCart)

//Delete all product in cart from 1 seller
route.post('/customer/:customerId/deleteAll', shoppingCartController.deleteAllProductInShop)


module.exports = route;