const route = require('express').Router();
const sellerController = require('../controllers/SellerController');

route.post('/create', sellerController.create)

module.exports = route;