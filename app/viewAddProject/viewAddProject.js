'use strict';

angular.module('IssueTracker.addProject', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'viewAddProject/viewAddProject.html',
            controller: 'AddProjectsCtrl'
        });
    }])

    .controller('AddProjectsCtrl', ['$scope','projects', 'users', '$location',
        function($scope, projects, users, $location) {

        $scope.createProject = function (project) {
            console.log(project);
            var data = {}, lId = 1, pId = 1;
            data.Name = project.name;
            data.Description = project.description;
            data.ProjectKey = project.key;
            data.Labels = [];
            project.label.split(', ').forEach(function (e) {
                data.Labels.push({
                    Id: lId,
                    Name: e
                });
                lId++;
            });
            data.Priorities = [];
            project.priorities.split(', ').forEach(function (e) {
                data.Priorities.push({
                    Id: 1,
                    Name: e
                });
                pId++;
            });
            users.getAllUsers().then(function (res) {
                res.data.forEach(function (e) {
                    if(e.Username == project.LeadId) {
                        data.LeadId = e.Id;
                    }
                });
                projects.postProject(data).then(function (response) {
                    console.log(response);
                    $location.path('/Projects/' + response.data.Id);
                }, function (res) {
                    console.log(res);
                });
            });
        }
    }]);