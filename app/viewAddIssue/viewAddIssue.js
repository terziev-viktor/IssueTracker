'use strict';

angular.module('IssueTracker.addIssue', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'viewAddIssue/viewAddIssue.html',
            controller: 'addIssueCtrl'
        });
    }])

    .controller('addIssueCtrl', ['$scope', '$routeParams', 'projects', 'users', 'issues', '$location',
        function($scope, $routeParams, projects, users, issues, $location) {
            projects.getProjectById($routeParams.id).then(function (res) {
                console.log(res);
                $scope.priorities = res.data.Priorities;
            });
        $scope.createIssue = function (issue) {
            var data = {};
            data.Title = issue.Title;
            data.Description = issue.Description;
            data.DueDate = issue.DueDate;
            data.ProjectId = $routeParams.id;
            data.Label = [];
            issue.labels.split(', ').forEach(function (e) {
                data.Label.push({
                    Id: 1,
                    Name: e
                })
            });
            data.PriorityId = issue.priority;
            users.getAllUsers().then(function (res) {
                res.data.forEach(function (e) {
                    if(e.Username == issue.Assignee) {
                        data.AssigneeId = e.Id;
                    }
                });
                issues.addIssue(data).then(function (res) {
                    console.log(res);
                    $location.path('/projects/' + $routeParams.id);
                }, function (res) {
                    console.log(res);
                });
            }, function (e) {
                console.log("Couldn't get users");
                console.log(e);
            });

        };
    }]);