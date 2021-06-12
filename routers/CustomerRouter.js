const route = require('express').Router();
const customerController = require('../controllers/CustomerController');

route.post('/create', customerController.create)

route.post('/login', customerController.login)

route.post('/:customerId/update/password', customerController.changePassword)

route.get('/:customerId/getInfo', customerController.getInfo)

route.post('/:customerId/update/info', customerController.updateInfo)

module.exports = route;