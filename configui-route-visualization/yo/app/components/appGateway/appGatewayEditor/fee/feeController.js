/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appFeeCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams", "$state", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $timeout, toastr, $location, $stateParams, $state, $uibModal, Restangular, formnotsave) {
            var feeCtrl = this;
            var serverFees;
            feeCtrl.modifyHtml = function (html) {
                var temp;
                html = html.replace('<pre', '<div');
                html = html.replace('</pre>', '</div>');
                $('body').append("<div id='tempDiv'>" + html + "</div>");
                $('#tempDiv').find("*").removeAttr("style");
                temp = $('#tempDiv').html();
                $('#tempDiv').remove();
                return temp;
            };
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.appGatewayFees.$setPristine();
                    formnotsave.bindwatcher($scope.appGatewayFees);

                }, 1000);
            };

            if (local_environment) {
                serverFees = Restangular.all('app').all('data');
            } else {
                serverFees = Restangular.all('configuration');
            }
            feeCtrl.get_page_data = function (url) {
                serverFees.get(url).then(function (data) {
                    feeCtrl.feeData = data;
                    setFormPristine();
                });
            };

            feeCtrl.post_fees_server = function (url) {
                serverFees.all("gateway/fee_collection").post(feeCtrl.feeData).then(function (data) {
                    feeCtrl.feeData = data;
                    toastr.success('Fee Collection Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $scope.appGatewayFees.$setPristine();
                });
            };


            // save
            feeCtrl.save = function () {
                if (local_environment) {
                    $scope.appGatewayFees.$setPristine();
                    toastr.success('Fee Collection Changes Saved', 'Success', {
                        allowHtml: true
                    });
                } else {
                    feeCtrl.post_fees_server();
                }
            };
            // save
            feeCtrl.continueSave = function () {
                if (local_environment) {
                    $scope.appGatewayFees.$setPristine();
                    toastr.success('Fee Collection Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function () {
                        $state.go('appGatewayEditor.fee-collection')
                    }, 3000)
                } else {
                    feeCtrl.post_fees_server();
                    $timeout(function () {
                        $state.go('appGatewayEditor.fee-collection')
                    }, 3000)
                }
            };


            // reset
            feeCtrl.reset = function () {
                if (local_environment) {
                    feeCtrl.get_page_data('gatewaySectionContent.json');
                } else {
                    feeCtrl.get_page_data('gateway/fee_collection');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('Fee Collection Description Reset Successful', 'Success', {
                    allowHtml: true
                });
            };
            if (local_environment) {
                feeCtrl.get_page_data('gatewaySectionContent.json');
            } else {
                feeCtrl.get_page_data('gateway/fee_collection');
            }
                    }]);

}());