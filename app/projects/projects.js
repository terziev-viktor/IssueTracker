'use strict';

angular.module('IssueTracker.projects', [])
    .factory('projects', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL) {
        function getAllProjects() {
            var def = $q.defer();
            $http.get(BASE_URL + '/Projects').then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error)
            });
            return def.promise;
        }

        function getProjectById(id) {
            var def = $q.defer();
            $http.get(BASE_URL + '/Projects/' + id).then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error)
            });
            return def.promise;
        }
        // Security: Admin
        function postProject(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/Projects', data).then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error)
            });
            return def.promise;
        }
        // Project Key cannot be edited
        // Returns object{error: 'Message'} or the edited project
        function editProject(id, data) {
            var def = $q.defer();
            $http.put(BASE_URL + '/Projects/' + id, data).then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error)
            });
            return def.promise;
        }
        return {
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            postProject: postProject,
            editProject: editProject
        }
    }]);