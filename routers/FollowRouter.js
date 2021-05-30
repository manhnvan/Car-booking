const route = require('express').Router();
const followController = require('../controllers/FollowController');

route.post('/update', followController.followAction)

route.post('/check', followController.followCheck)

module.exports = route;