'use strict';

angular.module('IssueTracker.addIssue', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'viewAddIssue/viewAddIssue.html',
            controller: 'addIssueCtrl'
        });
    }])

    .controller('addIssueCtrl', ['$scope', '$routeParams', 'projects', 'users', 'issues', '$location', 'notificationer',
        function($scope, $routeParams, projects, users, issues, $location, notificationer) {
            projects.getProjectById($routeParams.id).then(function (res) {
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
            users.getUserByFilter('Username=="' + issue.Assignee + '"').then(function (res) {
                if(res.data.length == 0) {
                    notificationer.notify('User ' + issue.Assignee + 'can not be found.');
                } else {
                    data.AssigneeId = res.data[0].Id;
                    issues.addIssue(data).then(function (res) {
                        notificationer.notify('Issue Created!');
                        $location.path('/projects/' + $routeParams.id);
                    }, function (res) {
                        notificationer.notify('Error with creating the issue');
                        console.log(res);
                    });
                }
            }, function (e) {
                console.log("Couldn't get users");
                console.log(e);
            });

        };
    }]);