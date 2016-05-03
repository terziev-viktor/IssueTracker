'use strict';

angular.module('IssueTracker.users.profile', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'viewProfile/viewProfile.html',
            controller: 'ChangePassCtrl'
        });
    }])
    .controller('ChangePassCtrl', ['$scope', '$location', 'users', 'identity', 'authentication', 'notificationer', function ($scope, $location, users, identity, authentication, notificationer) {
        authentication.refreshCookie();
        identity.requestUserProfile().then(function () {
            identity.getCurrentUser().then(function (u) {
                $scope.user = u;
                if(u.isAdmin) {
                    $scope.isAdmin = 'Admin';
                } else {
                    $scope.isAdmin = 'Not an admin';
                }
            });
        });
        $scope.changePass = function (data) {
            users.changePassword(data).then(function (r) {
                notificationer.notify('Password Changed.');
                $('#pass').val('');
                $('#newPass').val('');
                $('#confirmPass').val('');
            }, function (r) {
                console.log(r);
                notificationer.notify('Incorrect Password');
            });
        }
    }]);