/*
 * Get notified when height changes and change margin-top
 */
(function () {
    "use strict";
    configAppDirective.directive('resize', function ($window) {
        return function (scope, element) {
            // var w = $('.main-page').height();
            var w = angular.element('.main-page');
            var windowsHeight = $(window).height();
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height()
                };
            };
            //  console.log(scope.getWindowDimensions());
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                //console.log('browser height is', windowsHeight);
                $(window).load(function () { // On resize
                    $('.sidebar').css({

                        'height': (($(".main-page").height() + 71)) + 'px'
                    });

                });
                $(document).click(function () { // On resize

                    $('.sidebar').css({
                        'height': (($(".main-page").height() + 71)) + 'px'
                    });

                });

                $(document).ready(function () { // On resize

                    $('.sidebar').css({
                        'height': (($(".main-page").height()) + 71) + 'px'
                    });


                });
                //        //Initial load of page
                $(function () {
                    //setInterval(sizeContent, 500);
                });
                //Every resize of window
                $(window).resize(sizeContent);
                //Dynamically assign height
                function sizeContent() {
                    var newHeight = $(document).height() - $("#headerMain").height() - $("#footer").height() + "px";
                    $(".main-page").css("height", newHeight);
                    $(".sidebar").css("height", $(document).height() - $("#headerMain").height() - $("#footer").height() + 71 + "px");
                    //$(".mv-sidebar").css("height", $(document).height() - $("#headerMain").height() - $("#footer").height() + 71 + "px");
                }

            }, true);

        }
    });
}());