const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

module.exports.create = async (req, res, next) => {
    try {
        const {customer, orderItems, address} = req.body;

        const order = new Order({customer});
        const dataToInsert = orderItems.map(orderItem => {
            return {
                ...orderItem,
                address: address,
                orderId: order._id
            }  
        })
        const insertedMany = await OrderItem.insertMany(dataToInsert);
        await order.save();
        return res.status(200).json({success: true, msg: 'success to insert multi', data: insertedMany});
    } catch(e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'fail to create order'});
    }
} 

module.exports.updateOrderItemStatus = async (req, res, next) => {
    const { orderItemId } = req.params;
    const { status } = req.body;
    try {
        const updated = await OrderItem.findByIdAndUpdate(orderItemId, {status: status})
        return res.status(200).json({success: true, updated: updated})
    } catch (error) {
        return res.status(400).json({success: false, msg: 'fail to update order status'});
    }
}

module.exports.getListOrderItem = async (req, res, next) => {
    const {sellerId, status} = req.params;
    try {
        const orderItems = await OrderItem.find({sellerId, status}).populate('productId');
        return res.status(200).json({success: true, items: orderItems})
    } catch (e) {
        return res.status(400).json({success: false, msg: 'fail to get order item list'});
    }
}

module.exports.deleteOrderItem = async (req, res, next) => {
    const {orderItemId} = req.params;
    try {
        const deleted = await OrderItem.findByIdAndDelete(orderItemId);
        return res.status(200).json({success: true, deleted: deleted});
    } catch (error) {
        return res.status(400).json({success: false, msg: 'fail to delete order item'});
    }
}

module.exports.getOrder