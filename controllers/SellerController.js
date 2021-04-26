const Seller = require("../models/Seller.js");
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