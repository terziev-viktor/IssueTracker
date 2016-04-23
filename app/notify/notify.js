'use strict';

angular.module('IssueTracker.notify', [])
.factory('notificationer', [function () {

    function notify(message) {
        var container =
        $('#notify-container')
            .css('padding', '20px')
            .html('<p>' + message + '</p>')
            .fadeIn(1000);
        setTimeout(function () {
            container.fadeOut(1000, function(){container.css('padding', '0px')});
        }, 2000);
    }

    return {
        notify: notify
    }
}]);