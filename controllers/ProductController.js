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
        product.hiddenCategories = req.body.hiddenCategories;
        const savedProduct = await product.save();
        return res.status(200).json({success: true, msg: 'success', doc: savedProduct});
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }   
}

module.exports.update = async (req, res, next) => {
    try {
        const {id} = req.params
        const productInDB = await Product.findByIdAndUpdate(id, {...req.body});
        return res.status(200).json({success: true, msg: 'success', doc: productInDB});
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }   
}

module.exports.getProductDetail = async (req, res, next) => {
    try {
        const id = req.params.productId
        let product = await Product.findOne({_id: id}).populate('sellerId', '-password');
        const isLiked = await Like.findOne({
            product : id,
            user: req.headers.authorization
            
        })
        return res.status(200).json({success: true, msg: 'success', doc: product, isLiked: isLiked != null});
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }
}

module.exports.getProductList = async (req, res, next) => {
    try {
        const limit = Math.max(10, req.query.limit)
        const page = Math.max(0, req.query.page)
        const sellerId = req.query.sellerId;
        if (sellerId) {
            let products = await Product.find({sellerId}).limit(limit).skip(page * limit);
            return res.status(200).json({success: true, msg: 'success', docs: products});
        } else {
            let products = await Product.find().limit(limit).skip(page * limit).sort({rating: 'desc'});
            return res.status(200).json({success: true, msg: 'success', docs: products});
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }
}

module.exports.getListNewProduct = async (req, res, next) => {
    try {
        const limit = Math.max(10, req.query.limit)
        const page = Math.max(0, req.query.page)
        let products = await Product.find().limit(limit).skip(page * limit).sort({created: 'desc'});
        return res.status(200).json({success: true, msg: 'success', docs: products});
    } catch (e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }
}

module.exports.getProductByQuery = async (req, res, next) => {
    try {
        const textQuery = req.query.q;
        if (textQuery) {
            const products = await Product.find({
                $text: {
                    $search: textQuery
                }
            })
            return res.status(200).json({success: true, msg: 'success', docs: products});
        } else {
            let products = await Product.find().limit(10).sort({rating: 'desc'});
            return res.status(200).json({success: true, msg: 'success', docs: products});
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }
}

module.exports.getProductByImage = async (req, res, next) => {
    try {
        const textQuery = req.body.query;
        if (textQuery) {
            var queryString = `\"\"${textQuery.join("\"\"")}\"\"`;
            console.log(queryString)
            const products = await Product.find({
                $text: {
                    $search: queryString
                }
            })
            return res.status(200).json({success: true, msg: 'success', docs: products});
        } else {
            let products = await Product.find().limit(10).sort({rating: 'desc'});
            return res.status(200).json({success: true, msg: 'success', docs: products});
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'});
    }
}