/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appOfferCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams","$state", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $timeout, toastr, $location, $stateParams,$state, $uibModal, Restangular, formnotsave) {
            var offerCtrl = this;
            var serverDocs;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.offerForm.$setPristine();
                    formnotsave.bindwatcher($scope.offerForm);

                },1000);
            };

            if (local_environment) {
                serverDocs = Restangular.all('app').all('data');
            } else {
                serverDocs = Restangular.all('configuration');
            }
            offerCtrl.get_page_data = function (url) {
                serverDocs.get(url).then(function (data) {
                    offerCtrl.offerData = data;
                    setFormPristine();
                });
            };

            offerCtrl.post_documents_server = function (url) {
                serverDocs.all("gateway/extend_offer").post(offerCtrl.offerData).then(function (data) {
                    offerCtrl.offerData = data;
                    toastr.success('Extend Offer Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    setFormPristine();
                });
            };


            // save
            offerCtrl.save = function () {
                if (local_environment) {
                    setFormPristine();
                    toastr.success('Extend Offer Changes Saved', 'Success', {
                        allowHtml: true
                    });
                } else {
                    offerCtrl.post_documents_server();
                    setFormPristine();
                }
            };
            offerCtrl.continueSave = function () {
                if (local_environment) {
                    setFormPristine();
                    toastr.success('Extend Offer saved successfully', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        $state.go('appGatewayEditor.offer-extend')
                    },3000)
                } else {
                    offerCtrl.post_documents_server();
                    setFormPristine();
                    $timeout(function(){
                        $state.go('appGatewayEditor.offer-extend')
                    },3000)
                }
            };


            // reset
            offerCtrl.reset = function () {
                if (local_environment) {
                    offerCtrl.get_page_data('gateway_extendOffer_content.json');
                } else {
                    offerCtrl.get_page_data('gateway/extend_offer');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('Extend Offer Description Reset Successful', 'Success', {
                    allowHtml: true
                });
            };
            if (local_environment) {
                offerCtrl.get_page_data('gateway_extendOffer_content.json');
            } else {
                offerCtrl.get_page_data('gateway/extend_offer');
            }
        }]);



}());