/**
 * Created by jparesky on 9/21/15.
 */
(function () {
    "use strict";
    configAppDirective.directive('fieldSet', ['$translate', function ($translate) {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            templateUrl: 'components/formElements/partials/fieldsetPartial.html',
            scope: {
                id: "@",
                label: "@",
                type: "@",
                vertical: "@",
                additional: "@",
                tip: "@",
                optional:"="
            }
        };
    }]);
}());