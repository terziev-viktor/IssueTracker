'use strict';

angular.module('IssueTracker.issuePage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'viewIssuePage/viewIssuePage.html',
            controller: 'IssuePageCtrl'
        });
    }])

    .controller('IssuePageCtrl', ['$scope', '$routeParams', 'issues', 'projects', 'notificationer', 'identity', '$location',
        function($scope, $routeParams, issues, projects, notificationer, identity, $location) {
        notificationer.notify('Issue Page');
        var issueId = $routeParams.id, currentUser, response, loadIssue;
        issues.getIssueById(issueId).then(function (r) {
            response = r.data;
            loadIssue = function () {
                $scope.IssueKey = response.IssueKey;
                $scope.Title = response.Title;
                $scope.Description = response.Description;
                $scope.Project = response.Project.Name;
                $scope.proejectId = response.Project.Id;
                $scope.Assigneeid = response.Assignee.Id;
                $scope.AssigneeName = response.Assignee.Username;
                $scope.PriorityId = response.Priority.Id;
                $scope.priorityName = response.Priority.Name;
                $scope.author = response.Author.Username;
                $scope.duedate = response.DueDate;
                $scope.status = response.Status.Name;
            };
            loadIssue();
            $scope.showClosed = response.Status.Name != "Closed";
            $scope.showInProgress = response.Status.Name != "InProgress";
            $scope.showOpen = response.Status.Name != "Open";
            $scope.showResolved = response.Status.Name != "Resolved";
            function showComments() {
                issues.getIssueComments(issueId).then(function (response) {
                    $scope.comments = response.data;
                }, function (res) {
                    console.log(res);
                    notificationer.notify("Couldn't Load comments...");
                });
            }
            showComments();
            identity.getCurrentUser().then(function (r) {
                currentUser = r;
                projects.getProjectById(response.Project.Id).then(function (proj) {
                    $scope.show = (proj.data.Lead.Id == currentUser.Id || response.Assignee.Id == currentUser.Id) == true;
                });
            }, function (r) {
                console.log(r);
            });
            $scope.redirectToEdit = function () {
                $location.path('/issues/' + response.Id + '/edit');
            };
            $scope.addComment = function (comment) {
                issues.addIssueComment(issueId, comment).then(function (response) {
                    showComments();
                    $('#comment').val('');
                    notificationer.notify('Comment Added Successfully!');
                }, function () {
                    notificationer.notify('Only Logged in user who is either a project leader or has a assigned issue in this project can add comments!')
                });
            };
            // TODO: Issue status can not be changed? Don't know why ;(
            $scope.changeStatusToClosed = function () {
                issues.changeIssueStatus(issueId, 3).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                });
                $scope.showClosed = false;
                $scope.showInProgress = false;
                $scope.showOpen = true;
                $scope.showResolved = false;
                loadIssue();
            };
            $scope.changeStatusToInProgress = function () {
                issues.changeIssueStatus(issueId, 2).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                });
                $scope.showClosed = true;
                $scope.showInProgress = false;
                $scope.showOpen = false;
                $scope.showResolved = true;
                loadIssue();
            };
            $scope.changeStatusToOpen = function () {
                issues.changeIssueStatus(issueId, 1).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                });
                $scope.showClosed = true;
                $scope.showInProgress = true;
                $scope.showOpen = false;
                $scope.showResolved = true;
                loadIssue();
            };
            $scope.changeStatusToResolved = function () {
                issues.changeIssueStatus(issueId, 4).then(function (r) {
                    console.log(r);
                }, function (r) {
                    console.log(r);
                });
                $scope.showClosed = true;
                $scope.showInProgress = false;
                $scope.showOpen = true;
                $scope.showResolved = false;
                loadIssue();
            };
            // ------------------------------------------------------
            var labels = [];
            response.Labels.forEach(function (e) {
                labels.push(e.Name);
            });
            $scope.labels = labels.join(', ');
        }, function (error) {
            console.log(error);
        })
    }]);