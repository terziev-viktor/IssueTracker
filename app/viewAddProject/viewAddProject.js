'use strict';

angular.module('IssueTracker.addProject', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'viewAddProject/viewAddProject.html',
            controller: 'AddProjectsCtrl'
        });
    }])

    .controller('AddProjectsCtrl', ['$scope', '$routeProvider', function($scope, $routeProvider) {
        $scope.addProject = function (project) {
            // TODO: Add Issue
            console.log('in $scope.addProject ');
            console.dir(project);
        };
    }]);