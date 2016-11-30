/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('InterviewSchedulerController', ["$scope", "$rootScope", "$timeout", "toastr", "$location", "$stateParams", "$state", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $rootScope, $timeout, toastr, $location, $stateParams, $state, $uibModal, Restangular, formnotsave) {
            var interviewSchedCtrl = this;
            var serverDocs;

            var setFormPristine = function () {
                $timeout(function () {
                    $scope.interviewSchedForm.$setPristine();
                    formnotsave.bindwatcher($scope.interviewSchedForm);
                }, 1000);
            };


            if (local_environment) {
                serverDocs = Restangular.all('app').all('data');
            } else {
                serverDocs = Restangular.all('configuration');
            }
            interviewSchedCtrl.get_page_data = function (url) {
                serverDocs.get(url).then(function (data) {
                    interviewSchedCtrl.docsData = data;
                    setFormPristine();
                });
            };

            interviewSchedCtrl.post_documents_server = function (url) {
                serverDocs.all("gatewayScheduler").post(interviewSchedCtrl.docsData).then(function (data) {
                    interviewSchedCtrl.docsData = data;
                    toastr.success('Schedule Interview saved successfully', 'Success', {
                        allowHtml: true
                    });
                    setFormPristine();
                });
            };


            // save
            interviewSchedCtrl.showSubmit = false;
            interviewSchedCtrl.save = function () {
                if (local_environment) {
                    toastr.success('Schedule Interview saved successfully', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        interviewSchedCtrl.showSubmit = true;
                    },1000);
                    setFormPristine();
                } else {
                    interviewSchedCtrl.post_documents_server();
                }
                $timeout(function(){
                    interviewSchedCtrl.showSubmit = true;
                },1000);
                setFormPristine();
            };


            // reset
            interviewSchedCtrl.reset = function () {
                if (local_environment) {
                    interviewSchedCtrl.get_page_data('gatewaySectionContent.json');
                } else {
                    interviewSchedCtrl.get_page_data('gatewayScheduler');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Schedule Interview reset Successfully</b>', '<b>Success</b>', {
                    allowHtml: true
                });
            };

            // Modal
            interviewSchedCtrl.openReviewModal = function () {
                formnotsave.checkshowFormNotSaveForcefully($scope.interviewSchedForm).then(function (data) {
                    if (data) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'components/appGateway/appGatewayEditor/interview/modals/submitReview.html',
                            controller: 'SubmitInterviewReviewModal',
                            backdrop: 'static',
                            animation: false,
                            keyboard: false
                        });

                        modalInstance.result.then(function (isSubmitted) {
                            if (isSubmitted) {
                                $rootScope.$broadcast('interviewSubmitted', null);
                                $state.go('appGatewayEditor.interviewInReview');
                            }
                        });
                    }
                });
            };

            if (local_environment) {
                interviewSchedCtrl.get_page_data('gatewaySectionContent.json');
            } else {
                interviewSchedCtrl.get_page_data('gatewayScheduler');
            }
        }]);



}());