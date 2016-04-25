'use strict';

angular.module('IssueTracker.issuePage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'viewIssuePage/viewIssuePage.html',
            controller: 'IssuePageCtrl'
        });
    }])

    .controller('IssuePageCtrl', ['$scope', '$routeParams', 'issues', 'notificationer',
        function($scope, $routeParams, issues, notificationer) {
            notificationer.notify('Issue Page');
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
            $scope.duedate = response.DueDate;
            $scope.status = response.Status.Name;
            $scope.showClosed = response.Status.Name != "Closed";
            $scope.showInProgress = response.Status.Name != "InProgress";
            $scope.showOpen = response.Status.Name != "Open";
            function showComments() {
                issues.getIssueComments(issueId).then(function (response) {
                    $scope.comments = response.data;
                }, function (res) {
                    console.log(res);
                });
            }
            showComments();
            // TODO: Issue status can not be changed? Don't know why ;(
            $scope.changeStatusToClosed = function () {
                issues.changeIssueStatus(3).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                })
            };
            $scope.changeStatusToInProgress = function () {
                issues.changeIssueStatus(2).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                })
            };
            $scope.changeStatusToOpen = function () {
                issues.changeIssueStatus(1).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                })
            };
            // ------------------------------------------------------
            $scope.addComment = function (comment) {
                issues.addIssueComment(issueId, comment).then(function (response) {
                    showComments();
                    $('#comment').val('');
                    notificationer.notify('Comment Added Successfully!');
                }, function () {
                    notificationer.notify('Only Logged in user who is either a project leader or has a assigned issue in this project can add comments!')
                });
            };
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