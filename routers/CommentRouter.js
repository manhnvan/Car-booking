const route = require('express').Router();
const commentController = require('../controllers/CommentController');

route.post('/create', commentController.create)


module.exports = route;