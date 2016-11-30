/**
 * Created by jmccommas on 12/15/14.
 */
(function () {
    "use strict";

    configAppDirective.directive('colorSlider', ['$animate', '$timeout',
        function ($animate, $timeout) {
            return {
                restrict: 'EA',
                link: function ($scope, $element, $attrs, $animate) {
                    var hexToRgb = function (hex) {
                            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                            return result ? {
                                r: parseInt(result[1], 16),
                                g: parseInt(result[2], 16),
                                b: parseInt(result[3], 16)
                            } : null;
                        };
                        //alert(hexToRgb("#000000").g);
                    $timeout(function ($element) {
                        // alert('color picker initiated');
                        $(".slider").slider({
                            value: 0,
                            min: 0,
                            max: 255,
                            slide: function (e, ui) {
                                console.log(ui.value);
                                var hexValue = ui.value.toString(16).toUpperCase();
                              //  console.log(hexValue);
                                if (hexValue.length < 2) hexValue = "0" + hexValue;

                                var chosenColor = "#" + hexValue + hexValue + hexValue;
                                var textColor = ui.value > 150 ? "#000000" : "#FFFFFF";
                                $("#color").css("background", chosenColor);
                                $("#color").css("color", textColor);
                                $("#color").text(chosenColor);
                                $("#brandingheading").css("color", chosenColor);
                                $("#brandingheading").attr("picker", chosenColor);
                            }
                        });

                        $scope.$apply();
                    });
                }
            };
    }])
}());