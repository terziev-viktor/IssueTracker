'use strict';

angular.module('IssueTracker.users', [])
    .factory('users', ['$http', '$q', 'BASE_URL', 'authentication',
        function ($http, $q, BASE_URL, authentication){
        // 	Security: Logged in
        function getAllUsers() {
            var defer = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Users').then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function getCurrentUser() {
            var defer = $q.defer();
            authentication.refreshCookie();
            $http.get(BASE_URL + '/Users/me').then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function makeAdmin(data) {
            var defer = $q.defer();
            authentication.refreshCookie();
            $http.put(BASE_URL + '/Users/makeadmin', data).then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        function changePassword(data) {
            var defer = $q.defer();
            authentication.refreshCookie();
            $http.post(BASE_URL + '/api/Account/ChangePassword', data).then(function (users) {
                defer.resolve(users);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
        return {
            getAllUsers: getAllUsers,
            getCurrentUser: getCurrentUser,
            makeAdmin: makeAdmin,
            changePassword: changePassword
        }
    }]);