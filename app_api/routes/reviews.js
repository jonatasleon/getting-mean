var express = require('express');
var router = express.Router();

var ctrlReviews = require('../controllers/reviews');

// reviews
router.post('/', ctrlReviews.reviewsCreate);
router.get('/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;