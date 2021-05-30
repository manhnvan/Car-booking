const Follow = require('../models/Follow')

module.exports.followAction = async (req, res, next) => {
    try {
        const {sellerId, customerId} = req.body;
        const follow = await Follow.findOne({sellerId, customerId})
        if(follow){
            const result = await Follow.deleteOne({sellerId, customerId})
            return res.status(200).json({success: true, data: result})
        }
        else {
            const follow = new Follow({sellerId, customerId});
            follow.save();
            return res.status(200).json({success: true, data: follow })
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Không thể thực hiện yêu cầu'})
    }
}

module.exports.followCheck = async (req, res, next) => {
    try {
        const {sellerId, customerId} = req.body;
        const follow = await Follow.findOne({sellerId, customerId})
        if(follow){
            return res.status(200).json({success: true, data: {
                "found": true
            }})
        }
        else {
            return res.status(200).json({success: true, data: {
                "found": false
            } })
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Không thể thực hiện yêu cầu'})
    }
}