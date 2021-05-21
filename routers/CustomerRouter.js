const route = require('express').Router();
const customerController = require('../controllers/CustomerController');

route.post('/create', customerController.create)

route.post('/login', customerController.login)

module.exports = route;