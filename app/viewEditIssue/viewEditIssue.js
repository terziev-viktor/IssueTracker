'use strict';

angular.module('IssueTracker.issues.edit', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'viewEditIssue/viewEditIssue.html',
            controller: 'EditIssueCtrl'
        });
    }])

    .controller('EditIssueCtrl', ['$scope', '$routeParams', 'issues', 'projects', '$location', 'identity', 'users', 'notificationer', function($scope, $routeParams, issues, projects, $location, identity, users, notificationer) {
        var currentIssue, issueProject, currentUser;
        issues.getIssueById($routeParams.id).then(function(response) {
            currentIssue = response.data;
            projects.getProjectById(currentIssue.Project.Id).then(function (r) {
                issueProject = r.data;
                identity.getCurrentUser().then(function (res) {
                    currentUser = res;
                    $scope.issue = currentIssue;
                    $scope.proj = issueProject;
                    var names = [];
                    currentIssue.Labels.forEach(function (e) {
                        names.push(e.Name);
                    });
                    $scope.labels = names.join(', ');
                })
            })
        });
        $scope.putIssue = function (_data) {
            if(_data == undefined) {
                notificationer.notify('Fill at least one gap.');
                return;
            }
            var data = {}, labels = [], lId = 1;
            data.Title = _data.title || currentIssue.Title;
            data.Description = _data.description || currentIssue.Description;
            data.DueDate = _data.dueDate || currentIssue.DueDate;
            data.ProjectId = currentIssue.Project.Id;
            data.AssigneeId = currentIssue.Assignee.Id;
            data.PriorityId = _data.priorityId || currentIssue.Priority.Id;
            if(_data.labels) {
                _data.labels.split(', ').forEach(function (e) {
                    labels.push({
                        Id: lId,
                        Name: e
                    });
                    lId++;
                });
                data.Labels = labels;
            } else {
                data.Labels = currentIssue.Labels;
            }
            issues.editIssue(currentIssue.Id, data).then(function (re) {
                notificationer.notify('Editing Issue Successful!');
                $location.path('/issues/' + re.data.Id);
            }, function (r) {
                notificationer.notify('Error with editing the issue');
                console.log(r);
            });
        };
    }]);