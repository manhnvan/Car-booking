const Comment = require("../models/Comment");

module.exports.create = async (req, res, next) => {
    try {
        const comment = new Comment({...req.body});
        const savedComment = comment.save()
        return res.status(200).json({success: true, msg: 'success', doc: savedComment})
    } catch(e) {
        console.log(e);
        return res.status(400).json({success: false, msg: 'create seller fail'})
    }   
}