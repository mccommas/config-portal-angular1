/**
 * Created by jmccommas on 2/19/15.
 */
(function () {
    "use strict";
    configAppDirective.directive('validNumber', ['toastr', function (toastr) {
        return {
            restrict: 'E',
            require: '?ngModel',
            scope: {
                "id": "@id",
                "placeholder": "@placeholder",
                "class": "@cssclass",
                "name": "@name",
                "required": "@required",
                 ngModel: '='
            },
            template: '<input required="{{required}}" type="text" class="{{class}}" name="{{name}}" id="{{id}}" ng-model="ngModel" placeholder="{{placeholder}}">',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }
                scope.$watch('ngModel', function (newValue, oldValue) {
                    if (newValue) {
                        var clean = newValue.toString().replace(/[^0-9\.]/g, '');
                        var decimalCheck = clean.split('.');
                        if (!angular.isUndefined(decimalCheck[1])) {
                            decimalCheck[1] = decimalCheck[1].slice(0, 2);
                            clean = decimalCheck[0] + '.' + decimalCheck[1];
                        }
                        if (clean === ".") {
                            clean = "";
                        }
                        //console.log(clean);
                        if (parseFloat(newValue) > 50000.00 || parseFloat(newValue) < 1) {
                            toastr.info('Please enter a valid fee amount. Fees must be more than $1 and less than $50,000.00');
                            ngModelCtrl.$setViewValue(oldValue);
                            ngModelCtrl.$render();
                        } else {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                        }
                    } else {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    }]);
}());