/**
 * Created by jmccommas on 12/15/14.
 */
(function () {
    "use strict";

    configAppDirective.directive('menuPullout',['$animate','$timeout', function($animate, $timeout){
        return {
            restrict: 'EA',
            link: function ($scope, $element, $attrs, $animate) {
                $timeout(function($element) {
                    $('.mv-sidebar').animate({
                        left: -15
                    }, 750, "easeInOutBounce");

                    $scope.$apply();
                });
            }
        };
    }])
}());



