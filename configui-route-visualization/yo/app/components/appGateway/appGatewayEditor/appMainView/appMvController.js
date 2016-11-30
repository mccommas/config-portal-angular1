/**
 * Created by jmccommas on 12/5/14.
 */
(function () {
    'use strict';
    configAppControllers.controller('appMvController', ["$scope", "$timeout", "toastr", "$stateParams", "$location", "Restangular", "$rootScope", "$state", "getGatewaySecResolved",
        function ($scope, $timeout, toastr, $stateParams, $location, Restangular, $rootScope, $state, getGatewaySecResolved) {
            var appMvCtrl = this;
            $scope.homeContent = true;
            $scope.state = $state;
            var serverMV;
            if (local_environment) {
                serverMV = Restangular.all('app').all('data');
            } else {
                serverMV = Restangular.all('configuration');
            }
            $rootScope.$on('headerdataloaded', function (event, data) {
                appMvCtrl.headerdata = data;
            });

            $rootScope.$on('supplementSubmitted', function (event, data) {
                if (appMvCtrl.menu_item_review) {
                    appMvCtrl.menu_item_review.Documents = "active" || "review";
                }
            });
            $rootScope.$on('documentsSubmitted', function (event, data) {
                if (appMvCtrl.menu_item_review) {
                    appMvCtrl.menu_item_review.Documents = "active" || "review";
                }
            });
            $rootScope.$on('activateDocSubmitted', function (event, data) {
                if (appMvCtrl.menu_item_review) {
                    appMvCtrl.menu_item_review.Documents = "active" || "review";
                }
            });
            $rootScope.$on('interviewSubmitted', function (event, data) {
                if (appMvCtrl.menu_item_review) {
                    appMvCtrl.menu_item_review.Interview = "active" || "review";
                }
            });
            $rootScope.$on('feeSubmitted', function (event, data) {
                if (appMvCtrl.menu_item_review) {
                    appMvCtrl.menu_item_review.Fee = "active" || "review";
                }
            });
            $rootScope.$on('offerSubmitted', function (event, data) {
                if (appMvCtrl.menu_item_review) {
                    appMvCtrl.menu_item_review.Offer = "active" || "review";
                }
            });


            appMvCtrl.prgramsectiondata = [];
            appMvCtrl.menu_item = {
                chkHome: true,
                chkWelcome: false,
                chkSupplemental: false,
                chkFee: false,
                chkDocuments: false,
                chkInterview: false,
                chkOffer: false

            };

            appMvCtrl.menu_item_visible = {
                Home: true,
                Welcome: false,
                Supplemental: false,
                Fee: false,
                Documents: false,
                Interview: false,
                Offer: false
            };
            appMvCtrl.menu_item_status = {
                Home: "",
                Welcome: "",
                Supplemental: "",
                Fee: "",
                Documents: "",
                Interview: "",
                Offer: ""
            };


            appMvCtrl.bind_show_hide_menu = function (data) {
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].sectionName) {
                    case "extend_offer":
                        appMvCtrl.menu_item_visible.Offer = true;
                        appMvCtrl.menu_item_status.Offer = data[i].status;
                        if (data[i].enabled) {
                            appMvCtrl.menu_item.chkOffer = true;
                        } else {
                            appMvCtrl.menu_item.chkOffer = false;
                        }
                        break;
                    case "interview_scheduler":
                        appMvCtrl.menu_item_visible.Interview = true;
                        appMvCtrl.menu_item_status.Interview = data[i].status;
                        if (data[i].enabled) {
                            appMvCtrl.menu_item.chkInterview = true;
                        } else {
                            appMvCtrl.menu_item.chkInterview = false;
                        }
                        break;
                    case "Welcome":
                        appMvCtrl.menu_item_visible.Welcome = true;
                        appMvCtrl.menu_item_status.Welcome = data[i].status;
                        if (data[i].enabled) {
                            appMvCtrl.menu_item.chkWelcome = false;
                        } else {
                            appMvCtrl.menu_item.chkWelcome = false;
                        }
                        break;
                    case "supplemental_application":
                        appMvCtrl.menu_item_visible.Supplemental = true;
                        appMvCtrl.menu_item_status.Supplemental = data[i].status;
                        if (data[i].enabled) {
                            appMvCtrl.menu_item.chkSupplemental = true;
                        } else {
                            appMvCtrl.menu_item.chkSupplemental = false;
                        }
                        break;
                    case "fee_collection":
                        appMvCtrl.menu_item_visible.Fee = true;
                        appMvCtrl.menu_item_status.Fee = data[i].status;
                        if (data[i].enabled) {
                            appMvCtrl.menu_item.chkFee = true;
                        } else {
                            appMvCtrl.menu_item.chkFee = false;
                        }
                        break;
                    case "document_upload":
                        appMvCtrl.menu_item_visible.Documents = true;
                        appMvCtrl.menu_item_status.Documents = data[i].status;
                        if (data[i].enabled) {
                            appMvCtrl.menu_item.chkDocuments = true;
                        } else {
                            appMvCtrl.menu_item.chkDocuments = false;
                        }
                        break;
                    }
                }
            };

            appMvCtrl.post_server_changed_checkbox = function (key, value) {
                var sectionid = null;
                for (var i = 0; i < appMvCtrl.prgramsectiondata.length; i++) {
                    if (appMvCtrl.prgramsectiondata[i].sectionName.toLowerCase() == key.toLowerCase()) {
                        sectionid = appMvCtrl.prgramsectiondata[i].id;
                        break;
                    }
                }
                if (sectionid != null) {
                    if (!local_environment) {
                        serverMV.all("gatewaySectionRequired/" + value).post(sectionid).then(function (data) {

                        });
                    }
                }
            };


            appMvCtrl.program_editor_checkbox_change = function (chkid) {
                switch (chkid) {
                case "chkHome":
                    appMvCtrl.post_server_changed_checkbox("home", appMvCtrl.menu_item[chkid]);
                    break;
                case "chkWelcome":
                    appMvCtrl.post_server_changed_checkbox("welcome_message", appMvCtrl.menu_item[chkid]);
                    break;
                case "chkSupplemental":
                    appMvCtrl.post_server_changed_checkbox("supplemental_application", appMvCtrl.menu_item[chkid]);
                    break;
                case "chkInterview":
                    appMvCtrl.post_server_changed_checkbox("interview_scheduler", appMvCtrl.menu_item[chkid]);
                    break;
                case "chkOffer":
                    appMvCtrl.post_server_changed_checkbox("extend_offer", appMvCtrl.menu_item[chkid]);
                    break;
                case "chkDocuments":
                    appMvCtrl.post_server_changed_checkbox("document_upload", appMvCtrl.menu_item[chkid]);
                    break;
                case "chkFee":
                    appMvCtrl.post_server_changed_checkbox("fee_collection", appMvCtrl.menu_item[chkid]);
                    break;

                }
            };

            appMvCtrl.bind_show_hide_menu(getGatewaySecResolved.data);
            appMvCtrl.prgramsectiondata = getGatewaySecResolved.data;
            $scope.parentgatewaysectiondata = getGatewaySecResolved;

            // reload the routes when menu items are active or review status
            appMvCtrl.goDocInReview = function () {
                $state.go('appGatewayEditor.docInReview', null, {
                    reload: true
                });
            };
            appMvCtrl.goSuppInReview = function () {
                $state.go('appGatewayEditor.suppInReview', null, {
                    reload: true
                });
            };
            appMvCtrl.interviewInReview = function () {
                $state.go('appGatewayEditor.interviewInReview', null, {
                    reload: true
                });
            };
            appMvCtrl.feeInReview = function () {
                $state.go('appGatewayEditor.feeInReview', null, {
                    reload: true
                });
            };
            appMvCtrl.offerInReview = function () {
                $state.go('appGatewayEditor.offerInReview', null, {
                    reload: true
                });
            };

        }]);
}());