const route = require('express').Router();
const commentController = require('../controllers/CommentController');

route.post('/', commentController.create)

module.exports = route;