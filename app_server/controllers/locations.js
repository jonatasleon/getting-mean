var request = require('request');
var config = require('../../config')();
var _formatDistance = require('./utils')._formatDistance;
var _showError = require('./utils')._showError;

var renderHomepage = function(req, res) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
  });
};

var renderDetailPage = function(req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {
      title: locDetail.name
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: locDetail
  });
};

var renderReviewForm = function(req, res, locationInfo) {
  res.render('location-review-form', {
    title: 'Review ' + locationInfo.name + ' on Loc8r',
    pageHeader: {
      title: 'Review ' + locationInfo.name
    },
    error: req.query.err
  });
};

var getLocationInfo = function(req, res, callback) {
  var requestOptions, path;
  path = '/api/locations/' + req.params.locationid;
  requestOptions = {
    url: config.SERVER + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, function(err, response, body) {
    var data = body;
    if (response.statusCode === 200) {
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };

      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
  renderHomepage(req, res);
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, function(req, res, data) {
    renderDetailPage(res, res, data);
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, function(req, res, data) {
    renderReviewForm(req, res, data);
  });
};

/* POST 'new review' */
module.exports.doAddReview = function(req, res) {
  var requestOptions, path, locationid, postData;
  locationid = req.params.locationid;
  path = '/api/locations/' + locationid + '/reviews';
  postData = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url: config.SERVER + path,
    method: 'POST',
    json: postData
  };

  if (!postData.author || !postData.rating || !postData.reviewText) {
    res.redirect('/location/' + locationid + '/review/new?err=val');
    return;
  }

  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 201) {
      res.redirect('/location/' + locationid);
    } else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
      res.redirect('/location/' + locationid + '/review/new?err=val');
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};
