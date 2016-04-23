'use strict';

angular.module('IssueTracker.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'viewDashboard/viewDashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$http', '$scope', '$location', 'issues', function ($http, $scope, $location, issues) {
        $('#page-title > p').html('This Is Your Dashboard');
        issues.getUsersIssues('DueDate', 12, 1).then(function (response) {
            $scope.issues = response.data.Issues;
            console.log(response.data.Issues);
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    }]);