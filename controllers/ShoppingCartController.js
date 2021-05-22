const { findOne } = require('../models/ShoppingCart');
const ShoppingCart = require('../models/ShoppingCart')

//Add product to cart
module.exports.adjustProductInCart = async (req, res, next) => {
    const {customerId, productId} = req.params;
    const {type} = req.body; // 1 or -1 or 0

    try {
        var cart = await ShoppingCart.findOne({customerId: customerId});
        if(!cart) cart = new ShoppingCart({customerId: customerId});
        const index = cart.items.findIndex(x => x.productId.toString() == productId);
        if(index > -1) {
            cart.items[index].amount = type == 0 ? 0 : (cart.items[index].amount + type)
            if(cart.items[index].amount <= 0) cart.items.splice(index,1)
        }
        else if(type == 1) cart.items = cart.items.concat({
            productId, 
            amount: 1
        })
        cart.save();
        return res.status(200).json({success: true, msg: 'product added to cart', data: cart});
    } catch(e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'failed to update product in cart'});
    }
} 
module.exports.getShoppingCart = async (req, res, next) => {
    const {customerId} = req.params
    try {
        var cart = await ShoppingCart.findOne({customerId: customerId}).populate('customerId').populate({path: 'items.productId', model: 'product', populate: {
            path: 'sellerId',
            model: 'seller',
            select: '-password'
        }})
        var newCart = cart.toObject()
        newCart.items.forEach(i => {
            const index = newCart.items.findIndex(x => x.shopName == i.productId.sellerId.shopName)
            if(index > -1) { //exist seller
                newCart.items[index] = newCart.items[index].products.concat(i.productId);
                newCart.items = newCart.items.splice(i,1)
            } 
            else{
                newCart.items = newCart.items.concat({
                    "shopName": i.productId.sellerId.shopName,
                    "products": [
                        {
                            "product": i.productId,
                            "amount": i.amount
                        }
                    ]
                }).splice(index,1)
            }
        });
        return res.status(200).json({success: true, msg: 'success to get shopping cart', data: newCart });
    } catch(e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'failed to get shopping cart'});
    }   
} 

module.exports.deleteAllProductInShop = async (req, res, next) => {
    const {customerId} = req.params
    var {listProduct} = req.body
    try{
        var cart = await ShoppingCart.findOne({customerId: customerId})
        cart.items = cart.items.filter(i => listProduct.findIndex(p => p == i.productId) == -1)
        cart.save()
        return res.status(200).json({success: true, msg: 'success to delete all product shop', data: cart});
    }
    catch(e){
        console.log(e)
        return res.status(400).json({success: false, msg: 'failed to delete all product in this shop'});
    }
}