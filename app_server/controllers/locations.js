/* GET 'homelist' page */
module.exports.homelist = function(req, res) {
	res.render('locations-list', { title: 'Home'});
};

/* GET 'locationInfo' page */
module.exports.locationInfo = function(req, res) {
	res.render('index', { title: 'Location Info'});
};

/* GET 'addReview' page */
module.exports.addReview = function(req, res) {
	res.render('index', { title: 'Add Review'});
};
