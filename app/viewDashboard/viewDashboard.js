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
        var btnLogout = $('#btn-logout');
            btnLogout.show(500);
            btnLogout.on('click', function () {
                authentication.logout();
            });
        function loadUserIssues() {
            issues.getUsersIssues('DueDate', 12, page).then(function (response) {
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
            var id = response.Id;
            console.log('get current user response:');
            console.log(response);
            projects.getProjectsByFilter('Lead.Username=="' + response.Username + '"', 12, 1).then(function (response) {
                $scope.userProjects = response.data;
                console.log(response);
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
        }
    }]);