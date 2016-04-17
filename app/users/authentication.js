angular.module('IssueTracker.users.authentication', [])
    .factory('authentication', ['$http', '$q', 'BASE_URL', function ($http, $q, BASE_URL) {
        function login(data) {
            var def = $q.defer();
            //$http.defaults.headers.authorization = ''; //TODO: Set Authorization.
            $http.post(BASE_URL + '/api/Account/Login', data)
                .then(function (response) {
                    sessionStorage['accesstoken'] = 'access';
                    //sessionStorage['accesstoken'] = response.accesstoken;  // TODO: Fix status code 405 and use the response object
                    def.resolve(response);
                }, function (error) {
                    def.reject(error);
                });
            return def.promise;
        }

        function register(data) {
            var def = $q.defer();
            //$http.defaults.headers.authorization = ''; //TODO: Set Authorization.
            $http.post(BASE_URL + '/api/Account/Register', data)
                .then(function (response) {
                    sessionStorage['accesstoken'] = 'access';
                    //sessionStorage['accesstoken'] = response.accesstoken; // TODO: Fix status code 405 and use the response object
                    def.resolve(response);
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

        return {
            login: login,
            register: register,
            logout: logout
        }
    }]);