/**
 * Created by jmccommas on 1/11/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('supplementalPayCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", 'formnotsave', "$state", "$rootScope",
        function ($scope, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, formnotsave, $state, $rootScope) {
            var suppPayCtrl = this;
            var serverFees;
            //suppPayCtrl.numberPattern = /^\$?[0-9][0-9\,]*(\.\d{1,2})?$|^\$?[\.]([\d][\d]?)$/;
            suppPayCtrl.numberPattern = /^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;


            if (local_environment) {
                serverFees = Restangular.all('app').all('data');
            } else {
                serverFees = Restangular.all('configuration');
            }
            var setFormPristine = function () {
                $timeout(function () {
                    if ($scope.paymentForm) {
                        $scope.paymentForm.$setPristine();
                        formnotsave.bindwatcher($scope.paymentForm);
                    }
                }, 1000);
            };
            suppPayCtrl.get_page_data = function (url) {
                serverFees.get(url).then(function (data) {
                    suppPayCtrl.suppFeeData = data;
                    setFormPristine();
                });
            };


            suppPayCtrl.post_suppFees_server = function (url) {
                serverFees.all("gatewayFee").post(suppPayCtrl.suppFeeData).then(function (data) {
                    suppPayCtrl.suppFeeData = data;
                    setFormPristine();
                    toastr.success('Payment Changes Saved', 'Success', {
                        allowHtml: true
                    });
                });
            };


            // save
            suppPayCtrl.showSubmit = false;
            suppPayCtrl.save = function () {
                if (local_environment) {
                    toastr.success('Payment Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        suppPayCtrl.showSubmit = true;
                    },1000);
                    setFormPristine();
                } else {
                    suppPayCtrl.post_suppFees_server();
                    $timeout(function(){
                        suppPayCtrl.showSubmit = true;
                    },1000);
                    setFormPristine();
                }
            };


            suppPayCtrl.openReviewModal = function () {
                formnotsave.checkshowFormNotSaveForcefully($scope.paymentForm).then(function (data) {
                    if (data) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/submitReview.html',
                            controller: 'SubmitSuppReviewModal',
                            backdrop: 'static',
                            animation: false,
                            keyboard: false
                        });

                        modalInstance.result.then(function (isSubmitted) {
                            if (isSubmitted) {
                                $rootScope.$broadcast('supplementSubmitted', null);
                                $state.go('appGatewayEditor.suppInReview');
                            }
                        });
                    }
                });
            };


            // reset
            suppPayCtrl.reset = function () {

                if (local_environment) {
                    suppPayCtrl.get_page_data('gateway_fee.json');
                } else {
                    suppPayCtrl.get_page_data("gatewayFee");
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Payment Reset Successful</b>', '<b>Success</b>', {
                    allowHtml: true
                });

            };
            if (local_environment) {
                suppPayCtrl.get_page_data('gateway_fee.json');
            } else {
                suppPayCtrl.get_page_data('gatewayFee');
            }
        }]);

}());