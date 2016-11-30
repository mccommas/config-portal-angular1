/**
 * Created by jmccommas on 12/19/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('brandInstructionsModal', ["$scope", "$uibModalInstance", "$location", "$stateParams", "Restangular", "toastr",
        function ($scope, $uibModalInstance, $location, $stateParams, Restangular, toastr) {

            var brandInstructions = this;

            brandInstructions.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                //toastr.warning('Action has been canceled');
            };

        }]);
}());