/**
 * Created by jmccommas on 1/18/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('documentUploadCtrl', ["$scope", "$rootScope", "$state", "$timeout", "toastr", "$location", "$stateParams", "$uibModal", "Restangular", "formnotsave", "$interval",
        function ($scope, $rootScope, $state, $timeout, toastr, $location, $stateParams, $uibModal, Restangular, formnotsave, $interval) {
            var docUploadCtrl = this;
            var serverDocUpload;
            var originalResetData;

            $scope.isCollapsed = true;
            docUploadCtrl.uploadDocument;
            docUploadCtrl.minOptionChanged = function (min, max) {
                if (min && max) {
                    if (min > max) {
                        max = [];
                        toastr.error("Min Required cant be more than Max Allowed");
                    }
                }
            };
            docUploadCtrl.dataMaxAllowedFrom0 = _Max_Allowed_From_0;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.documentsUpload.$setPristine();
                    formnotsave.bindwatcher($scope.documentsUpload);
                }, 1000);
            };
            if (local_environment) {
                serverDocUpload = Restangular.all('app').all('data');
            } else {
                serverDocUpload = Restangular.all('configuration');
            }

            docUploadCtrl.post_documents_server = function () {
                serverDocUpload.all("gatewayDocuments").post(docUploadCtrl.uploadDocument).then(function (data) {
                    docUploadCtrl.uploadDocument = data;
                });
            };

            docUploadCtrl.get_document_data = function (url) {
                serverDocUpload.get(url).then(function (data) {
                    originalResetData = angular.copy(data);
                    docUploadCtrl.uploadDocument = data;
                    setFormPristine();
                });
            };

            //docUploadCtrl.uploadDocument;

            docUploadCtrl.add_documents = function () {
                if (!docUploadCtrl.newdocumentType) {
                    alert('Document Type can not be left blank');
                } else {
                    if (!docUploadCtrl.uploadDocument.documents) {
                        docUploadCtrl.uploadDocument.documents = [];
                    }
                    if (docUploadCtrl.uploadDocument.documents.length < 30) {
                        docUploadCtrl.uploadDocument.documents.push({
                            "id": null,
                            "minRequired": 1,
                            "documentType": docUploadCtrl.newdocumentType,
                            "maxAllowed": 1,
                            "isRequest": true,
                            "isRequired": ""
                        });
                        docUploadCtrl.newdocumentType = "";
                    } else {
                        toastr.info("Maximum limit reached");
                    }
                }
            };
            docUploadCtrl.delete_documents_server = function (documentTypeId) {
                if (!local_environment) {
                    if (documentTypeId) {
                        var url = 'deleteDocument/' + documentTypeId;
                        serverDocUpload.one(url).remove();

                    }
                }
            };

            docUploadCtrl.remove_documents = function (index) {
                docUploadCtrl.delete_documents_server(docUploadCtrl.uploadDocument.documents[index].id);
                docUploadCtrl.uploadDocument.documents.splice(index, 1);
                toastr.success('Document Deleted', 'Success', {
                    allowHtml: true
                });

            };
            // save
            docUploadCtrl.showSubmit = false;
            docUploadCtrl.save = function () {
                $('.chkRequest').each(function () {
                    docUploadCtrl.uploadDocument.documents[$(this).attr('dtoindex')].isRequest = $(this).hasClass('On');
                });

                if (!local_environment) {
                    docUploadCtrl.post_documents_server();
                    toastr.success('Collect Documents Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        docUploadCtrl.showSubmit = true;
                    },1000);
                    setFormPristine();
                } else {
                    toastr.success('Collect Documents Changes Saved', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function(){
                        docUploadCtrl.showSubmit = true;
                    },1000);
                    setFormPristine();
                }

            };
            docUploadCtrl.validateFormSave = function (callback) {

            };

            docUploadCtrl.openReviewModal = function () {
                formnotsave.checkshowFormNotSaveForcefully($scope.documentsUpload).then(function (data) {
                    if (data) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'components/appGateway/appGatewayEditor/documents/modals/submitReview.html',
                            controller: 'SubmitDocReviewModal',
                            backdrop: 'static',
                            animation: false,
                            keyboard: false
                        });

                        modalInstance.result.then(function (isSubmitted) {
                            if (isSubmitted) {
                                $rootScope.$broadcast('documentSubmitted', null);
                                $state.go('appGatewayEditor.docInReview');
                            }
                        });
                    }
                });
            };

            // reset
            docUploadCtrl.reset = function () {

                if (local_environment) {
                    docUploadCtrl.get_document_data('Gateway-DocumentList.json');
                } else {
                    docUploadCtrl.get_document_data("gatewayDocuments");
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('Collect Documents Reset Successful', 'Success', {
                    allowHtml: true
                });

            };
            docUploadCtrl.cancel = function () {
                docUploadCtrl.newdocumentType = "";
                $timeout(function () {
                    $scope.isCollapsed = true;
                }, 500);
            };

            if (local_environment) {
                docUploadCtrl.get_document_data('Gateway-DocumentList.json');
            } else {
                docUploadCtrl.get_document_data("gatewayDocuments");
            }

            docUploadCtrl.bind_toggle_event = function () {
                // Switch toggle
                $(function () {

                    $('.parent').each(function (index, element) {
                        if ($(this).hasClass("Off")) {
                            $(this).parent(".col-xs-2").next(".col-xs-2").children(".child").unbind("click").css({
                                "opacity": "0.5"
                            }).addClass("ub-click");
                        }
                    });


                    $('.Switch').unbind("click");
                    $('.Switch').click(function () {

                        if ($(this).hasClass("child") && $(this).hasClass("ub-click")) {
                            $(this).unbind('click');
                        } else if ($(this).hasClass("parent")) {
                            $(this).toggleClass('On').toggleClass('Off');
                            $(this).parent("td").next("td").children(".child").animate({
                                "opacity": "1"
                            }).removeClass("ub-click");


                        } else {

                            $(this).toggleClass('On').toggleClass('Off');
                        }


                    });
                });

            };
            docUploadCtrl.isAtLeastOneON = false;

            $interval(function () {
                docUploadCtrl.bind_toggle_event();
                if ($(".documentsList .On").length > 0) {
                    docUploadCtrl.isAtLeastOneON = true;
                } else {
                    docUploadCtrl.isAtLeastOneON = false;
                }
            }, 500);
            $timeout(function () {
                $scope.alerts = [
                    {
                        type: 'danger',
                        msg: 'You need to request at least one document.'
                    }
                ];
            }, 2000)

        }]);
    configAppControllers.filter('filterMinValue', function() {
        return function(lookkupValues, minValue) {
            return _.filter([1, 2, 3, 4, 5], function(num){ return num >= minValue });
        };
    });

}());