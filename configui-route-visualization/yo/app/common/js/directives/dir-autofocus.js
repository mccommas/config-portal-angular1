/**
 * Created by jmccommas on 2/26/15.
 */
(function () {
    "use strict";
    configAppDirective.directive('autofocus', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element) {
                    $timeout(function () {
                        $element[0].focus();
                    });
                }
            };
        }
    ]);
}());