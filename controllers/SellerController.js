const Seller = require("../models/Seller.js");
const Product = require("../models/Product.js");
const OrderItem = require("../models/OrderItem");
const Follow = require("../models/Follow");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.create = async (req, res, next) => {
    try {
        const phone = req.body.phone;
        const isSellerExist = await Seller.findOne({'phone': phone});
        if (isSellerExist) {
            return res.status(200).json({success: false, msg: 'duplicate phone number'})
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        const seller = new Seller({...req.body, password: hashPassword});
        const savedSeller = await seller.save();
        return res.status(200).json({success: true, msg: 'success', doc: savedSeller})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'create seller fail'})
    }   
}

module.exports.getInfo = async (req, res, next) => {
    try {
        const {sellerId} = req.params;
        const seller = await Seller.findById(sellerId);
        const waitingItem = await OrderItem.countDocuments({sellerId: sellerId, status: 'waiting'});
        const processingItem = await OrderItem.countDocuments({sellerId: sellerId, status: 'processing'});
        const shippingItem = await OrderItem.countDocuments({sellerId: sellerId, status: 'shipping'});
        const closeItem = await OrderItem.countDocuments({sellerId: sellerId, status: 'close'});
        const deniedItem = await OrderItem.countDocuments({sellerId: sellerId, status: 'denied'});
        return res.status(200).json({success: true, doc: {
            ...seller._doc,
            password: '',
            waitingItem,
            processingItem,
            shippingItem,
            closeItem,
            deniedItem
        }})
    } catch (e) {
        return res.status(400).json({success: false, msg: 'fail to get seller information'})
    }
    
}

module.exports.customerGetInfoSeller = async (req, res, next) => {
    try {
        var rating = 0;
        var rateAmount = 0;
        const {sellerId, customerId} = req.params;
        const p1 = new Promise((res, rej) => {
            Seller.findById(sellerId).select('-password').then((value) => res(value))
        })
        const p2 = new Promise((res, rej) => {
            Product.find({sellerId: sellerId}).then((value) => res(value))
        })

        const p3 = new Promise((res, rej) => {
            Follow.findOne({sellerId, customerId}).then((value) => value ? res(true) : res(false))
        })
        const [seller, listProduct, follow] = await Promise.all([p1, p2, p3])
        listProduct.forEach(p => {
            if(p.rating != 0){
                rateAmount += 1
                rating += p.rating/listProduct.length()
            }
        })
        return res.status(200).json({success: true, doc: {
            ...seller._doc,
            rating: rating.toFixed(1),
            rateAmount: rateAmount,
            isFollowed: follow,
            products: listProduct
        }})
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'fail to get seller information'})
    }
    
}

module.exports.login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        console.log('user login in');

        // Checking if the email is not exist
        const seller = await Seller.findOne({ phone });
        if (!seller) return res.status(200).json({ success: false, msg: "Tài khoản hoặc mật khẩu không đúng" });

        // Checking Password is correct
        const validPassword = await bcrypt.compare(password, seller.password);
        if (!validPassword) {
            res.status(200).json({ success: false, msg: "Tài khoản hoặc mật khẩu không đúng" });
            return;
        }

        //Create and assign a token 
        res.status(200).json({
            ...seller._doc, 
            password: '',
            success: true
        });
    } catch (e) {
        console.log(e)
        res.status(400).json({
            success: false
        });
    }
}