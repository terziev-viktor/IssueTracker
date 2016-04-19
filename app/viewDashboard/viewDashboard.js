'use strict';

angular.module('IssueTracker.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'viewDashboard/viewDashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$http', '$scope', '$location', 'issues', function ($http, $scope, $location, issues) {
        issues.getUsersIssues('DueDate', 12, 0).then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    }]);