/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('supplementalAppCtrl', ["$scope", "$rootScope", "$routeParams", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "$state", "formnotsave", "getGatewaySecResolved",
        function ($scope, $rootScope, $routeParams, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, $state, formnotsave, getGatewaySecResolved) {
            var suppAppCtrl = this;
            var serverSuppHome;

            if (local_environment) {
                serverSuppHome = Restangular.all('app').all('data');
            } else {
                serverSuppHome = Restangular.all('configuration');
            }

            var setFormPristine = function () {
                $timeout(function () {
                    $scope.supplementalApps.$setPristine();
                    formnotsave.bindwatcher($scope.supplementalApps);
                },1000);
            };

            suppAppCtrl.get_page_data = function (url) {
                serverSuppHome.get(url).then(function (data) {
                    suppAppCtrl.suppHomeData = data;
                    setFormPristine();
                });
            };


            suppAppCtrl.post_suppHome_server = function (url) {
                serverSuppHome.all("gateway/supplemental_application").post(suppAppCtrl.suppHomeData).then(function (data) {
                    suppAppCtrl.suppHomeData = data;
                    setFormPristine();
                    toastr.success('Supplemental Application Changes Saved', 'Success', {
                        allowHtml: true
                    });
                });
            };

            // save
            suppAppCtrl.save = function () {
                if (local_environment) {
                    setFormPristine();
                    toastr.success('Supplemental Application Changes Saved', 'Success', {
                        allowHtml: true
                    });
                } else {
                    suppAppCtrl.post_suppHome_server();
                }
            };
            // save
            suppAppCtrl.continueSave = function () {
                if (local_environment) {
                    setFormPristine();
                    toastr.success('Supplemental Application Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        $state.go('appGatewayEditor.suppQuest')
                    },3000);
                } else {
                    suppAppCtrl.post_suppHome_server();
                    $timeout(function(){
                        $state.go('appGatewayEditor.suppQuest')
                    },3000);
                }
            };

            // reset
            suppAppCtrl.reset = function () {
                if (local_environment) {
                    suppAppCtrl.get_page_data('gatewaySectionContent.json');
                } else {
                    suppAppCtrl.get_page_data('gateway/supplemental_application');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Supplemental Application Description Reset Successful</b>', '<b>Success!</b>', {
                    allowHtml: true
                });
            };
            if (local_environment) {
                suppAppCtrl.get_page_data('gatewaySectionContent.json');
            } else {
                suppAppCtrl.get_page_data('gateway/supplemental_application');
            }
        }]);
}());