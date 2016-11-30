/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('offerExtendedCtrl', ["$scope", "$rootScope", "$timeout", "toastr", "$location", "$stateParams", "$state", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $rootScope, $timeout, toastr, $location, $stateParams, $state, $uibModal, Restangular, formnotsave) {
            var offerExtendedCtrl = this;
            var serverDocs;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.offerAcceptForm.$setPristine();
                    formnotsave.bindwatcher($scope.offerAcceptForm);
                }, 1000);
            };


            if (local_environment) {
                serverDocs = Restangular.all('app').all('data');
            } else {
                serverDocs = Restangular.all('configuration');
            }
            offerExtendedCtrl.get_page_data = function (url) {
                serverDocs.get(url).then(function (data) {
                    if (data && data.questionSet[0] && data.questionSet[0].questions[0]) {
                        if (data.questionSet[0].questions[0].questionText == "Please enter your question text") {
                            data.questionSet[0].questions[0].questionText = '';
                        }
                    }
                    offerExtendedCtrl.offerData = data;
                    setFormPristine();
                });
            };

            offerExtendedCtrl.post_documents_server = function (url) {
                serverDocs.all("gatewayExtendOffer").post(offerExtendedCtrl.offerData).then(function (data) {
                    offerExtendedCtrl.offerData = data;
                    toastr.success('Extend Offer saved successfully', 'Success', {
                        allowHtml: true
                    });
                    $scope.offerAcceptForm.$setPristine();
                });
            };
            offerExtendedCtrl.initModelXEdit = function (offerAcceptForm) {
                $scope.offerAcceptForm.$show();
                $timeout(function () {
                    $scope.offerAcceptForm.$hide();
                });
            };

            // save
            offerExtendedCtrl.showSubmit = false;

            offerExtendedCtrl.save = function () {
                $scope.offerAcceptForm.$save();
                if (local_environment) {
                    toastr.success('Extend Offer saved successfully', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function () {
                        offerExtendedCtrl.showSubmit = true;
                    }, 1000);
                    setFormPristine();
                } else {
                    offerExtendedCtrl.post_documents_server();
                }
                $timeout(function () {
                    offerExtendedCtrl.showSubmit = true;
                }, 1000);
                setFormPristine();
            };


            // reset
            offerExtendedCtrl.reset = function () {
                if (local_environment) {
                    offerExtendedCtrl.get_page_data('gateway_extendOffer.json');
                } else {
                    offerExtendedCtrl.get_page_data('gatewayExtendOffer');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Extend Offer reset Successfully</b>', '<b>Success</b>', {
                    allowHtml: true
                });
            };

            // Modal
            offerExtendedCtrl.openOfferModal = function () {
                formnotsave.checkshowFormNotSaveForcefully($scope.offerAcceptForm).then(function (data) {
                    if (data) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'components/appGateway/appGatewayEditor/offer/modals/submitReview.html',
                            controller: 'SubmitOfferReviewModal',
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
                    }
                });
            };

            if (local_environment) {
                offerExtendedCtrl.get_page_data('gateway_extendOffer.json');
            } else {
                offerExtendedCtrl.get_page_data('gatewayExtendOffer');
            }


        }]);



}());