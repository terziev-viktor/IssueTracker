'use strict';

angular.module('IssueTracker.addProject', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'viewAddProject/viewAddProject.html',
            controller: 'AddProjectsCtrl'
        });
    }])

    .controller('AddProjectsCtrl', ['$scope','projects', 'users', '$location',
        function($scope, projects, users) {

        $scope.createProject = function (project) {
            console.log(project);
            var data = {};
            data.Name = project.name;
            data.Description = project.description;
            data.ProjectKey = project.key;
            data.Labels = project.label.split(', ');
            data.Priorities = project.priorities.split(', ');
            data.LeadId = project.LeadId;
            projects.postProject(data).then(function (response) {
                console.log(response);
                $location.path('/Projects/' + response.Id);
            }, function (res) {
                console.log(res);
            });
        }
    }]);