const route = require('express').Router();
const customerController = require('../controllers/CustomerController');

route.post('/create', customerController.create)

route.post('/login', customerController.login)

route.get('/:customerId/getInfo', customerController.getInfo)

module.exports = route;