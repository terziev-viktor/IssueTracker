'use strict';

angular.module('IssueTracker.notify', [])
.factory('notificationer', [function () {

    function notify(message) {
        var container =
        $('#notify-container').html('<p>' + message + '</p>').show(1000);
        setTimeout(function () {
            container.hide(1000);
        }, 500);
    }

    return {
        notify: notify
    }
}]);