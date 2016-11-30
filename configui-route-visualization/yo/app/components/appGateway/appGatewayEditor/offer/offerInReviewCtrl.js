/**
 * Created by jmccommas on 1/11/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('offerInReviewCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "$state", "$rootScope",
        function ($scope, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, $state, $rootScope) {
            var offerInReviewCtrl = this;
            var reviewData;
            offerInReviewCtrl.userType;
            //offerInReviewCtrl.casid;

            $rootScope.$on('headerdataloaded', function (event, data) {
                offerInReviewCtrl.headerdata = data;
                offerInReviewCtrl.userType = offerInReviewCtrl.headerdata.userType;
            });

            if (local_environment) {
                reviewData = Restangular.all('app').all('data');
            } else {
                reviewData = Restangular.all('configuration');
            }

            offerInReviewCtrl.get_page_data = function (url) {
                reviewData.get(url).then(function (data) {
                    offerInReviewCtrl.offerInReviewData = data;
                });
            };

            offerInReviewCtrl.resetToDraft = function(){
                reviewData.all("gatewayStatus/extend_offer").post('draft').then(function () {
                    offerInReviewCtrl.get_page_data('gatewaySectionMaterials/extend_offer');
                    $state.go('appGatewayEditor.offer', null, {reload: true});
                    toastr.success('Extend Offer reset to draft', 'Success', {
                        allowHtml: true
                    });
                });
            };

            offerInReviewCtrl.edit = function(){
                reviewData.all("gatewayStatus/extend_offer").post('draft').then(function () {
                    $state.go('appGatewayEditor.offer', null, {reload: true});
                });
            };

            offerInReviewCtrl.activate = function(){
                reviewData.all("gatewayStatus/extend_offer").post('active').then(function () {
                    offerInReviewCtrl.get_page_data('gatewaySectionMaterials/extend_offer');
                    $state.go($state.current, null, {reload: true});
                    toastr.success('Extend Offer is Active', 'Success', {
                        allowHtml: true
                    });
                });
            };

            offerInReviewCtrl.activateModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/offer/modals/submitActivate.html',
                    controller: 'ActiveOfferModal',
                    backdrop: 'static',
                    animation: false,
                    keyboard: false
                });

                modalInstance.result.then(function (isSubmitted) {
                    if (isSubmitted) {
                        $rootScope.$broadcast('offerSubmitted', null);
                        $state.go('appGatewayEditor.offerInReview');
                    }
                });

            };

            if (local_environment) {
                offerInReviewCtrl.get_page_data('gateway_extendOffer_content.json');
            } else {
                offerInReviewCtrl.get_page_data('gatewaySectionMaterials/extend_offer');
            }

        }]);

}());