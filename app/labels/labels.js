'use strict';

angular.module('IssueTracker.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', 'projects', function IssuesFactory($http, $q, BASE_URL, projects) {

        function getLabels(filter) {
            var def = $q.defer();
            $http.get(BASE_URL + '/Labels/?filter=' + filter).then(function (success) {
                def.resolve(success);
            }, function(error) {
                def.reject(error)
            });
            return def.promise;
        }

        return {

        }
    }]);