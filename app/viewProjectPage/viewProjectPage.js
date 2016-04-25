'use strict';

angular.module('IssueTracker.projectPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'viewProjectPage/viewProjectPage.html',
            controller: 'ProjectPageCtrl'
        });
    }])

    .controller('ProjectPageCtrl', ['$scope', '$routeParams', 'projects', 'issues', 'identity',
        function($scope, $routeParams, projects, issues, identity) {
        var id = $routeParams.id;
        projects.getProjectById(id).then(function (response) {
            console.log(response);
            var labels = [], priorities = [], leadId = response.data.Lead.Id;
            response.data.Labels.forEach(function (e) {
                labels.push(e.Name);
            });
            response.data.Priorities.forEach(function (e) {
                priorities.push(e.Name);
            });
            $scope.projectId = response.data.Id;
            $scope.projectKey = response.data.ProjectKey;
            $scope.projectTitle = response.data.Name;
            $scope.projectDescription = response.data.Description;
            $scope.currentId = leadId;
            $scope.lables = labels.join(', ');
            $scope.prioritites = priorities.join(', ');
            issues.getProjectIssues(id).then(function (data) {
                $scope.issues = data.data;
            }, function (error) {
                console.log(error);
            });
            var leadId = response.data.Lead.Id;
            identity.getCurrentUser().then(function (user) {
                if(user.Id == leadId) {
                    $scope.show = true;
                }
            });
        }, function (response) {
            console.log(response);
        })
    }]);