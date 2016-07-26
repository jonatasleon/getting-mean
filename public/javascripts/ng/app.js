angular.module('loc8rApp', []);

var locationListController = ['$scope', 'loc8rData', function($scope, loc8rData) {
    $scope.message = 'Searching for nearby places';
    loc8rData.then(function(data) {
        var locations = data.data;
        $scope.message = (locations.length > 0) ? '' : 'No locations found';
        console.log(locations);
        $scope.data = {
            locations: locations
        };
    }, function(err) {
        $scope.message = 'Sorry, something\'s gone wrong';
    });
}];

var _isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
    return function(distance) {
        var numDistance, unit;
        console.log(distance);
        if ((distance || distance === 0) && _isNumeric(distance)) {
            if (distance > 1) {
                numDistance = parseFloat(distance).toFixed(1);
                unit = 'km';
            } else {
                numDistance = parseInt(distance * 1000, 10);
                unit = 'm';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    };
};

var ratingStars = function() {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/javascripts/ng/views/rating-stars.html'
    };
};

var loc8rData = ['$http', function($http) {
    return $http.get('/api/locations?lng=1&lat=1&maxDistance=20');
}];

var geolocation = function() {
    var geoPosition = function(cbSuccess, cbError, cbNoGeo) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
        } else {
            cbNoGeo();
        }
    };
    return {
        getPosition: getPosition
    };
};

angular.module('loc8rApp')
    .controller('locationListController', locationListController)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('loc8rData', loc8rData)
    .service('geolocation', geolocation);
