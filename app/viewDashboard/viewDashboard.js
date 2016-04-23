'use strict';

angular.module('IssueTracker.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'viewDashboard/viewDashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$http', '$scope', '$location', 'issues', 'projects', 'identity', function ($http, $scope, $location, issues, projects, identity) {
        $('#page-title > p').html('This Is Your Dashboard');
        issues.getUsersIssues('DueDate', 12, 1).then(function (response) {
            $scope.issues = response.data.Issues;
            console.log(response.data.Issues);
        }, function (error) {
            console.log(error);
        });
        identity.getCurrentUser().then(function (response) {
            var id = response.Id;
            projects.getProjectsByFilter('Lead.Id==' + id, 12, 1).then(function (response) {
                $scope.userProjects = response.data;
                console.log(response);
            }, function (response) {
                console.log(response);
            })
        });

    }]);