/**
 * Created by jmccommas on 1/11/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('interviewInReviewCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "$state", "$rootScope",
        function ($scope, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, $state, $rootScope) {
            var interInReviewCtrl = this;
            var reviewData;
            interInReviewCtrl.userType;
            //interInReviewCtrl.casid;

            $rootScope.$on('headerdataloaded', function (event, data) {
                interInReviewCtrl.headerdata = data;
                interInReviewCtrl.userType = interInReviewCtrl.headerdata.userType;
            });

            if (local_environment) {
                reviewData = Restangular.all('app').all('data');
            } else {
                reviewData = Restangular.all('configuration');
            }

            interInReviewCtrl.get_page_data = function (url) {
                reviewData.get(url).then(function (data) {
                    interInReviewCtrl.interInReviewData = data;
                });
            };

            interInReviewCtrl.resetToDraft = function(){
                reviewData.all("gatewayStatus/interview_scheduler").post('draft').then(function () {
                    interInReviewCtrl.get_page_data('gatewaySectionMaterials/interview_scheduler');
                    $state.go('appGatewayEditor.interview', null, {reload: true});
                    toastr.success('Schedule Interview reset to draft', 'Success', {
                        allowHtml: true
                    });
                });
            };

            interInReviewCtrl.edit = function(){
                reviewData.all("gatewayStatus/interview_scheduler").post('draft').then(function () {
                    $state.go('appGatewayEditor.interview', null, {reload: true});
                });
            };

            interInReviewCtrl.activate = function(){
                reviewData.all("gatewayStatus/interview_scheduler").post('active').then(function () {
                    interInReviewCtrl.get_page_data('gatewaySectionMaterials/interview_scheduler');
                    $state.go($state.current, null, {reload: true});
                    toastr.success('Schedule Interview is Active', 'Success', {
                        allowHtml: true
                    });
                });
            };

            interInReviewCtrl.activateModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/interview/modals/submitActivate.html',
                    controller: 'ActiveInterviewModal',
                    backdrop: 'static',
                    animation: false,
                    keyboard: false
                });

                modalInstance.result.then(function (isSubmitted) {
                    if (isSubmitted) {
                        $rootScope.$broadcast('interviewSubmitted', null);
                        $state.go('appGatewayEditor.interviewInReview');
                    }
                });

            };

            if (local_environment) {
                interInReviewCtrl.get_page_data('gateway_doc_read_only.json');
            } else {
                interInReviewCtrl.get_page_data('gatewaySectionMaterials/interview_scheduler');
            }

        }]);

}());