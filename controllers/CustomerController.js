const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.create = async (req, res, next) => {
    try {
        const phone = req.body.phone;
        const isExist = await Customer.findOne({'phone': phone});
        if (isExist) {
            return res.status(200).json({success: false, msg: 'duplicate phone number'})
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        const customer = new Customer({...req.body, password: hashPassword});
        const savedCustomer = await customer.save();
        return res.status(200).json({success: true, msg: 'success', doc: savedCustomer})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'create seller fail'})
    }   
}