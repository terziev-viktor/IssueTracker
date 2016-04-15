'use strict';

angular.module('IssueTracker.version', [
  'IssueTracker.version.interpolate-filter',
  'IssueTracker.version.version-directive'
])

.value('version', '0.1');
