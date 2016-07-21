angular.module('loc8rApp', []);

var locationListController = ['$scope', function($scope) {
    $scope.data = {
        locations: [{
            name: 'Burguer Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '0.296543',
            _id: '5370a35f2536f6785f8dfb6a'
        }, {
            name: 'Costy',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
            distance: '0.7485142',
            _id: '5370a35f2536f6785f8dfb6a'
        }]
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

angular.module('loc8rApp')
    .controller('locationListController', locationListController)
    .filter('formatDistance', formatDistance);
