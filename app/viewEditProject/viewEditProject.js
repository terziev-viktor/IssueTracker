'use strict';

angular.module('IssueTracker.projects.edit', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'viewEditProject/viewEditProject.html',
            controller: 'EditProjectCtrl'
        });
    }])

    .controller('EditProjectCtrl', ['$scope', '$routeParams', 'projects', 'users', '$location',
        function($scope, $routeParams, projects, users, $location) {
        var currentProject = {}, lId = 1, pId = 1, projectId = $routeParams.id;
        projects.getProjectById(projectId).then(function (response) {
            currentProject = response.data;
            $scope.project = response.data;
            var lebelsNames = [], priotitiesNames = [];
            response.data.Labels.forEach(function (e) {
                lebelsNames.push(e.Name);
            });
            response.data.Priorities.forEach(function (e) {
                priotitiesNames.push(e.Name);
            });
            $scope.labels = lebelsNames.join(', ');
            $scope.priorities = priotitiesNames.join(', ');
        });

        $scope.putProject = function (project) {
            var data = {};
            data.Name = project.name || currentProject.Name;
            data.Description = project.description || currentProject.Description;
            data.ProjectKey = currentProject.ProjectKey;
            if(project.priorities) {
                data.Priorities = [];
                project.priorities.split(', ').forEach(function (e) {
                    data.Priorities.push({
                        Id: 1,
                        Name: e
                    });
                    pId++;
                });
            } else {
                data.Priorities = currentProject.Priorities;
            }
            if(project.label) {
                data.Labels = [];
                project.label.split(', ').forEach(function (e) {
                    data.Labels.push({
                        Id: lId,
                        Name: e
                    });
                    lId++;
                });
            } else {
                data.Labels = currentProject.Labels;
            }
            if(project.lead) {
                users.getAllUsers().then(function (res) {
                    res.data.forEach(function (e) {
                        if(e.Username == project.lead) {
                            data.LeadId = e.Id;
                        }
                    });

                });
            } else {
                data.LeadId = currentProject.Lead.Id;
            }
            console.log(data);
            projects.editProject(currentProject.Id, data).then(function (response) {
                console.log(response);
                $location.path('/projects/' + response.data.Id);
            }, function (res) {
                console.log(res);
            });
        };
    }]);