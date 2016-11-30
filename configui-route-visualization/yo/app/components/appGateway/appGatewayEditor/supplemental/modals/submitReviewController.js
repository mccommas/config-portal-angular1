(function () {
    "use strict";
    configAppControllers.controller('SubmitSuppReviewModal', ["$scope", "$state", "toastr", "$timeout", "$uibModalInstance", "$location", "Restangular",
        function ($scope, $state, toastr, $timeout, $uibModalInstance, $location, Restangular) {
            var serverSubmit;
            var submitForReview;


            if (local_environment) {
                serverSubmit = Restangular.all('app').all('data');
            } else {
                serverSubmit = Restangular.all('configuration');
            }

            $scope.post_submit_for_review = function () {
                serverSubmit.all("gatewayStatus/supplemental_application").post('review').then(function (data) {
                    $uibModalInstance.close(true);
                    toastr.success('Supplemental Application Activity Submitted for Review', 'Success', {
                        allowHtml: true
                    });
                    $('#loading-indicator').show();
                });
            };

            $scope.submitReview = function () {
                if (local_environment) {
                    toastr.success('Supplemental Application Activity Submitted for Review', 'Success', {
                        allowHtml: true
                    });
                    $uibModalInstance.close(true);
                } else {
                    $scope.post_submit_for_review();
                    $timeout(function(){
                        $state.go($state.current, null, {reload: true});
                    },2000);
                }
            };

            $scope.cancel = function () {
                $uibModalInstance.close(false);
                toastr.warning('Submit for Review Canceled', 'Canceled', {
                    allowHtml: true
                });
            };

        }]);
}());