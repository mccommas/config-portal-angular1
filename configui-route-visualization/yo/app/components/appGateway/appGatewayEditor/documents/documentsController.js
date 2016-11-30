/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appDocumentCtrl', ["$scope", "$timeout", "toastr", "$location", "$stateParams","$state", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $timeout, toastr, $location, $stateParams,$state, $uibModal, Restangular, formnotsave) {
            var appDocCtrl = this;
            var serverDocs;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.appGatewayDocuments.$setPristine();
                    formnotsave.bindwatcher($scope.appGatewayDocuments);

                },1000);
            };

            if (local_environment) {
                serverDocs = Restangular.all('app').all('data');
            } else {
                serverDocs = Restangular.all('configuration');
            }
            appDocCtrl.get_page_data = function (url) {
                serverDocs.get(url).then(function (data) {
                    appDocCtrl.docsData = data;
                    setFormPristine();
                });
            };

            appDocCtrl.post_documents_server = function (url) {
                serverDocs.all("gateway/document_upload").post(appDocCtrl.docsData).then(function (data) {
                    appDocCtrl.docsData = data;
                    toastr.success('Collect Documents Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $scope.appGatewayDocuments.$setPristine();
                });
            };


            // save
            appDocCtrl.save = function () {
                if (local_environment) {
                    $scope.appGatewayDocuments.$setPristine();
                    toastr.success('Collect Documents Changes Saved', 'Success', {
                        allowHtml: true
                    });
                } else {
                    appDocCtrl.post_documents_server();
                }
            };
            // save
            appDocCtrl.continueSave = function () {
                if (local_environment) {
                    $scope.appGatewayDocuments.$setPristine();
                    toastr.success('Collect Documents Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        $state.go('appGatewayEditor.documents-upload')
                    },3000)
                } else {
                    appDocCtrl.post_documents_server();
                    $timeout(function(){
                        $state.go('appGatewayEditor.documents-upload')
                    },3000)
                }
            };


            // reset
            appDocCtrl.reset = function () {
                if (local_environment) {
                    appDocCtrl.get_page_data('gatewaySectionContent.json');
                } else {
                    appDocCtrl.get_page_data('gateway/document_upload');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('Collect Documents Description Reset Successful', 'Success', {
                    allowHtml: true
                });
            };
            if (local_environment) {
                appDocCtrl.get_page_data('gatewaySectionContent.json');
            } else {
                appDocCtrl.get_page_data('gateway/document_upload');
            }
        }]);



}());