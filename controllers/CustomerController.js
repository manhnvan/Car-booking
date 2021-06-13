const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const ShoppingCart = require("../models/ShoppingCart");
const Follow = require("../models/Follow");
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

module.exports.changePassword = async (req, res, next) => {
    const {customerId} = req.params
    try {
        const {oldPassword, newPassword} = req.body;
        const customer = await Customer.findById(customerId);
        if (customer) {
            const validPassword = await bcrypt.compare(oldPassword, customer.password);
            if(validPassword) {
                const hashPassword = await bcrypt.hash(newPassword, saltRounds);
                customer.password = hashPassword
                await customer.save();
                return res.status(200).json({success: true, msg: 'Đổi mật khẩu thành công'})
            }
            return res.status(200).json({success: false, msg: 'Mật khẩu cũ không đúng'})
        }
        return res.status(200).json({success: false, msg: 'Không tìm thấy tài khoản'})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'})
    }   
}

module.exports.getInfo = async (req, res, next) => {
    const {customerId} = req.params
    try {
        const p1 = new Promise((res,rej) => 
                Customer.findById(customerId).select('-password').then((value) => res(value))
            )
        const p2 = new Promise((res,rej) => 
                Follow.find({customerId: customerId}).populate('sellerId', '-password').then((value) => res(value))
            )
        const [customer, listFollow] = await Promise.all([p1,p2])
        if (!customer) {
            return res.status(200).json({success: false, msg: "Lỗi khi tải thông tin cá nhân"})
        }
        return res.status(200).json({
            ...customer._doc,
            listFollow: listFollow, 
            success: true
        }); 
    }  catch (error) {
        console.log(error);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'})
    }
}



module.exports.updateInfo = async (req, res, next) => {
    const {customerId} = req.params
    const user = req.body
    try {
        const p1 = new Promise((res,rej) => 
                Customer.findById(customerId).select('-password').then((value) => res(value))
            )
        const p2 = new Promise((res,rej) => 
                Customer.findOne({"phone": user.phone}).then((value) => res(value))
            )
        var [findId, findPhone] = await Promise.all([p1,p2])
        if(findId){
            if ((findPhone && findPhone._id == customerId) || !findPhone) {
                findId.avatar = user.avatar;
                findId.username = user.username;
                findId.phone = user.phone;
                findId.address = user.address;
                await findId.save()
                res.status(200).json({success: true, msg: 'Thay đổi thông tin thành công', doc: findId})
            }
            else{
                res.status(200).json({success: false, msg: 'Số điện thoại này đã tồn tại'})
            } 
        }
        else return res.status(200).json({success: false, msg: 'Không tìm thấy tài khoản'})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'Đã có lỗi xảy ra'})
    }   
}
