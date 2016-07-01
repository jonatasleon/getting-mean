module.exports = (function() {
	var earthRadius = 6731;

	var getDistanceFromRads = function(rads) {
		return parseFloat(rads * earthRadius);
	};

	var getRadsFromDistance = function(distance) {
		return parseFloat(distance / earthRadius);
	}

	return {
		getDistanceFromRads: getDistanceFromRads,
		getRadsFromDistance: getRadsFromDistance
	};
})();
