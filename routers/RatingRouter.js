const route = require('express').Router();
const ratingController = require('../controllers/RatingController');

route.post('/', ratingController.rateAction)

route.post('/check', ratingController.checkRate)

module.exports = route;