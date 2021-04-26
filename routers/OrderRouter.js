const route = require('express').Router();
const OrderController = require('../controllers/OrderController');

route.post('/', OrderController.create)

route.put('/updateOrderItemStatus/:orderItemId', OrderController.updateOrderItemStatus)

module.exports = route;