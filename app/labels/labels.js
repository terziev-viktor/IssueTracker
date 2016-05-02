'use strict';

angular.module('IssueTracker.labels', [])
    .factory('labels', ['$http', '$q', 'BASE_URL', 'authentication', function IssuesFactory($http, $q, BASE_URL, authentication) {

        function getLabels(filter) {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Labels/?filter=' + filter).then(function (success) {
                def.resolve(success);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }

        function getAllLabels() {
            var def = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Labels').then(function (success) {
                def.resolve(success);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }
        return {
            getLabels: getLabels,
            getAllLabels: getAllLabels
        }
    }]);