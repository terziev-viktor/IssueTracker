'use strict';

angular.module('IssueTracker.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'viewWelcome/viewWelcome.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope', 'authentication', '$location', function($scope, authentication, $location) {
  $("#page-title>p").html('Welcome to Issue Tracker! Login or Register to get started.');
  $scope.registerUser = function (userData) {
    authentication.register(userData).then(function (success) {
      $location.path('/dashboard');
    }, function (error) {
      // TODO: Make a useful message
      console.log(error);
    });
  };

  $scope.loginUser = function (userData) {
    authentication.login(userData).then(function (seccess) {
      $location.path('/dashboard');
    }, function (error) {
      // TODO: Make a useful message
      console.log(error);
    });
  }
}]);