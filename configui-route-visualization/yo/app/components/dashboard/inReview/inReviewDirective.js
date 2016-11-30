/*global angular: true */
configAppDirective.directive('message', function () {
	'use strict';
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		scope: true,
		templateUrl: 'components/dashboard/inReview/messagePartial.html'
	};
});