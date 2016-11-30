/**
 * Created by jmccommas on 4/12/15.
 */
(function () {
    "use strict";

    configAppDirective.directive('activeClass', ['$animate', '$timeout',
        function ($animate, $timeout) {
            var linker = function(scope, elem,attr){
                elem.on('click', function () {
                    if( !$(elem).hasClass('active-image')) {
                        $(elem).removeClass('thumbnail');
                        $(".active-image").removeClass("active-image").addClass("thumbnail");
                        $(elem).addClass('active-image');
                    }
                });
            };
            var controller = function(){
                var ctrl= this;
            };
            return {
                restrict: 'AE',
                link: linker,
                controller: controller
            }

        }])
}());
