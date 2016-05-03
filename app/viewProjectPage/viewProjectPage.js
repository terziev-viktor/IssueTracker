'use strict';

angular.module('IssueTracker.projectPage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'viewProjectPage/viewProjectPage.html',
            controller: 'ProjectPageCtrl'
        });
    }])

    .controller('ProjectPageCtrl', ['$scope', '$routeParams', 'projects', 'issues', 'identity', 'authentication',
        function($scope, $routeParams, projects, issues, identity, authentication) {
        var id = $routeParams.id, pageNumber = 1, getIssues, project_issues = $('#project-issues'),
            labels = [], priorities = [], leadId = response.data.Lead.Id;
        projects.getProjectById(id).then(function (response) {
            authentication.refreshCookie();
            identity.requestUserProfile().then(function () {
                identity.getCurrentUser().then(function (user) {
                    $scope.showEdit = (user.Id == leadId);
                    $scope.showAdd = (user.isAdmin || user.Id == leadId);
                    response.data.Labels.forEach(function (e) {
                        labels.push(e.Name);
                    });
                    response.data.Priorities.forEach(function (e) {
                        priorities.push(e.Name);
                    });
                    $scope.project = response.data;
                    $scope.labels = labels.join(', ');
                    $scope.prioritites = priorities.join(', ');
                    $scope.table_title = 'Assigned Issues';
                    getIssues = function () {
                        issues.getIssuesByFilter('Assignee.Id="' + user.Id + '" and Project.Id='+ response.data.Id, 12, 1).then(function (r) {
                            if(r.data.Issues.length == 0){
                                pageNumber--;
                                project_issues.removeClass('panel-success').addClass('panel-warning');
                            } else {
                                project_issues.removeClass('panel-warning').addClass('panel-success');
                            }
                            $scope.issues = r.data.Issues;
                            $scope.disabled = false;
                        }, function (error) {
                            console.log(error);
                        });
                    };
                    getIssues();

                    $scope.nextPage = function () {
                        pageNumber++;
                        getIssues();
                    };
                    $scope.previousPage = function () {
                        pageNumber--;
                        if(pageNumber > 0) {
                            getIssues();
                        } else {
                            pageNumber = 1;
                        }
                    };
                    $scope.showProjectIssues = function () {
                        pageNumber = 1;
                        issues.getProjectIssues(response.data.Id).then(function (data) {
                            $scope.issues = data.data;
                            $scope.table_title = 'Project Issues';
                            $scope.disabled = true;
                            if(data.data.length == 0) {
                                project_issues.removeClass('panel-success').addClass('panel-warning');
                            } else {
                                project_issues.removeClass('panel-warning').addClass('panel-success');
                            }
                        }, function (error) {
                            console.log(error);
                        });
                    };
                    $scope.showAssignedIssues = function () {
                        pageNumber = 1;
                        $scope.table_title = 'Assigned Issues';
                        getIssues();
                    }
                }, function (response) {
                    console.log(response);
                })
                });
            });
    }]);