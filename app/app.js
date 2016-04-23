'use strict';

// Declare app level module which depends on views, and components
angular.module('IssueTracker', [
  'ngRoute',
  'ngCookies',
  'IssueTracker.welcome',
  'IssueTracker.version',
  'IssueTracker.addIssue',
  'IssueTracker.addProject',
  'IssueTracker.issuePage',
  'IssueTracker.dashboard',
  'IssueTracker.users',
  'IssueTracker.users.authentication',
  'IssueTracker.users.identity',
  'IssueTracker.projects',
  'IssueTracker.projectPage',
  'IssueTracker.issues'

]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/welcome'});
  }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net');