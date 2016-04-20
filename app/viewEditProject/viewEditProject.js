'use strict';

angular.module('IssueTracker.projects.edit', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'viewEditProject/viewEditProject.html',
            controller: 'EditProjectCtrl'
        });
    }])

    .controller('EditProjectCtrl', ['$scope', '$routeParams', 'projects', function($scope, $routeParams, projects) {
        $scope.putProject = function (project) {
            // TODO: If the user is the project leader, he can access this page and edit the project
            var id = $routeParams.id;
            projects.editProject(id, project);
        };
    }]);