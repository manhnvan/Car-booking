const ShoppingCart = require('../models/ShoppingCart')

//Update product in cart
module.exports.updateProductInCart = async (req, res, next) => {
    const {customerId, productId} = req.params;
    const {type = null, checked = true} = req.body; // 1 or -1 or 0
    try {
        var cart = await ShoppingCart.findOne({customerId: customerId});
        if(!cart) cart = new ShoppingCart({customerId: customerId});
        const index = cart.items.findIndex(x => x.productId.toString() == productId);
        if(index > -1) {
            cart.items[index].checked = checked 
            if(type != null) cart.items[index].amount = type == 0 ? 0 : (cart.items[index].amount + type)
            if(cart.items[index].amount <= 0) cart.items.splice(index,1)
        }
        else if(type == 1) cart.items = cart.items.concat({
            productId, 
            amount: 1
        })
        cart.save();
        return res.status(200).json({success: true, msg: 'product updated successfully', data: cart});
    } catch(e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'failed to update product in cart'});
    }
}

//Update state of multi product in cart
module.exports.updateMultiProductStateInCart = async (req, res, next) => {
    const {customerId} = req.params;
    const {listProductId, checked} = req.body;
    try {
        var cart = await ShoppingCart.updateMany({customerId: customerId, "items.productId": {$in: listProductId}}, {$set: {'items.$[].checked': checked}});
        console.log(cart)
        return res.status(400).json({success: true, msg: 'product updated successfully', data: cart});
    } catch(e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'failed to update product in cart'});
    }
} 

//Get shopping cart product
module.exports.getShoppingCart = async (req, res, next) => {
    const {customerId} = req.params
    try {
        var cart = await ShoppingCart.findOne({customerId: customerId}).populate('customerId', '-password').populate({path: 'items.productId', model: 'product', populate: {
            path: 'sellerId',
            model: 'seller',
            select: '-password'
        }})
        var newCart = cart.toObject()
        for(var p = 0; p < newCart.items.length; p++) {
            const i = newCart.items[p]
            const index = newCart.items.findIndex(x => x.shopName == i.productId.sellerId.shopName)
            if(index > -1) { //exist seller
                newCart.items[index].products.push({
                    "product": i.productId,
                    "amount": i.amount,
                    "checked": i.checked
                });
                newCart.items.splice(p,1)
                p-=1
            } 
            else{
                newCart.items.unshift({
                    "shopName": i.productId.sellerId.shopName,
                    "avatar": i.productId.sellerId.avatar,
                    "products": [
                        {
                            "product": i.productId,
                            "amount": i.amount,
                            "checked": i.checked
                        }
                    ]
                })
                newCart.items.splice(p+1,1)
            }
        };
        return res.status(200).json({success: true, msg: 'success to get shopping cart', data: newCart });
    } catch(e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'failed to get shopping cart'});
    }   
} 

//Delete all product from one shop in cart
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