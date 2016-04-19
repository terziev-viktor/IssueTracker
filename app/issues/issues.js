'use strict';

angular.module('IssueTracker.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', 'projects', function IssuesFactory($http, $q, BASE_URL, projects) {
        // Security: logged in.
        function getProjectIssues(projectId) {
            var def = $q.defer();
            projects.getProjectById(projectId).then(function (success) {
                def.resolve(seccess.issues);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }
        // Security logged In
        function getIssueById(id) {
            var def = $q.defer();
            $http.get(BASE_URL + '/Issues/' + id).then(function (success) {
                def.resolve(success);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }
        //	Security: Admin, Project lead
        function addIssue(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/Issues', data).then(function (success) {
                def.resolve(success);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }
        // Security: Admin, Project lead
        function editIssue(issueId, data) {
            var def = $q.defer();
            $http.put(BASE_URL + '/Issues/' + issueId, data)
                .then(function (success) {
                    def.resolve(success);
                }, function(error) {
                        def.reject(error)
                });
            return def.promise;
        }
        // Security: Login
        function getIssueComments(issueId) {
            var def = $q.defer();
            $http.get(BASE_URL + '/Issues/' + issueId + '/comments').then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }
        // Security: Logged in user who is either a project leader or has a assigned issue in this project
        function addIssueComment(issueId, data) {
            var def = $q.defer();
            $http.put(BASE_URL + '/Issues/' + issueId + '/comments', data).then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }
        function getUsersIssues(orderBy, pageSize, pageNumber) {
            var def = $q.defer();
            $http.get(BASE_URL + '/Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                .then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }
        return {
            getProjectIssues: getProjectIssues,
            getIssueById: getIssueById,
            addIssue: addIssue,
            editIssue: editIssue,
            getIssueComments: getIssueComments,
            addIssueComment: addIssueComment,
            getUsersIssues: getUsersIssues
        }
    }]);