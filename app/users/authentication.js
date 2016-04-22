angular.module('IssueTracker.users.authentication', [])
    .factory('authentication', ['$http', '$q', '$cookies', 'BASE_URL', 'identity', function ($http, $q, $cookies, BASE_URL, identity) {

        var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

        function preserveUserData(data) {
            var accessToken = data.access_token;
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

        function login(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/api/Account/Login', data)
                .then(function (response) {
                    preserveUserData(response.data);

                    identity.requestUserProfile()
                        .then(function() {
                            def.resolve(response.data);
                        });
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        function register(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/api/Account/Register', data)
                .then(function (response) {
                    preserveUserData(response);
                    identity.requestUserProfile()
                        .then(function() {
                            def.resolve(response.data);
                        });
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        function logout() {
            var def = $q.defer();
            var data = sessionStorage['authtoken'];
            $http.post(BASE_URL + '/api/Account/Logout', data)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        function getToken(data) {
            var def = $q.defer();
            $http.post(BASE_URL + '/api/Token', data)
                .then(function (response) {
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        return {
            login: login,
            register: register,
            logout: logout,
            getToken: getToken
        }
    }]);