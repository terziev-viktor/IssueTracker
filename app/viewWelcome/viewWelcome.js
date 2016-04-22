'use strict';

angular.module('IssueTracker.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'viewWelcome/viewWelcome.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope', 'authentication', '$location', '$q', '$http', 'BASE_URL', function($scope, authentication, $location, $q, $http, BASE_URL) {
  $("#page-title>p").html('Welcome to Issue Tracker! Login or Register to get started.');
  $scope.registerUser = function (userData) {
    authentication.register(userData).then(function (response) {
      console.log(response);
        authentication.getToken({'Username': userData.Email, 'Password': userData.Password}).then(function (response) {
            console.log('get token response: ');
            console.log(response);
            $location.path('/dashboard');
        }, function (err) {
            console.log('get token error response');
            console.log(err);
        });
    }, function (error) {
      // TODO: Make a useful message.
      console.log(error);
    });
  };

  $scope.loginUser = function (userData) {
    var defer = $q.defer();
    userData['grant_type'] = "password";
    authentication.getToken({'Username': userData.Email, 'Password': userData.Password}).then(function (response) {
        defer.resolve(response);
        console.log(success);
        $location.path('/dashboard');
      }, function(error) {
          defer.reject(error);
        console.log(error);
      });

    return defer.promise;
  }
}]);