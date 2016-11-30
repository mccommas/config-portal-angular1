/**
 * Created by jmccommas on 1/7/15.
 */

(function () {
    'use strict';
    configAppControllers.controller('ApplicationsListCtrl', ['$scope', '$kWindow', '$location', '$route', 'Restangular', '$stateParams', '$uibModal', '$timeout', 'toastr', '$rootScope', '$q',
        function ($scope, $kWindow, $route, $location, Restangular, $stateParams, $uibModal, $timeout, toastr, $rootScope, $q) {
            var appCtrl = this;
            var applicationGatewayServer;
            if (local_environment) {
                applicationGatewayServer = Restangular.all('app').all('data');
            } else {
                applicationGatewayServer = Restangular.all('configuration');
            }
            appCtrl.getCorrectTimeZoneOffeset = function (value) {
                var temp = new Date(value.replace(/-/g, '/'));
                return new Date(temp.getTime() + temp.getTimezoneOffset() * 60000);
            };

            appCtrl.get_application_data = function (url) {
                applicationGatewayServer.get(url).then(function (data) {
                    appCtrl.applicationDetails = data;
                });
            };


            appCtrl.get_LK_programs = function () {
                applicationGatewayServer.get("/LK_Program").then(function (data) {
                    appCtrl.lookupPrograms = data;
                });
            };

            if (local_environment) {
                appCtrl.get_application_data('gateway-list.json');
                $timeout(function () {
                    appCtrl.lookupPrograms = $scope.OrglistPrograms.programs;
                }, 500);
            } else {
                appCtrl.get_application_data('gatewayList');
                appCtrl.get_LK_programs();
            }
            // Add Program Modal
            $scope.openAddApplicantWindow = function () {
                $scope.title = "add applicant gateway";
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: $scope.title,
                    width: 700,
                    templateUrl: 'components/dashboard/applicationDetails/appListing/applicantAddModal.html',
                    controller: 'applicantAddModalCtrl as AddModalCtrl',
                    resolve: {
                        programsData: function () {
                            return appCtrl.lookupPrograms;
                        }
                    }
                });

                windowInstance.result.then(function (result) {
                    if (result) {
                        appCtrl.applicationDetails.unshift(result);
                        if (!local_environment) {
                            appCtrl.get_LK_programs();
                        }
                        //Increment count
                        if (!$scope.headerOrgdata.gatewayCount) {
                            $scope.headerOrgdata.gatewayCount = 0;
                        }
                        $scope.headerOrgdata.gatewayCount = parseInt($scope.headerOrgdata.gatewayCount, 10) + 1;
                    }
                });

            };

        } // end functions

    ]); // end controller function
}());