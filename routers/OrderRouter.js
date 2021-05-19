const route = require('express').Router();
const OrderController = require('../controllers/OrderController');

route.post('/', OrderController.create)

route.put('/updateOrderItemStatus/:orderItemId', OrderController.updateOrderItemStatus)

route.get('/item/:sellerId/:status', OrderController.getListOrderItem)

route.delete('/item/:orderItemId', OrderController.deleteOrderItem)

module.exports = route;