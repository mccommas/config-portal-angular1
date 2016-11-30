/**
 * Created by jmccommas on 1/11/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('feeInReviewCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "$state", "$rootScope",
        function ($scope, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, $state, $rootScope) {
            var feeReviewCtrl = this;
            var reviewData;
            feeReviewCtrl.userType;
            //feeReviewCtrl.casid;

            $rootScope.$on('headerdataloaded', function (event, data) {
                feeReviewCtrl.headerdata = data;
                feeReviewCtrl.userType = feeReviewCtrl.headerdata.userType;
            });

            if (local_environment) {
                reviewData = Restangular.all('app').all('data');
            } else {
                reviewData = Restangular.all('configuration');
            }

            feeReviewCtrl.get_page_data = function (url) {
                reviewData.get(url).then(function (data) {
                    feeReviewCtrl.feeInReviewData = data;
                });
            };

            feeReviewCtrl.resetToDraft = function(){
                reviewData.all("gatewayStatus/fee_collection").post('draft').then(function () {
                    feeReviewCtrl.get_page_data('gatewaySectionMaterials/document_upload');
                    $state.go('appGatewayEditor.fee', null, {reload: true});
                    toastr.success('Fee Collection reset Successfully ', 'Success', {
                        allowHtml: true
                    });
                });
            };

            feeReviewCtrl.edit = function(){
                reviewData.all("gatewayStatus/fee_collection").post('draft').then(function () {
                    $state.go('appGatewayEditor.fee', null, {reload: true});
                });
            };

            feeReviewCtrl.activate = function(){
                reviewData.all("gatewayStatus/fee_collection").post('active').then(function () {
                    feeReviewCtrl.get_page_data('gatewaySectionMaterials/fee_collection');
                    $state.go($state.current, null, {reload: true});
                    toastr.success('Fee Collection is Active', 'Success', {
                        allowHtml: true
                    });
                });
            };

            feeReviewCtrl.activateModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/fee/modals/submitActivate.html',
                    controller: 'ActiveFeeModal',
                    backdrop: 'static',
                    animation: false,
                    keyboard: false
                });

                modalInstance.result.then(function (isSubmitted) {
                    if (isSubmitted) {
                        $rootScope.$broadcast('activateFeeSubmitted', null);
                        $state.go('appGatewayEditor.feeInReview');
                    }
                });

            };

            if (local_environment) {
                feeReviewCtrl.get_page_data('gateway_doc_read_only.json');
            } else {
                feeReviewCtrl.get_page_data('gatewaySectionMaterials/fee_collection');
            }

        }]);

}());