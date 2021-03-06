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
        authentication.refreshCookie();
        identity.requestUserProfile().then(function () {
            identity.getCurrentUser().then(function (user) {
                $scope.show_add_project = user.isAdmin;
                function loadUserIssues() {
                    issues.getUserAssignedIssues(12, 1, 'DueDate desc').then(function (response) {
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
                function loadAllProjects() {
                    projects.getProjectsByFilter("Lead.Id=\""+user.Id+"\"", 8, 1).then(function (response) {
                        if(response.data.Projects.length != 0) {
                            $scope.userProjects = response.data.Projects;
                            $scope.projectsFound = undefined;
                        } else {
                            $scope.projectsFound = "You have no projects yet...";
                        }
                    }, function (response) {
                        console.log(response);
                    });
                }
                loadAllProjects();
                $scope.searchProject = function() {
                    if($scope.search_value) {
                        projects.getProjectsByFilter("Name.contains(\""+$scope.search_value+"\") and Lead.Id=\"" + user.Id + "\"", 100, 1)
                            .then(function (response) {
                                $scope.userProjects = response.data.Projects;
                                if(response.data.Projects.length != 0) {
                                    $scope.projectsFound = undefined;
                                } else {
                                    $scope.projectsFound = 'No results for "' + $scope.search_value + '"...';
                                }
                        }, function (response) {
                            console.log(response);
                        })
                    } else {
                        loadAllProjects();
                    }
                };
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
            });

        });
    }]);