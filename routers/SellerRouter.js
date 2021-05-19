const route = require('express').Router();
const sellerController = require('../controllers/SellerController');

route.post('/create', sellerController.create)

route.post('/login', sellerController.login)

module.exports = route;