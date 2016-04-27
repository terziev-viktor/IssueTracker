'use strict';

angular.module('IssueTracker.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'viewDashboard/viewDashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$http', '$scope', '$location', 'issues', 'projects', 'identity', 'notificationer', 'authentication',
        function ($http, $scope, $location, issues, projects, identity, notificationer, authentication) {
        var page = 1;
        if(!authentication.isLoggedIn()) {
            $location.path('/welcome');
        }
        function loadUserIssues() {
            issues.getUserAssignedIssues(12, 1, 'DueDate').then(function (response) {
                if(response.data.Issues != 0) {
                    $scope.issues = response.data.Issues;
                } else {
                    page--;
                }
            }, function (error) {
                console.log(error);
            });
        }
        loadUserIssues();
        identity.getCurrentUser().then(function (response) {
            projects.getProjectsByFilter('Lead.Id=' + response.Id, 12, 1).then(function (response) {
                $scope.userProjects = response.data;
            }, function (response) {
                console.log(response);
            })
        });
        $scope.nextPage = function () {
            page++;
            loadUserIssues();
        };
        $scope.previousPage = function () {
            page--;
            if(page > 0) {
                loadUserIssues();
            } else {page = 1;}
        };
        var btnLogout = $('#btn-logout'), btnProfile = $('#btn-profile');
        btnLogout.show(500);
        btnLogout.on('click', function () {
            authentication.logout();
        });
        btnProfile.show(500);
        btnProfile.on('click', function () {
            $location.path('/profile/password');
        });
    }]);