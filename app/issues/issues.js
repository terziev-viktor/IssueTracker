'use strict';

angular.module('IssueTracker.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', 'projects', 'authentication', function IssuesFactory($http, $q, BASE_URL, projects, authentication) {
        // Security: logged in.
        function getProjectIssues(projectId) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Projects/' + projectId + '/Issues').then(function (data) {
                def.resolve(data);
            }, function (data) {
                def.reject(data);
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
            var jsonData = {
                "Text": data
            };
            $http({
                method: "POST",
                url: BASE_URL + '/Issues/' + issueId + '/comments',
                headers: {'Content-Type': 'application/json'}, // TODO: Content-Type not supported. ;(
                data: jsonData
            }).then(function successCallback(response) {
                def.resolve(response)
            }, function errorCallback(response) {
                def.reject(response);
            });
            return def.promise;
        }
        function getIssuesByFilter(filter, pageSize, pageNumber) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Issues?filter='+filter+'&pageSize='+pageSize+'&pageNumber='+pageNumber)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }
        function changeIssueStatus(issueId, statusId) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.put(BASE_URL + '/Issues/'+issueId+'/changestatus?statusId=' + statusId)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }
        function getUserAssignedIssues(pageSize, pageNumber, orderBy) {
            var defer = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Issues/me?pageSize='+pageSize+'&pageNumber='+pageNumber+'&orderBy=' + orderBy).then(function (r) {
                defer.resolve(r);
            }, function (err) {
                defer.reject(err)
            });
            return defer.promise;
        }
        return {
            getProjectIssues: getProjectIssues,
            getIssueById: getIssueById,
            addIssue: addIssue,
            editIssue: editIssue,
            getIssueComments: getIssueComments,
            addIssueComment: addIssueComment,
            getIssuesByFilter: getIssuesByFilter,
            changeIssueStatus: changeIssueStatus,
            getUserAssignedIssues: getUserAssignedIssues
        }
    }]);