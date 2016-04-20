'use strict';

angular.module('IssueTracker.issues.edit', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'viewEditIssue/viewEditIssue.html',
            controller: 'EditIssueCtrl'
        });
    }])

    .controller('EditIssueCtrl', ['$scope', '$routParams', 'issues', function($scope, $routParams, issues) {
        $scope.putIssue = function (issue) {
            var id = $routParams.id;
            issues.editIssue(id, issue);
        };
    }]);