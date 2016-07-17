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

angular.module('loc8rApp').controller('locationListController', locationListController);
