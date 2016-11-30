/**
 * Created by jmccommas on 11/4/14.
 */
(function () {
    "use strict";
    configAppDirective.directive('backButton', ['$window', function ($window) {
        return {
            restrict: 'EA',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);
}());