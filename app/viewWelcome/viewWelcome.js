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
    authentication.register(JSON.stringify(userData)).then(function (success) {
      console.log(success);
      $scope.loginUser({"Username": userData.Email, "Password": userData.Password})
          .then(function (success) {
            sessionStorage['access_token'] = success.access_token;
            $location.path('/dashboard');
          });
    }, function (error) {
      // TODO: Make a useful message.
      console.log(error);
    });
  };

  $scope.loginUser = function (userData) {
    var defer = $q.defer();
    userData['grant_type'] = "password";
    authentication.getToken(JSON.stringify(userData))
        .then(function (success) {
          defer.resolve(success);
        console.log(success);
      }, function(error) {
          defer.reject(error);
        console.log(error);
      });

    return defer.promise;
  }
}]);