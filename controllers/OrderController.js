const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

//Create order
module.exports.create = async (req, res, next) => {
    try {
        const {customer, orderItems, address} = req.body;
        const order = new Order({customer});
        const dataToInsert = orderItems.map(orderItem => {
            return {
                ...orderItem,
                address: address,
                orderId: order._id,
                customerId: customer
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

//Update order status
module.exports.updateOrderItemStatus = async (req, res, next) => {
    const { orderItemId } = req.params;
    const { status: newStatus } = req.body;
    var obj = {}
    obj[newStatus] = Date.now()
    obj["status"] = newStatus
    const listStatus = ["waiting", "processing", "shipping", "close", "denied"]
    const pos = listStatus.indexOf(newStatus)
    try {
        const currentItem = await OrderItem.findById(orderItemId)
        if((currentItem[newStatus] == null && currentItem[listStatus[pos-1]] != null) || pos == 4){
            const updated = await OrderItem.findByIdAndUpdate(orderItemId, obj, {new: true})
            return res.status(200).json({success: true, updated: updated})
        }
        else{
            return res.status(400).json({success: false, msg: 'invalid order status update'}); 
        } 
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, msg: 'fail to update order status'});
    }
}

// CUSTOMER
//Get active order list
module.exports.getListItemCustomer = async (req, res, next) => {
    const {customerId} = req.params;
    try {
        const orderItems = await OrderItem.find({customerId, close: null, denied: null}).populate('productId').populate('sellerId', '-password');
        return res.status(200).json({success: true, items: orderItems})
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'fail to get order item list'});
    }
}

//Get inactive order list (delivered or denied)
module.exports.getListItemCustomerByStatus = async (req, res, next) => {
    const {customerId, status} = req.params;
    try {
        const orderItems = await OrderItem.find({customerId, status}).populate('productId').populate('sellerId', '-password');
        return res.status(200).json({success: true, items: orderItems})
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'fail to get order item list'});
    }
}

//Customer cancel orderItem
module.exports.customerCancelOrder = async (req, res, next) => {
    const {orderItemId} = req.body;
    try {
        const orderItems = await OrderItem.findById(orderItemId);
        orderItems.status = "denied";
        orderItems.denied = Date.now();
        orderItems.save();
        return res.status(200).json({success: true, items: orderItems})
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'Không thể huỷ đơn'});
    }
}

// SELLER
//Get active order list
module.exports.getListItemSeller = async (req, res, next) => {
    const {sellerId} = req.params;
    try {
        const orderItems = await OrderItem.find({sellerId, close: null, denied: null}).populate('productId customerId').populate('sellerId', '-password');
        return res.status(200).json({success: true, items: orderItems})
    } catch (e) {
        return res.status(400).json({success: false, msg: 'fail to get order item list1'});
    }
}

//Get inactive order list (delivered or denied)
module.exports.getListItemSellerByStatus = async (req, res, next) => {
    const {sellerId, status} = req.params;
    try {
        const orderItems = await OrderItem.find({sellerId, status}).populate('productId customerId').populate('sellerId', '-password');
        return res.status(200).json({success: true, items: orderItems})
    } catch (e) {
        return res.status(400).json({success: false, msg: 'fail to get order item list1'});
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