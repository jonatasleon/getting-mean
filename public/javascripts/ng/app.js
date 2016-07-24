angular.module('loc8rApp', []);

var locationListController = ['$scope', 'loc8rData', function($scope, loc8rData) {
    $scope.data = {
        locations: loc8rData
    }
}];

var _isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
    return function(distance) {
        var numDistance, unit;
        if (distance && _isNumeric(distance)) {
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

var loc8rData = function() {
    return [{
        name: 'Burguer Queen',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '0.296543',
        _id: '5370a35f2536f6785f8dfb6a'
    }, {
        name: 'Costy',
        address: '250 Low Avenue, Writing',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
        distance: '0.7485142',
        _id: '5370a35f2536f6785f8dfb6a'
    }];
}

angular.module('loc8rApp')
    .controller('locationListController', locationListController)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('loc8rData', loc8rData);
