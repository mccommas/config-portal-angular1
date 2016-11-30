/**
 * Created by jmccommas on 2/6/15.
 */
(function () {
    "use strict";
    configAppDirective.directive('colorPicker', function () {
        return {
            scope: {
                pickerdefault: '@pickerdefault',
                pickertype: '@pickertype',
                color: '=colorPicker'
            },
            link: function (scope, element, attrs) {
                var colorSet = _COLOR_PICKER[scope.pickertype];
                element.colorPicker({
                    // initialize the color to the color on the scope
                    pickerDefault: scope.pickerdefault,
                    // Setting Color pallet
                    colors: colorSet,
                    // update the scope whenever we pick a new color
                    onColorChange: function (id, newValue) {
                        scope.$apply(function () {
                            scope.color = newValue;
                        });
                    }
                });
                element.parent().children().addClass(scope.pickertype + "-color");
                // update the color picker whenever the value on the scope changes
                scope.$watch('color', function (value) {
                    element.val(value);
                    element.change();
                });
            }
        }
    });

}());