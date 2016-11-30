/**
 * Created by jmccommas on 1/11/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('supplementalReviewCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", 'formnotsave', "$state", "$rootScope",
        function ($scope, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, formnotsave, $state, $rootScope) {
            var suppReviewCtrl = this;
            var reviewData;

            suppReviewCtrl.userType;

            if (local_environment) {
                reviewData = Restangular.all('app').all('data');
            } else {
                reviewData = Restangular.all('configuration');
            }

            $rootScope.$on('headerdataloaded', function (event, data) {
                suppReviewCtrl.headerdata = data;
                suppReviewCtrl.userType = suppReviewCtrl.headerdata.userType;
            });

            suppReviewCtrl.get_page_data = function (url) {
                reviewData.get(url).then(function (data) {
                    suppReviewCtrl.suppReviewData = data;
                });
            };

            suppReviewCtrl.edit = function(){
                reviewData.all("gatewayStatus/supplemental_application").post('draft').then(function () {
                    $state.go('appGatewayEditor.supplemental', null ,{
                        reload: true
                    });
                });
            };

            suppReviewCtrl.resetToDraft = function(){
                reviewData.all("gatewayStatus/supplemental_application").post('draft').then(function () {
                    suppReviewCtrl.get_page_data('gatewaySectionMaterials/supplemental_application');
                    $state.go('appGatewayEditor.supplemental', null ,{
                        reload: true
                    });
                    toastr.success('Supplemental Application reset to draft', 'Success', {
                        allowHtml: true
                    });
                });

            };

            suppReviewCtrl.activate = function(){
                reviewData.all("gatewayStatus/supplemental_application").post('active').then(function () {
                    suppReviewCtrl.get_page_data('gatewaySectionMaterials/supplemental_application');
                    $state.go($state.current, null, {
                        reload: true
                    });
                    toastr.success('Supplemental Application is Active', 'Success', {
                        allowHtml: true
                    });
                });
            };

            suppReviewCtrl.activateModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/submitActivate.html',
                    controller: 'ActivateSuppModal',
                    backdrop: 'static',
                    animation: false,
                    keyboard: false
                });

                modalInstance.result.then(function (isSubmitted) {
                    if (isSubmitted) {
                        $rootScope.$broadcast('activateDocSubmitted', null);
                        $state.go('appGatewayEditor.suppInReview');
                    }
                });

            };

            if (local_environment) {
                suppReviewCtrl.get_page_data('gateway_supp_app_read_only.json');
            } else {
                suppReviewCtrl.get_page_data('gatewaySectionMaterials/supplemental_application');
            }


        }]);

}());