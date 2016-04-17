'use strict';

// Declare app level module which depends on views, and components
angular.module('IssueTracker', [
  'ngRoute',
  'IssueTracker.welcome',
  'IssueTracker.version',
  'IssueTracker.addIssue',
  'IssueTracker.addProject',
  'IssueTracker.issuePage',
  'IssueTracker.dashboard',
  'IssueTracker.users.authentication'
]).
  config(['$routeProvider', function($routeProvider, $http) {
    $routeProvider.otherwise({redirectTo: '/welcome'});
  }])
    .constant('BASE_URL', '): ⦁	http://softuni-issue-tracker.azurewebsites.net');
