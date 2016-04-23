'use strict';

angular.module('IssueTracker.projectPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('#/projects/:id', {
            templateUrl: 'viewProjectPage/viewProjectPage.html',
            controller: 'ProjectPageCtrl'
        });
    }])

    .controller('ProjectPageCtrl', ['$scope', '$routeParams', 'projects', function($scope, $routeParams, projects) {
        var id = $routeParams.id;
        projects.getProjectById(id).then(function (response) {
            console.log(response);
        }, function (response) {
            console.log(response);
        })
    }]);