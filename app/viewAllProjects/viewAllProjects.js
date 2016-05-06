'use strict';

angular.module('IssueTracker.projects.all', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'viewAllProjects/viewAllProjects.html',
            controller: 'AllProjectsCtrl'
        });
    }])
    .controller('AllProjectsCtrl', ['$scope', '$location', 'projects', 'notificationer', function ($scope, $location, projects, notificationer) {
        var page = 1, search;
        function loadAllProjects() {
            projects.getProjectsByFilter("", 8, page).then(function (response) {
                if(response.data.Projects.length != 0) {
                    $scope.all_projects = response.data.Projects;
                    $scope.projectsFound = undefined;
                } else {
                    $scope.projectsFound = "You have no projects yet...";
                }
            }, function (response) {
                console.log(response);
            });
        }
        loadAllProjects();
        function loadProjects(search_value) {
            projects.getProjectsByFilter("Name.contains(\"" + search_value+"\")", 8, page)
                .then(function (response) {
                    $scope.all_projects = response.data.Projects;
                    if(response.data.Projects.length != 0) {
                        $scope.projectsFound = undefined;
                    } else {
                        $scope.projectsFound = 'No results for "' + search_value + '"...';
                    }
                }, function (response) {
                    console.log(response);
                })
        }
        $scope.searchProject = function() {
            if($scope.search_value) {
                search = $scope.search_value;
                loadProjects($scope.search_value);
            } else {
                loadAllProjects();
            }
        };
        $scope.nextPage = function () {
            page++;
            if(search != undefined) {
                loadProjects(search)
            } else {
                loadAllProjects();
            }

        };
        $scope.previousPage = function () {
            page--;
            if(page > 0) {
                if(search != undefined){
                    loadProjects(search);
                } else {
                    loadAllProjects();
                }
            } else {page = 1;}
        };
    }]);