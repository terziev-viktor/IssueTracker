angular.module('IssueTracker.users.authentication', [])
    .factory('authentication', ['$http', '$q', '$cookies', 'BASE_URL', 'identity', function ($http, $q, $cookies, BASE_URL, identity) {

        var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

        function preserveUserData(data) {
            console.log('access_token = ' + data.data.access_token);
            var accessToken = data.data.access_token;
            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
            $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
        }

        function refreshCookie() {
            if (isAuthenticated()) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                identity.requestUserProfile();
            }
        }

        function isAuthenticated() {
            return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
        }

        function getToken(data) {
            var def = $q.defer();
            data.grant_type = 'password';
            $http({
                method: "POST",
                url: BASE_URL + '/api/Token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(data)
            }).then(function successCallback(response) {
                preserveUserData(response);
                def.resolve(response)
            }, function errorCallback(response) {
                def.reject(response);
            });
            return def.promise;
        }

        function login(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/api/Account/Login', data)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        function register(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/api/Account/Register', data)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        function logout() {
            $cookies.remove(AUTHENTICATION_COOKIE_KEY);
            $http.defaults.headers.common.Authorization = undefined;
            identity.removeUserProfile();
            $location.path('/welcome');
        }
        return {
            login: login,
            register: register,
            logout: logout,
            getToken: getToken,
            refreshCookie: refreshCookie
        }
    }]);