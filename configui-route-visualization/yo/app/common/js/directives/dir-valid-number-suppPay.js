/**
 * Created by jmccommas on 08/19/15.
 */
// number validation directive for suppPay.html
(function () {
	"use strict";
	configAppDirective.directive('validNumberSuppPay', ['toastr', function (toastr) {
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
					// Checking for null and undefined value to make sure 0 is allowed
					if (newValue != null && newValue != undefined) {
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
						if (parseFloat(newValue) > 50000.00 || parseFloat(newValue) < 0) {
							toastr.info('Please enter a valid fee amount. Fees must be more than $0 and less than' +
								' $50,000.00');
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