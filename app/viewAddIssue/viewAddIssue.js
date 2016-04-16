'use strict';

angular.module('IssueTracker.addIssue', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'viewAddIssue/viewAddIssue.html',
            controller: 'addIssueCtrl'
        });
    }])

    .controller('addIssueCtrl', ['$scope', '$routeProvider', function($scope, $routeProvider) {
        $scope.addProject = function (project) {
            // TODO: Add Issue
            console.log('in $scope.addIssue ');
            console.dir(project);
        };
    }]);