(function () {
    "use strict";
    configAppControllers.controller('SubmitDocReviewModal', ["$scope", "$state", "toastr", "$timeout", "$uibModalInstance", "$location", "Restangular",
        function ($scope, $state, toastr, $timeout, $uibModalInstance, $location, Restangular) {
            var serverSubmit;
            var submitForReview;


            if (local_environment) {
                serverSubmit = Restangular.all('app').all('data');
            } else {
                serverSubmit = Restangular.all('configuration');
            }

            $scope.post_submit_for_review = function () {
                serverSubmit.all("gatewayStatus/document_upload").post('review').then(function (data) {
                    $uibModalInstance.close(true);
                    toastr.success('Collect Documents Activity Submitted for Review', 'Success', {
                        allowHtml: true
                    });
                    $state.go('appGatewayEditor.docInReview', null, {reload: true});
                    $('#loading-indicator').show();
                });
            };

            $scope.submitReview = function () {
                if (local_environment) {
                    toastr.success('Collect Documents Activity Submitted for Review', 'Success', {
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
                toastr.warning('Submit for review canceled', 'Canceled', {
                    allowHtml: true
                });
            };

        }]);
}());