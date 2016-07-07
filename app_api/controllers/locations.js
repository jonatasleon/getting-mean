var utils = require('./utils');
var theEarth = require('./theEarth');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.locationsListByDistance = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(20),
        num: 10
    };

    if (!lat || !lng) {
        utils.sendJsonResponse(res, 404, {
            "message": "lat and lng query parameters are required"
        });
        return;
    }

    Loc.geoNear(point, geoOptions, function(err, results, stats) {
        var locations = [];
        if (err) {
            utils.sendJsonResponse(res, 404, err);
        } else {
            results.forEach(function(doc) {
                locations.push({
                    distance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            utils.sendJsonResponse(res, 200, locations);
        }
    });
};

module.exports.locationsCreate = function(req, res) {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: (req.body.facilities || "").split(","),
        coords: [parseFloat(req.body.lat), parseFloat(req.body.lng)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2,
        }]
    }, function(err, location) {
        if (err) {
            utils.sendJsonResponse(res, 404, err);
        } else {
            utils.sendJsonResponse(res, 200, location);
        }
    });
};

module.exports.locationsReadOne = function(req, res) {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).exec(function(err, location) {
            if (!location) {
                utils.sendJsonResponse(res, 404, {
                    "message": "locationid not found"
                });
                return;
            } else if (err) {
                utils.sendJsonResponse(res, 404, err);
                return;
            }
            utils.sendJsonResponse(res, 200, location);
        });
    } else {
        utils.sendJsonResponse(res, 404, {
            "message": "No locationid is request"
        });
    }
};

module.exports.locationsUpdateOne = function(req, res) {
    if (!req.params.locationid) {
        utils.sendJsonResponse(res, 404, {
            "message": "Not foud, locationid is required"
        });
        return;
    }
    Loc.findById(req.params.locationid).select('-reviews -rating')
        .exec(function(err, location) {
            if (!location) {
                utils.sendJsonResponse(res, 404, {
                    "message": "locationid not found"
                });
                return;
            } else if (err) {
                utils.sendJsonResponse(res, 400, err);
                return;
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = (req.body.facilities || "").split(",");
            location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1,
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }];
            location.save(function(err, location) {
                if (err) {
                    utils.sendJsonResponse(res, 404, err);
                } else {
                    utils.sendJsonResponse(res, 200, location);
                }
            });
        });
};

module.exports.locationsDeleteOne = function(req, res) {
    var locationid = req.params.locationid;
    if (locationid) {
        Loc.findByIdAndRemove(locationid)
            .exec(function (err, location) {
                if (err) {
                    utils.sendJsonResponse(res, 404, err);
                    return;
                }
                utils.sendJsonResponse(res, 204, null);
            });
    } else {
        utils.sendJsonResponse(res, 404, {
            "message": "No locationid"
        });
    }
};
