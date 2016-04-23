'use strict';

angular.module('IssueTracker.notify', [])
.factory('notificationer', [function () {

    function notify(message) {
        var container =
        $('#notify-container').html('<p>' + message + '</p>').show(500);
        setTimeout(function () {
            container.hide(500);
        }, 500);
    }

    return {
        notify: notify
    }
}]);