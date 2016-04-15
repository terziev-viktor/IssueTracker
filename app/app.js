'use strict';

// Declare app level module which depends on views, and components
angular.module('IssueTracker', [
  'ngRoute',
  'IssueTracker.welcome',
  'IssueTracker.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/welcome'});
}]);
