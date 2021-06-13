const route = require('express').Router();
const OrderController = require('../controllers/OrderController');

//Create order
route.post('/create', OrderController.create)

//Update order status
route.put('/updateOrderItemStatus/:orderItemId', OrderController.updateOrderItemStatus)

// CUSTOMER
//Get active order list
route.get('/item/customer/:customerId', OrderController.getListItemCustomer)

//Get inactive order list (delivered or denied)
route.get('/item/customer/:customerId/:status', OrderController.getListItemCustomerByStatus)

//Customer cancel order
route.post('/item/customer/cancel', OrderController.customerCancelOrder)

// SELLER
//Get active order list
route.get('/item/seller/:sellerId', OrderController.getListItemSeller)

//Get inactive order list (delivered or denied)
route.get('/item/seller/:sellerId/:status', OrderController.getListItemSellerByStatus)

//Delete item
route.delete('/item/:orderItemId', OrderController.deleteOrderItem)

module.exports = route;