'use strict';

angular.module('IssueTracker.addIssue', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addIssue', {
            templateUrl: 'viewAddIssue/viewAddIssue.html',
            controller: 'AddIssueCtrl'
        });
    }])

    .controller('AddIssueCtrl', ['$scope', function($scope) {
        $scope.addIssue = function (issueData) {
            // TODO: Add Issue
            console.log('in $scope.addIssue ');
            console.dir(issueData);
        };
    }]);