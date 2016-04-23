'use strict';

angular.module('IssueTracker.projectPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'viewProjectPage/viewProjectPage.html',
            controller: 'ProjectPageCtrl'
        });
    }])

    .controller('ProjectPageCtrl', ['$scope', '$routeParams', 'projects', 'issues',
        function($scope, $routeParams, projects, issues) {
        var id = $routeParams.id;
        projects.getProjectById(id).then(function (response) {
            var labels = [], priorities = [];
            response.data.Labels.forEach(function (e) {
                labels.push(e.Name);
            });
            response.data.Priorities.forEach(function (e) {
                priorities.push(e.Name);
            });
            $scope.projectId = response.data.Id;
            $scope.projectKey = response.data.ProjectKey;
            $scope.projectTite = response.data.Name;
            $scope.projectDescription = response.data.Description;
            $scope.currentId = response.data.Lead.Id;
            $scope.lables = labels.join(', ');
            $scope.prioritites = priorities.join(', ');
            issues.getProjectIssues(id).then(function (data) {
                console.log(data);
                $scope.issues = data.data;
            }, function (error) {
                console.log(error);
            });
            console.log(response);
        }, function (response) {
            console.log(response);
        })
    }]);