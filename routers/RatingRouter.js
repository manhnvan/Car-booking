const route = require('express').Router();
const ratingController = require('../controllers/RatingController');

route.post('/', ratingController.rateAction)

module.exports = route;