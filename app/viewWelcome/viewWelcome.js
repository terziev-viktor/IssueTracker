'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'viewWelcome/viewWelcome.html',
    controller: 'welcomeCtrl'
  });
}])

.controller('welcomeCtrl', ['$scope', function($scope) {
  $scope.registerUser = function (userData) {
    // TODO: Register User
    console.log('in $scope.registerUser ');
    console.log(userData);
  };

  $scope.loginUser = function (userData) {
    // TODO: Login User
    console.log('in $scope.loginUser');
    console.log(userData.name);
  }
}]);