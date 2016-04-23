'use strict';

angular.module('IssueTracker.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', 'projects', 'authentication', function IssuesFactory($http, $q, BASE_URL, projects, authentication) {
        // Security: logged in.
        function getProjectIssues(projectId) {
            var def = $q.defer();
            authentication.refreshCookie();
            projects.getProjectById(projectId).then(function (success) {
                def.resolve(success.issues);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }
        // Security logged In
        function getIssueById(id) {
            var def = $q.defer();
            authentication.refreshCookie();
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
            authentication.refreshCookie();
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
            authentication.refreshCookie();
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
            authentication.refreshCookie();
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
            authentication.refreshCookie();
            $http.put(BASE_URL + '/Issues/' + issueId + '/comments', data).then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }
        function getUsersIssues(orderBy, pageSize, pageNumber) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                .then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        }
        function getIssuesByFilter(filter, pageSize, pageNumber) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Issues/?pageSize={'+pageSize+'}&pageNumber={'+pageNumber+'}&' + filter)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }
        function changeIssueStatus(statusId) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.put(BASE_URL + '/Issues/{id}/changestatus?statusid=' + statusId)
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
            getUsersIssues: getUsersIssues,
            getIssuesByFilter: getIssuesByFilter,
            changeIssueStatus: changeIssueStatus
        }
    }]);