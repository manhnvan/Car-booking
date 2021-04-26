const route = require('express').Router();
const likeController = require('../controllers/LikeController');

route.post('/', likeController.likeAction)

module.exports = route;