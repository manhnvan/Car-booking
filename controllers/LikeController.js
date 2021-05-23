const Like = require('../models/Like')
const Product = require('../models/Product')

module.exports.likeAction = async (req, res, next) => {
    try {
        const {product, user} = req.body;
        const liked = await Like.findOne({product, user});
        if (liked) {
            await Like.deleteOne({product, user});
        } else {
            const like = new Like({product, user});
            savedLike = await like.save();
        }  
        const totalLikeOfProduct = await Like.count({product: product})
        await Product.findOneAndUpdate({_id: product}, {like: totalLikeOfProduct});
        return res.status(200).json({success: true, totalLikeOfProduct: totalLikeOfProduct, product: product})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'fail'})
    }
}