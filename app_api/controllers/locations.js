var utils = require('./utils');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.locationsListByDistance = function(req, res) {
    utils.sendJsonResponse(res, 200, {
        "status": "success"
    });
};

module.exports.locationsCreate = function(req, res) {
    utils.sendJsonResponse(res, 200, {
        "status": "sucess"
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
    utils.sendJsonResponse(res, 200, {
        "status": "sucess"
    });
};

module.exports.locationsDeleteOne = function(req, res) {
    utils.sendJsonResponse(res, 200, {
        "status": "sucess"
    });
};
