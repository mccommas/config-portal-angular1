/**
 * Created by jmccommas on 01/03/15.
 */
(function () {
    "use strict";

    configAppDirective.directive('addClass', ['$animate', '$timeout',
        function ($animate, $timeout) {
            return function (scope, element, attrs) {
                element.addClass('animated bounceIn');
            };
    }])
}());