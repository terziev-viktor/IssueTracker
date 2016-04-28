'use strict';

angular.module('IssueTracker.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'viewWelcome/viewWelcome.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope', 'authentication', '$location', '$q', '$http', 'BASE_URL', 'notificationer',
    function($scope, authentication, $location, $q, $http, BASE_URL, notificationer) {
  $('#btn-logout').hide();
  $('#btn-profile').hide();
  $scope.registerUser = function (userData) {
    authentication.register(userData).then(function (response) {
      console.log(response);
        authentication.getToken({'Username': userData.Email, 'Password': userData.Password}).then(function (response) {
            notificationer.notify('Registration successful. Welcome to your Dashboard!');
            $location.path('/dashboard');
        }, function (err) {
            console.log(err);
        });
    }, function (error) {
      console.log(error);
    });
  };

  $scope.loginUser = function (userData) {
    var defer = $q.defer();
    authentication.getToken({'Username': userData.Username, 'Password': userData.Password}).then(function (response) {
        defer.resolve(response);
        notificationer.notify('Login successful. Welcome to your Dashboard!');
        $location.path('/dashboard');
      }, function(error) {
        defer.reject(error);
        notificationer.notify(error.data.error_description);
        console.log(error);
      });

    return defer.promise;
  }
}]);