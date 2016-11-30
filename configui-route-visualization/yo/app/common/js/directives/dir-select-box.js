/**
 * Created by jmccommas on 12/19/14.
 */
(function () {
    "use strict";
    configAppDirective.directive('chosen', [ '$timeout', function($timeout) {
            var linker = function(scope,element, attr ){
                scope.$watch('statesList', function(){
                    element.trigger('liszt:updated');
                });
                element.chosen()
            };
            return {
                restrict: 'AE',
                link: linker
            }


    }]);
}());

