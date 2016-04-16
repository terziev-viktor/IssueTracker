'use strict';

angular.module('IssueTracker.issuePage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'viewIssuePage/viewIssuePage.html',
            controller: 'IssuePageCtrl'
        });
    }])

    .controller('IssuePageCtrl', ['$scope', '$routeProvider', '$http', function($scope, $routeProvider, $http) {

    }]);