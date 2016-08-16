angular.module('loc8r', []);

var locationListController = ['$scope', 'loc8rData', 'geolocation',
    function($scope, loc8rData, geolocation) {
      $scope.message = 'Checking your location';

      $scope.getData = function(position) {
        var coords = position.coords;
        $scope.message = 'Searching for nearby places';

        loc8rData.locationByCoords(coords.latitude, coords.longitude).then(function(data) {
          var locations = data.data;
          $scope.message = (locations.length > 0) ? '' : 'No locations found';

          $scope.data = {
            locations: locations
          };
        }, function(err) {
          $scope.message = 'Sorry, something\'s gone wrong';
        });
      };

      $scope.showError = function(error) {
        $scope.$apply(function() {
          $scope.message = error.message;
        });
      };

      $scope.noGeo = function() {
        $scope.$apply(function() {
          $scope.message = 'Geolocation not supported by this browser.';
        });
      };

      geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
    }
];

var _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
  return function(distance) {
    var numDistance, unit;

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
      return '?';
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
  var locationByCoords = function(lat, lng) {
    var path = '/api/locations';
    var params = '?lng=' + lng + '&lat=' + lat + '&maxDistance=20';
    return $http.get(path + params);
  };
  return {
    locationByCoords: locationByCoords
  };
}];

var geolocation = function() {
  var getPosition = function(cbSuccess, cbError, cbNoGeo) {
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

angular.module('loc8r')
    .controller('locationListController', locationListController)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('loc8rData', loc8rData)
    .service('geolocation', geolocation);
