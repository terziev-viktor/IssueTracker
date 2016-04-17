'use strict';

angular.module('IssueTracker.users', [])
    .factory('users', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL){
        // 	Security: Logged in
        function getAllUsers() {
            var defer = $q.defer();
            $http.get(BASE_URL + '/Users').then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function getCurrentUser() {
            var defer = $q.defer();
            $http.get(BASE_URL + '/Users/me').then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function makeAdmin(data) {
            var defer = $q.defer();
            $http.put(BASE_URL + '/Users/makeadmin', data).then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function changePassword(data) {
            var defer = $q.defer();
            $http.post(BASE_URL + '/api/Account/ChangePassword', data).then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        return {

        }
    }]);