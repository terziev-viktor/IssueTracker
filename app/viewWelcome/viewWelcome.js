'use strict';

angular.module('IssueTracker.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'viewWelcome/viewWelcome.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope', 'authentication', function($scope, authentication) {
  $scope.registerUser = function (userData) {
    authentication.register(userData);
  };

  $scope.loginUser = function (userData) {
    authentication.login(userData);
  }
}]);