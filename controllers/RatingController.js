const Rating = require('../models/Rating')
const Product = require('../models/Product')

module.exports.rateAction = async (req, res, next) => {
    try {
        const {product, star, customerId} = req.body;
        const rating = await Rating.findOne({product, customerId});
        let savedRating;
        if (rating) {
            rating.star = star;
            savedRating = await rating.save();
        } else {
            const rate = new Rating({product, star, customerId});
            savedRating = await rate.save();
        }  
        const rateListOfProduct = await Rating.find({product: product});
        const averageRate = rateListOfProduct.reduce((a, b) => a + b.star, 0) / rateListOfProduct.length;
        await Product.findOneAndUpdate({_id: product}, { rating: averageRate });
        return res.status(200).json({success: true, averageRate: averageRate, product: product})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'fail'})
    }
}

module.exports.checkRate = async (req, res, next) => {
    try {
        const {product, customerId} = req.body;
        const rating = await Rating.findOne({product, customerId});
        if(rating) {
            return res.status(200).json({success: true, rate: rating.star})
        }
        else return res.status(200).json({success: true, rate: 0})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'fail'})
    }
}