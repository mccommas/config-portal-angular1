/**
 * Created by jmccommas on 1/18/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('feeCollectionCtrl', ["$scope", "$rootScope", "$state", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $rootScope, $state, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, formnotsave) {
            var feeCollectCtrl = this;
            var serverFeesUpload;
            var originalResetData;
            feeCollectCtrl.feeOptions = {
                rolling: "Rolling",
                deadline: "Deadline"
            };
            feeCollectCtrl.default_option = true;
            feeCollectCtrl.feeCollectData;

            var setFormPristine = function () {
                $timeout(function () {
                    $scope.feeCollectForm.$setPristine();
                    formnotsave.bindwatcher($scope.feeCollectForm);
                }, 1000);
            };
            if (local_environment) {
                serverFeesUpload = Restangular.all('app').all('data');
            } else {
                serverFeesUpload = Restangular.all('configuration');
            }

            var formatDate = function (dateFieldValue) {
                var year = dateFieldValue.getFullYear() + "";
                var month = (dateFieldValue.getMonth() + 1) + "";
                var day = dateFieldValue.getDate() + "";
                var dateFormat = month + "/" + day + "/" + year;
                return dateFormat;
            };
            var formatDateServer = function (dateFieldValue) {
                var year = dateFieldValue.getFullYear() + "";
                var month = (dateFieldValue.getMonth() + 1) + "";
                var day = dateFieldValue.getDate() + "";
                var dateFormat = year + "-" + month + "-" + day;
                return dateFormat;
            };
            var processFeeData = function (data) {
                originalResetData = angular.copy(data);
                feeCollectCtrl.feeCollectData = data;
                if (feeCollectCtrl.feeCollectData.fees && feeCollectCtrl.feeCollectData.fees.length) {
                    angular.forEach(feeCollectCtrl.feeCollectData.fees, function (fee, key) {
                        if (fee.deadlineDate == feeCollectCtrl.feeOptions.rolling) {
                            fee.optionRadio = feeCollectCtrl.feeOptions.rolling;
                            fee.deadlineDate = "";
                        } else {
                            fee.optionRadio = feeCollectCtrl.feeOptions.deadline;
                            fee.deadlineDate = new Date(fee.deadlineDate);
                        }
                    });
                } else {
                    feeCollectCtrl.addMoreFees();
                }
                setFormPristine();
            };

            feeCollectCtrl.post_fees_server = function () {
                var temp;
                angular.forEach(feeCollectCtrl.feeCollectData.fees, function (fee, key) {
                    if (fee.optionRadio == feeCollectCtrl.feeOptions.rolling) {
                        fee.deadlineDate = feeCollectCtrl.feeOptions.rolling;
                    } else {
                        temp = new Date(fee.deadlineDate);
                        fee.deadlineDate = formatDateServer(temp);
                    }
                    delete fee.opened;
                    delete fee.optionRadio;
                });
                serverFeesUpload.all("gatewayFeeCollection").post(feeCollectCtrl.feeCollectData).then(function (data) {
                    processFeeData(data);
                });
            };
            feeCollectCtrl.get_fees_data = function (url) {
                serverFeesUpload.get(url).then(function (data) {
                    processFeeData(data);
                });
            };

            //feeCollectCtrl.feeCollectData;

            feeCollectCtrl.addMoreFees = function () {
                if (!feeCollectCtrl.feeCollectData.fees) {
                    feeCollectCtrl.feeCollectData.fees = [];
                }
                feeCollectCtrl.feeCollectData.fees.push({
                    "id": null,
                    "paymentName": "",
                    "feeAmount": "",
                    "deadlineDate": "",
                    "optionRadio": feeCollectCtrl.feeOptions.deadline
                });
            };
            feeCollectCtrl.delete_fees_server = function (feeCollectionId) {
                if (feeCollectionId) {
                    var url = 'deleteFee/' + feeCollectionId;
                    serverFeesUpload.one(url).remove();
                }
            };

            feeCollectCtrl.removeFees = function (index) {
                if (!local_environment) {
                    feeCollectCtrl.delete_fees_server(feeCollectCtrl.feeCollectData.fees[index].id);
                }
                $timeout(function () {
                    feeCollectCtrl.feeCollectData.fees.splice(index, 1);
                    toastr.success('Fee Collection removed Successfully');
                });
            };
            // save
            feeCollectCtrl.showSubmit = false;
            feeCollectCtrl.save = function () {

                if (!local_environment) {
                    feeCollectCtrl.post_fees_server();
                    toastr.success('<b>Fee Collection saved Successfully</b>', '<b>Success</b>', {
                        allowHtml: true
                    });
                    $timeout(function () {
                        feeCollectCtrl.showSubmit = true;
                    }, 1000);
                    setFormPristine();
                } else {
                    toastr.success('<b>Fee Collection saved Successfully</b>', '<b>Success</b>', {
                        allowHtml: true
                    });
                    $timeout(function () {
                        feeCollectCtrl.showSubmit = true;
                    }, 1000);
                    setFormPristine();
                }

            };
            feeCollectCtrl.validateFormSave = function (callback) {

            };

            feeCollectCtrl.openReviewModal = function () {
                formnotsave.checkshowFormNotSaveForcefully($scope.feeCollectForm).then(function (data) {
                    if (data) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'components/appGateway/appGatewayEditor/fee/modals/submitReview.html',
                            controller: 'SubmitFeeReviewModal',
                            backdrop: 'static',
                            animation: false,
                            keyboard: false
                        });

                        modalInstance.result.then(function (isSubmitted) {
                            if (isSubmitted) {
                                $rootScope.$broadcast('feeSubmitted', null);
                                $state.go('appGatewayEditor.feeInReview');
                            }
                        });
                    }
                });
            };

            // reset
            feeCollectCtrl.reset = function () {

                if (local_environment) {
                    feeCollectCtrl.get_fees_data('gateway-fee-collect.json');
                } else {
                    feeCollectCtrl.get_fees_data("gatewayFeeCollection");
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Fee Collection Reset to Draft </b>', '<b>Success</b>', {
                    allowHtml: true
                });

            };

            if (local_environment) {
                feeCollectCtrl.get_fees_data('gateway-fee-collect.json');
            } else {
                feeCollectCtrl.get_fees_data("gatewayFeeCollection");
            }

            // Disable weekend selection
            $scope.disabled = function (date, mode) {
                //return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            };

            $scope.minDate = $scope.minDate ? null : new Date();

            // Open calendar for ng-repeat form
            $scope.open = function ($event, index) {
                $event.preventDefault();
                $event.stopPropagation();
                feeCollectCtrl.feeCollectData.fees[index].opened = !feeCollectCtrl.feeCollectData.fees[index].opened
            };
            // Open calendar for single default form
            $scope.openCalendar = function ($event, index) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
                $timeout(function () {
                    $("#" + index).focus();
                }, 3000);
            };


            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.initDate = new Date('2012/03/21');
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
            $scope.format = $scope.formats[4];


        }]);

}());