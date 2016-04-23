'use strict';

angular.module('IssueTracker.addIssue', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'viewAddIssue/viewAddIssue.html',
            controller: 'addIssueCtrl'
        });
    }])

    .controller('addIssueCtrl', ['$scope', '$routeParams', 'projects', function($scope, $routeParams, projects) {
        $scope.addIssue = function (issue) {
            var projectId = $routeParams.id;
            projects.getProjectById(projectId).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        };
    }]);