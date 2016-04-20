'use strict';

angular.module('IssueTracker.users.changePass', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'viewChangePassword/viewChangePassword.html',
            controller: 'ChangePasswordCtrl'
        });
    }])
    .controller('ChangePasswordCtrl', ['$scope', 'users', function ($scope, users) {
        $scope.changePassword = function (data) {
            users.changePassword(data);
        }
    }]);