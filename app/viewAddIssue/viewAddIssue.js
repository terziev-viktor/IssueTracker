'use strict';

angular.module('IssueTracker.addIssue', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'viewAddIssue/viewAddIssue.html',
            controller: 'addIssueCtrl'
        });
    }])

    .controller('addIssueCtrl', ['$scope', '$routeParams', 'projects', 'users',
        function($scope, $routeParams, projects, users) {
        $scope.createIssue = function (issue) {

        };
    }]);