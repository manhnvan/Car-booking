const route = require('express').Router();
const customerController = require('../controllers/CustomerController');

route.post('/create', customerController.create)

module.exports = route;