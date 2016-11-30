/**
 * Created by jmccommas on 1/7/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('applicantAddModalCtrl', ["$timeout", "$state", "toastr", "$stateParams", "$location", "Restangular", "$windowInstance", "$scope", "$rootScope", "$q", "programsData",
        function ($timeout, $state, toastr, $stateParams, $location, Restangular, $windowInstance, $scope, $rootScope, $q, programsData) {
            var AddModalCtrl = this;
            var serverGatewayModal;

            if (local_environment) {
                serverGatewayModal = Restangular.all('app').all('data');
            } else {
                serverGatewayModal = Restangular.all('configuration');
            }

            AddModalCtrl.ProgramsList = programsData;


            AddModalCtrl.cancel = function () {
                $windowInstance.close(null);
                toastr.warning('Add Applicant Gateway Canceled', '<b>Canceled</b>', {
                    allowHtml: true
                });
            };

            AddModalCtrl.resetGateway = function () {
                AddModalCtrl.gatewayName = "";
                AddModalCtrl.selectedProgram = "";
                toastr.info('Adding applicant gateway reset', '<b>Success</b>', {
                    allowHtml: true
                });
            };
            AddModalCtrl.add_Gateway_server = function (data) {
                serverGatewayModal.all("saveGatewayInstance/" + AddModalCtrl.selectedProgram.id).post(data).then(function (data) {
                    $windowInstance.close(data);
                });
            };


            AddModalCtrl.saveGateway = function () {
                if (AddModalCtrl.gatewayName && AddModalCtrl.selectedProgram) {
                    var temp = {
                        "id": Math.floor((Math.random() * 1000) + 1),
                        "name": AddModalCtrl.gatewayName,
                        "programName": AddModalCtrl.selectedProgram.programName,
                        "status": "active",
                        "createdDate": "2014-10-01",
                        "updatedDate": "2014-10-01"
                    };

                    if (!local_environment) {
                        AddModalCtrl.add_Gateway_server({
                            "name": AddModalCtrl.gatewayName
                        });
                    } else {
                        $windowInstance.close(temp);
                    }
                }

                toastr.success('<b>' + AddModalCtrl.gatewayName + '</b><br>' + ' added', '<b>Success</b>', {
                    allowHtml: true
                });
                //$state.go('programslist.applications', null, {
                //    reload: true
                //
                //});
            };
            //
            AddModalCtrl.showPreview = function (item, element) {
                $timeout(function () {
                    $(".ui-select-choices-row").attr("title", item.programName);
                });
            };

        }]);
}());