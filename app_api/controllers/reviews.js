var utils = require('./utils');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var doAddReview = function(req, res, location) {
    if (!location) {
        utils.sendJsonResponse(res, 404, {
            "message": "locationid not found"
        });
    } else {
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save(function(err, location) {
            var thisReview;
            if (err) {
                utils.sendJsonResponse(res, 400, err);
            } else {
                updateAverageRating(location._id);
                thisReview = location.reviews[location.reviews.length - 1];
                utils.sendJsonResponse(res, 201, thisReview);
            }
        });
    }
};

var updateAverageRating = function(locationid) {
    Loc.findById(locationid).select('rating reviews')
        .exec(function(err, location) {
            if (!err) {
                doSetAverageRating(location);
            }
        });
};

var doSetAverageRating = function(location) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;

        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }

        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        location.save(function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log("Average rating updated to", ratingAverage);
            }
        });
    }
};

module.exports.reviewsCreate = function(req, res) {
    var locationid = req.params.locationid;
    if (locationid) {
        Loc.findById(locationid).select('reviews')
            .exec(function(err, location) {
                if (err) {
                    utils.sendJsonResponse(res, 400, err);
                } else {
                    doAddReview(req, res, location);
                }
            });
    } else {
        utils.sendJsonResponse(res, 404, {
            "message": "Not found, locationid required"
        });
    }
};

module.exports.reviewsReadOne = function(req, res) {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc.findById(req.params.locationid)
            .select('name reviews')
            .exec(function(err, location) {
                var response, review;

                if (!location) {
                    utils.sendJsonResponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                } else if (err) {
                    utils.sendJsonResponse(res, 404, err);
                    return;
                }

                if (location.reviews && location.reviews.length > 0) {
                    review = location.reviews.id(req.params.reviewid);
                    if (!review) {
                        utils.sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationid
                            },
                            review: review
                        };
                        utils.sendJsonResponse(res, 200, response);
                    }
                } else {
                    utils.sendJsonResponse(res, 404, {
                        "message": "No reviews found"
                    });
                }

            });
    } else {
        utils.sendJsonResponse(res, 404, {
            "message": "Not found, locationid and reviewid are both required"
        });
    }
};

module.exports.reviewsUpdateOne = function(req, res) {
    utils.sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.reviewsDeleteOne = function(req, res) {
    utils.sendJsonResponse(res, 200, { "status": "success" });
};
