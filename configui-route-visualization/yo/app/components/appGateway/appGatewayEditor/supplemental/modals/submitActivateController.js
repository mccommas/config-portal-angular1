(function () {
    "use strict";
    configAppControllers.controller('ActivateSuppModal', ["$scope", "$state", "toastr", "$timeout", "$uibModalInstance", "$location", "Restangular",
        function ($scope, $state, toastr, $timeout, $uibModalInstance, $location, Restangular) {
            var serverSubmit;

            if (local_environment) {
                serverSubmit = Restangular.all('app').all('data');
            } else {
                serverSubmit = Restangular.all('configuration');
            }

            $scope.post_submit_for_review = function () {
                serverSubmit.all("gatewayStatus/supplemental_application").post('active').then(function (data) {
                    $uibModalInstance.close(true);
                    toastr.success('Supplemental Application Activity is now Active', 'Success', {
                        allowHtml: true
                    });
                    $state.go('appGatewayEditor.suppInReview', null, {reload: true});
                    $('#loading-indicator').show();
                });
            };

            $scope.submitActive = function () {
                if (local_environment) {
                    toastr.success('Supplemental Application Activity is now Active', 'Success', {
                        allowHtml: true
                    });
                    $uibModalInstance.close(true);
                    $state.go($state.current, null, {reload: true});
                } else {
                    $scope.post_submit_for_review();
                    $timeout(function(){
                        $state.go($state.current, null, {reload: true});
                    },2000);

                }
            };


            $scope.cancel = function () {
                $uibModalInstance.close(false);
                toastr.warning('Activate Canceled', 'Canceled', {
                    allowHtml: true
                });
            };

        }]);
}());