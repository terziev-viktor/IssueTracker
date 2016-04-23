'use strict';

angular.module('IssueTracker.addProject', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'viewAddProject/viewAddProject.html',
            controller: 'AddProjectsCtrl'
        });
    }])

    .controller('AddProjectsCtrl', ['$scope', '$routeProvider', function($scope, $routeProvider) {

    }]);