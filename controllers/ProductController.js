const Product = require("../models/Product");
const Rating = require("../models/Rating");
const Like = require("../models/Like")
var mongoose = require('mongoose');

module.exports.create = async (req, res, next) => {
    try {
        const {productName, sellerId} = req.body
        const productInDB = await Product.findOne({productName, sellerId})
        if (productInDB) {
            return res.status(200).json({success: false, msg: 'duplicate product', doc: productInDB});
        }
        const product = new Product({...req.body});
        const savedProduct = await product.save();
        return res.status(200).json({success: true, msg: 'success', doc: savedProduct});
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'create seller fail'});
    }   
}

module.exports.getProductDetail = async (req, res, next) => {
    try {
        const id = req.params.productId
        let product = await Product.findById(id);
        return res.status(200).json({success: true, msg: 'success', doc: product});
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'get detail fail'});
    }
}

module.exports.getProductList = async (req, res, next) => {
    try {
        const limit = Math.max(10, req.params.page)
        const page = Math.max(0, req.params.page)
        let products = await Product.find({}).limit(limit).skip(page * limit).sort({rating: 'desc'});
        return res.status(200).json({success: true, msg: 'success', docs: products});
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'get detail fail'});
    }
}