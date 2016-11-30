/**
 * Created by jmccommas on 1/11/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('documentInReviewCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "$state", "$rootScope",
        function ($scope, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, $state, $rootScope) {
            var docInReviewCtrl = this;
            var reviewData;
            docInReviewCtrl.userType;
            //docInReviewCtrl.casid;

            $rootScope.$on('headerdataloaded', function (event, data) {
                docInReviewCtrl.headerdata = data;
                docInReviewCtrl.userType = docInReviewCtrl.headerdata.userType;
            });

            if (local_environment) {
                reviewData = Restangular.all('app').all('data');
            } else {
                reviewData = Restangular.all('configuration');
            }

            docInReviewCtrl.get_page_data = function (url) {
                reviewData.get(url).then(function (data) {
                    docInReviewCtrl.docInReviewData = data;
                });
            };

            docInReviewCtrl.resetToDraft = function(){
                reviewData.all("gatewayStatus/document_upload").post('draft').then(function () {
                    docInReviewCtrl.get_page_data('gatewaySectionMaterials/document_upload');
                    $state.go('appGatewayEditor.documents', null, {reload: true});
                    toastr.success('Collect Documents reset to draft', 'Success', {
                        allowHtml: true
                    });
                });
            };

            docInReviewCtrl.edit = function(){
                reviewData.all("gatewayStatus/document_upload").post('draft').then(function () {
                    $state.go('appGatewayEditor.documents', null, {reload: true});
                });
            };

            docInReviewCtrl.activate = function(){
                reviewData.all("gatewayStatus/document_upload").post('active').then(function () {
                    docInReviewCtrl.get_page_data('gatewaySectionMaterials/document_upload');
                    $state.go($state.current, null, {reload: true});
                    toastr.success('Collect Documents is Active', 'Success', {
                        allowHtml: true
                    });
                });
            };

            docInReviewCtrl.activateModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/documents/modals/submitActivate.html',
                    controller: 'ActiveDocModal',
                    backdrop: 'static',
                    animation: false,
                    keyboard: false
                });

                modalInstance.result.then(function (isSubmitted) {
                    if (isSubmitted) {
                        $rootScope.$broadcast('activateDocSubmitted', null);
                        $state.go('appGatewayEditor.docInReview');
                    }
                });

            };

            if (local_environment) {
                docInReviewCtrl.get_page_data('gateway_doc_read_only.json');
            } else {
                docInReviewCtrl.get_page_data('gatewaySectionMaterials/document_upload');
            }

        }]);

}());