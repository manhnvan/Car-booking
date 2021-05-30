const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const ShoppingCart = require("../models/ShoppingCart");
const saltRounds = 10;

module.exports.create = async (req, res, next) => {
    try {
        const phone = req.body.phone;
        const isExist = await Customer.findOne({'phone': phone});
        if (isExist) {
            return res.status(200).json({success: false, msg: 'Số điện thoại đã được sử dụng bởi một tài khoản khác'})
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        const customer = new Customer({...req.body, password: hashPassword});
        const newCart = new ShoppingCart({customerId: customer._id});
        newCart.save()
        const savedCustomer = await customer.save();
        return res.status(200).json({success: true, msg: 'success', doc: savedCustomer})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'})
    }   
}

module.exports.login = async (req, res, next) => {
    try {
        const {phone, password} = req.body;
        const customer = await Customer.findOne({phone});
        if (!customer) {
            return res.status(200).json({success: false, msg: "Tài khoản hoặc mật khẩu không đúng"})
        }
        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) {
            return res.status(200).json({success: false, msg: "Tài khoản hoặc mật khẩu không đúng"})
        }
        return res.status(200).json({
            ...customer._doc, 
            password: '',
            success: true
        }); 
    }  catch (error) {
        console.log(error);
        return res.status(400).json({success: false, msg: 'Đăng nhập thất bại'})
    }
}

module.exports.getInfo = async (req, res, next) => {
    const {customerId} = req.params
    try {
        const customer = await Customer.findById(customerId).select('-password')
        console.log(customer)
        if (!customer) {
            return res.status(200).json({success: false, msg: "Lỗi khi tải thông tin cá nhân"})
        }
        return res.status(200).json({
            ...customer._doc, 
            success: true
        }); 
    }  catch (error) {
        console.log(error);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'})
    }
}