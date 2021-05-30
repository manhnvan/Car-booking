const route = require('express').Router();
const sellerController = require('../controllers/SellerController');

route.post('/create', sellerController.create)

route.post('/login', sellerController.login)

route.get('/:sellerId', sellerController.getInfo)

route.get('/:sellerId/customer/:customerId', sellerController.customerGetInfoSeller)

module.exports = route;