/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('InterviewController', ["$scope", "$timeout", "toastr", "$location", "$stateParams","$state", "$uibModal", "Restangular", "formnotsave",
        function ($scope, $timeout, toastr, $location, $stateParams,$state, $uibModal, Restangular, formnotsave) {
            var interviewCtrl = this;
            var serverDocs;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.interviewForm.$setPristine();
                    formnotsave.bindwatcher($scope.interviewForm);

                },1000);
            };

            if (local_environment) {
                serverDocs = Restangular.all('app').all('data');
            } else {
                serverDocs = Restangular.all('configuration');
            }
            interviewCtrl.get_page_data = function (url) {
                serverDocs.get(url).then(function (data) {
                    interviewCtrl.docsData = data;
                    setFormPristine();
                });
            };

            interviewCtrl.post_documents_server = function (url) {
                serverDocs.all("gateway/interview_scheduler").post(interviewCtrl.docsData).then(function (data) {
                    interviewCtrl.docsData = data;
                    toastr.success('Schedule Interview Change Saved', 'Success', {
                        allowHtml: true
                    });
                    $scope.interviewForm.$setPristine();
                });
            };


            // save
            interviewCtrl.save = function () {
                if (local_environment) {
                    $scope.interviewForm.$setPristine();
                    toastr.success('Schedule Interview Change Saved', 'Success', {
                        allowHtml: true
                    });
                } else {
                    interviewCtrl.post_documents_server();
                    $scope.interviewForm.$setPristine();
                }
            };
            interviewCtrl.continueSave = function () {
                if (local_environment) {
                    $scope.interviewForm.$setPristine();
                    toastr.success('Schedule Interview Change Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        $state.go('appGatewayEditor.interview-scheduler')
                    },3000)
                } else {
                    interviewCtrl.post_documents_server();
                    $scope.interviewForm.$setPristine();
                    $timeout(function(){
                        $state.go('appGatewayEditor.interview-scheduler')
                    },3000)
                }
            };


            // reset
            interviewCtrl.reset = function () {
                if (local_environment) {
                    interviewCtrl.get_page_data('gatewaySectionContent.json');
                } else {
                    interviewCtrl.get_page_data('gateway/interview_scheduler');
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.success('Schedule Interview Reset Successful', 'Success', {
                    allowHtml: true
                });
            };
            if (local_environment) {
                interviewCtrl.get_page_data('gatewaySectionContent.json');
            } else {
                interviewCtrl.get_page_data('gateway/interview_scheduler');
            }
        }]);
}());