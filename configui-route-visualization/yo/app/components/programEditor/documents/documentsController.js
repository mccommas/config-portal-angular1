/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('ProgramEditorDocument', ["$scope", "$rootScope", "toastr", "$location", "$stateParams", "$uibModal", "Restangular","$timeout",
        function ($scope, $rootScope, toastr, $location, $stateParams, $uibModal, Restangular,$timeout) {
            var documentCtrl = this;
            var serverDocument;
            var originalResetData;
            var resetdata;
            documentCtrl.dataMaxAllowed = _Max_Allowed;
            documentCtrl.casid;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.programEditDocuments.$setPristine();
                }, 1000);
            };
            documentCtrl.ProgramId = $stateParams.programId;

            $rootScope.$on('headerdataloaded', function (event, data) {
                documentCtrl.headerdata = data;
                documentCtrl.casid = documentCtrl.headerdata.casId;
            });

            if (local_environment) {
                serverDocument = Restangular.all('app').all('data');
            } else {
                serverDocument = Restangular.all('configuration');
            }


            documentCtrl.post_documents_server = function () {
                serverDocument.all("programMaterials/documents").post(documentCtrl.programEditDocument).then(function (data) {
                    documentCtrl.programEditDocument = data;
                    formatDataToString();
                  //  alert(JSON.stringify(data));
                    originalResetData = angular.copy(data);

                });
            };

            function formatDataToString() {
              var length = documentCtrl.programEditDocument.documents.length;
              for(var x = 0; x < length; x++){
                documentCtrl.programEditDocument.documents[x].maxCount = documentCtrl.programEditDocument.documents[x].maxCount;
              }
            }

            documentCtrl.get_document_data = function (url) {
                serverDocument.get(url).then(function (data) {
                    originalResetData = angular.copy(data);
                    documentCtrl.programEditDocument = data;
                    formatDataToString();
                    setFormPristine();
                });
            };

            //Server request methods end

            documentCtrl.save = function () {
                $('.chkRequest').each(function () {
                    documentCtrl.programEditDocument.documents[$(this).attr('dtoindex')].isRequest = $(this).hasClass('On');
                });
                $('.chkRequire').each(function () {
                    documentCtrl.programEditDocument.documents[$(this).attr('dtoindex')].isRequired = $(this).hasClass('On');
                });
                if (!local_environment) {
                    documentCtrl.post_documents_server();
                    toastr.success('<b>Program Documents saved Successfully</b>', '<b>Success!</b>', {
                        allowHtml: true
                    });
                } else {
                    toastr.success('<b>Program Documents saved Successfully</b>', '<b>Success!</b>', {
                        allowHtml: true
                    });
                }
            };

            documentCtrl.cancel = function () {
                $location.path('/programhome/' + $stateParams.programId + '/home');
                toastr.warning('Action has been canceled')
            };

            if (local_environment) {
                documentCtrl.get_document_data('documents.json');
            } else {
                documentCtrl.get_document_data("programMaterials/documents");
            }

            documentCtrl.bind_toggle_event = function () {
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

                        if ($(this).hasClass("parent") && $(this).hasClass("On")) {
                            $(this).parent(".col-xs-2").next(".col-xs-2").children(".child").unbind("click").animate({
                                "opacity": "0.5"
                            }).addClass("ub-click");
                            $(this).parent(".col-xs-2").next(".col-xs-2").children(".child").removeClass("On").removeClass("Off").addClass("Off");
                            $(this).toggleClass('On').toggleClass('Off');


                        } else if ($(this).hasClass("child") && $(this).hasClass("ub-click")) {
                            $(this).unbind('click');
                        } else if ($(this).hasClass("parent")) {
                            $(this).toggleClass('On').toggleClass('Off');
                            $(this).parent(".col-xs-2").next(".col-xs-2").children(".child").animate({
                                "opacity": "1"
                            }).removeClass("ub-click");


                        } else {

                            $(this).toggleClass('On').toggleClass('Off');
                        }


                    });
                });

            };
            $(function () {
                setInterval(function () {
                    documentCtrl.bind_toggle_event();
                }, 2000);

            });


            documentCtrl.reset = function () {
                //resetdata = angular.copy(originalResetData);
                //documentCtrl.programEditDocument = resetdata;
                if (local_environment) {
                    documentCtrl.get_document_data('documents.json');
                } else {
                    documentCtrl.get_document_data("programMaterials/documents");
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Program Documents reset Successfully</b>', '<b>Success!</b>', {
                    allowHtml: true
                });

            };
        }]);

}());
