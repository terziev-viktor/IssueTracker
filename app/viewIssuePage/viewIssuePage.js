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
        var issueId = $routeParams.id, currentUser, Issue, loadIssue;
        issues.getIssueById(issueId).then(function (r) {
            Issue = r.data;
            $scope.availableStatuses = Issue.AvailableStatuses;
            $scope.noStatuses = Issue.AvailableStatuses.length == 0;
            $scope.Issue = Issue;
            $scope.showClosed = Issue.Status.Name != "Closed";
            $scope.showInProgress = Issue.Status.Name != "InProgress";
            $scope.showOpen = Issue.Status.Name != "Open";
            $scope.showResolved = Issue.Status.Name != "Resolved";
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
                projects.getProjectById(Issue.Project.Id).then(function (proj) {
                    $scope.show_edit = (proj.data.Lead.Id == currentUser.Id);
                    $scope.show_status_container = (proj.data.Lead.Id == currentUser.Id || currentUser.Id == Issue.Assignee.Id) ;
                });
            }, function (r) {
                console.log(r);
            });
            $scope.redirectToEdit = function () {
                $location.path('/issues/' + Issue.Id + '/edit');
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
            $scope.changeStatus = function (status) {
                issues.changeIssueStatus(issueId, status.Id).then(function (r) {
                    console.log(r);
                    notificationer.notify('Status Changed to ' + status.Name);
                    $scope.status = status.Name;
                }, function (r) {
                    console.log(r);
                });
            };
            // ------------------------------------------------------
            var labels = [];
            Issue.Labels.forEach(function (e) {
                labels.push(e.Name);
            });
            $scope.labels = labels.join(', ');
        }, function (error) {
            console.log(error);
        })
    }]);