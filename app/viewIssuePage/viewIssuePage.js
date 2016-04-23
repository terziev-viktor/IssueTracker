'use strict';

angular.module('IssueTracker.issuePage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'viewIssuePage/viewIssuePage.html',
            controller: 'IssuePageCtrl'
        });
    }])

    .controller('IssuePageCtrl', ['$scope', '$routeParams', 'issues', function($scope, $routeParams, issues) {
        var issueId = $routeParams.id;
        issues.getIssueById(issueId).then(function (r) {
            var response = r.data;
            $scope.IssueKey = response.IssueKey;
            $scope.Title = response.Title;
            $scope.Description = response.Description;
            $scope.Project = response.Project.Name;
            $scope.Assigneeid = response.Assignee.Id;
            $scope.PriorityId = response.Priority.Id;
            $scope.priorityName = response.Priority.Name;
            $scope.author = response.Author.Username;

            $scope.status = response.Status.Name;
            var labels = [];
            response.Labels.forEach(function (e) {
                labels.push(e.Name);
            });
            $scope.labels = labels.join(', ');
            var isAdmin = response.Assignee.isAdmin;
            console.log(response);
        }, function (error) {
            console.log(error);
        })
    }]);