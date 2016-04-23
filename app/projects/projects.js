'use strict';

angular.module('IssueTracker.projects', [])
    .factory('projects', ['$http', '$q', 'projects', 'authentication', 'BASE_URL', function ($http, $q, projects, authentication, BASE_URL) {
        function getAllProjects() {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Projects').then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error)
            });
            return def.promise;
        }

        function getProjectById(id) {
            var def = $q.defer();
            authentication.refreshCookie();
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
            authentication.refreshCookie();
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
            authentication.refreshCookie();
            $http.put(BASE_URL + '/Projects/' + id, data).then(function (response) {
                def.resolve(response);
            }, function (error) {
                def.reject(error)
            });
            return def.promise;
        }

        /*
        * Security: Logged in
        * o	filter (String): the filters which you want the projects to be filtered by
         	Supports every projects property with equals, less (or equal) than, greater (or equal)
            than comparators (for example “Name == “SIT Project””)
         	Supports child properties (for example: “Lead.Id == “e980a9d8-53e5-4f6b-b8ae-1efec2e58938””)
         	Supports multiple criterias using “and” and “or” in between them (for example “Lead.Username == "admin@softuni.bg" or
            Description.Contains("test"))
         *
        * */
        function getProjectsByFilter(filter, pageSize, pageNumber) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Projects/?pageSize={'+pageSize+'}&pageNumber={'+pageNumber+'}&' + filter).then(function (response) {
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
            editProject: editProject,
            getProjectsByFilter: getProjectsByFilter
        }
    }]);