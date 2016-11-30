/**
 * Created by jmccommas on 1/10/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appGatewayBrandingCtrl', ["$scope", "$rootScope", "Restangular", "$stateParams", "$route", "$uibModal", "toastr", "$q", "$location", "$state", "$timeout", "$ngBootbox",
        function ($scope, $rootScope, Restangular, $stateParams, $route, $uibModal, toastr, $q, $location, $state, $timeout, $ngBootbox) {
            var appBrandingCtrl = this;
            appBrandingCtrl.gatewayId = $stateParams.gatewayId;
            var serverAppBranding;

            if (local_environment) {
                serverAppBranding = Restangular.all('app').all('data');
            } else {
                serverAppBranding = Restangular.all('configuration');
            }

            $rootScope.$on('headerdataloaded', function (event, data) {
                appBrandingCtrl.headerdata = data;
            });

            appBrandingCtrl.showPanel = "";
            appBrandingCtrl.primaryColor = "#265172";
            appBrandingCtrl.secondaryColor = "#919191";
            appBrandingCtrl.textColor = "#ffffff";
            appBrandingCtrl.uploader;

            appBrandingCtrl.switchPanel = function (panel) {
                appBrandingCtrl.showPanel = panel;
            };
            appBrandingCtrl.appBrandingData = {
                PRIMARY_COLOR: {},
                SECONDARY_COLOR: {},
                TEXT_COLOR: {},
                LOGO_NAME: {},
                GATEWAY_LOGO: {},
                GATEWAY_BACKGROUND: {}
            };

            appBrandingCtrl.bind_app_branding_data = function (data) {
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].configName.toUpperCase()) {
                    case "PRIMARY_COLOR":
                        appBrandingCtrl.appBrandingData.PRIMARY_COLOR = data[i];
                        appBrandingCtrl.primaryColor = appBrandingCtrl.appBrandingData.PRIMARY_COLOR.configValue;
                        break;
                    case "SECONDARY_COLOR":
                        appBrandingCtrl.appBrandingData.SECONDARY_COLOR = data[i];
                        appBrandingCtrl.secondaryColor = appBrandingCtrl.appBrandingData.SECONDARY_COLOR.configValue;
                        break;
                    case "TEXT_COLOR":
                        appBrandingCtrl.appBrandingData.TEXT_COLOR = data[i];
                        appBrandingCtrl.textColor = appBrandingCtrl.appBrandingData.TEXT_COLOR.configValue;
                        break;
                    case "LOGO_NAME":
                        appBrandingCtrl.appBrandingData.LOGO_NAME = data[i];
                        break;
                    case "GATEWAY_LOGO":
                        appBrandingCtrl.appBrandingData.GATEWAY_LOGO = data[i];
                        break;
                    case "GATEWAY_BACKGROUND":
                        appBrandingCtrl.appBrandingData.GATEWAY_BACKGROUND = data[i];
                        appBrandingCtrl.backgroundImageURL = appBrandingCtrl.appBrandingData.GATEWAY_BACKGROUND.configValue;
                        break;
                    }
                }
            };

            appBrandingCtrl.get_footer_linkData = function (url) {
                serverAppBranding.get(url).then(function (data) {
                    appBrandingCtrl.footerLinksData = data;
                });
            };

            appBrandingCtrl.get_footer_learnMoreData = function (url) {
                serverAppBranding.get(url).then(function (data) {
                    //data = null;
                    appBrandingCtrl.footerlearnMoreData = data;
                });
            };
            appBrandingCtrl.get_gateway_bg_set = function (url) {
                serverAppBranding.get(url).then(function (data) {
                    appBrandingCtrl.chooseImagesList = data;
                });
            };

            appBrandingCtrl.get_branding_data = function (url) {
                serverAppBranding.get(url).then(function (data) {
                    $rootScope.$broadcast('startHeaderLoading', true);
                    appBrandingCtrl.brandAppData = angular.copy(data);
                    appBrandingCtrl.bind_app_branding_data(data);
                    if (local_environment) {
                        appBrandingCtrl.get_footer_learnMoreData('gateway_footer-learnmore.json');
                        appBrandingCtrl.get_footer_linkData('gateway_footer.json');
                    } else {
                        appBrandingCtrl.get_footer_learnMoreData('gatewayBrandingConfig/LEARN_MORE');
                        appBrandingCtrl.get_footer_linkData('gatewayFooter');
                    }
                });
            };

            appBrandingCtrl.getRequestBody = function (filename) {
                var data = angular.copy(appBrandingCtrl.brandAppData);
                var watcher = {
                    PRIMARY_COLOR: false,
                    SECONDARY_COLOR: false,
                    TEXT_COLOR: false,
                    GATEWAY_LOGO: false,
                    GATEWAY_BACKGROUND: false
                };
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].configName.toUpperCase()) {
                    case "PRIMARY_COLOR":
                        watcher.PRIMARY_COLOR = true;
                        data[i].configValue = appBrandingCtrl.primaryColor;
                        break;
                    case "SECONDARY_COLOR":
                        watcher.SECONDARY_COLOR = true;
                        data[i].configValue = appBrandingCtrl.secondaryColor;
                        break;
                    case "TEXT_COLOR":
                        watcher.TEXT_COLOR = true;
                        data[i].configValue = appBrandingCtrl.textColor;
                        break;
                    case "GATEWAY_LOGO":
                        if (appBrandingCtrl.uploadeNewImage) {
                            watcher.GATEWAY_LOGO = true;
                            // alert("Inside SitchGatewayLGO" + appBrandingCtrl.uploadeNewImage);
                            data[i].configValue = appBrandingCtrl.uploadeNewImage;
                        }
                        break;
                    case "GATEWAY_BACKGROUND":
                        if (appBrandingCtrl.backgroundImageURL) {
                            watcher.GATEWAY_BACKGROUND = true;
                            data[i].configValue = appBrandingCtrl.backgroundImageURL;
                        }
                        break;
                    }
                }
                if (!watcher.PRIMARY_COLOR) {
                    data.push({
                        "configName": "PRIMARY_COLOR",
                        "configValue": appBrandingCtrl.primaryColor
                    });
                }
                if (!watcher.SECONDARY_COLOR) {
                    data.push({
                        "configName": "SECONDARY_COLOR",
                        "configValue": appBrandingCtrl.secondaryColor
                    });
                }
                if (!watcher.TEXT_COLOR) {
                    data.push({
                        "configName": "TEXT_COLOR",
                        "configValue": appBrandingCtrl.textColor
                    });
                }
                if (!watcher.GATEWAY_LOGO) {
                    //  alert("Inside gatewayLogoPush");
                    if (appBrandingCtrl.uploadeNewImage) {
                        data.push({
                            "configName": "GATEWAY_LOGO",
                            "configValue": appBrandingCtrl.uploadeNewImage
                        });
                    }
                }
                if (!watcher.GATEWAY_BACKGROUND) {
                    if (appBrandingCtrl.backgroundImageURL) {
                        data.push({
                            "configName": "GATEWAY_BACKGROUND",
                            "configValue": appBrandingCtrl.backgroundImageURL
                        });
                    }
                }
                // alert(JSON.stringify(data));
                return data;
            };

            appBrandingCtrl.saveGatewayBrandingServer = function (savingWhat) {
                var temp_container = [
                    {
                        "configName": "PRIMARY_COLOR",
                        "configValue": appBrandingCtrl.primaryColor
                    },
                    {
                        "configName": "SECONDARY_COLOR",
                        "configValue": appBrandingCtrl.secondaryColor
                    }, {
                        "configName": "TEXT_COLOR",
                        "configValue": appBrandingCtrl.textColor
                    }
                ];
                if (appBrandingCtrl.uploadeNewImage) {
                    temp_container.push({
                        "configName": "GATEWAY_LOGO",
                        "configValue": appBrandingCtrl.uploadeNewImage
                    });
                }
                if (appBrandingCtrl.backgroundImageURL) {
                    temp_container.push({
                        "configName": "GATEWAY_BACKGROUND",
                        "configValue": appBrandingCtrl.backgroundImageURL
                    });
                }
                var data;
                if (appBrandingCtrl.brandAppData == null || appBrandingCtrl.brandAppData == undefined) {
                    data = temp_container;
                } else {
                    data = appBrandingCtrl.getRequestBody();
                }

                if (!local_environment) {
                    serverAppBranding.all('gatewayBranding/' + appBrandingCtrl.gatewayId).post(data).then(function (data) {
                        appBrandingCtrl.brandAppData = angular.copy(data);
                        appBrandingCtrl.bind_app_branding_data(data);
                    });
                }
                if (savingWhat == "colorpanel") {
                    toastr.success("Color panel saved successfully!", 'Success', {
                        allowHtml: true
                    });
                } else if (savingWhat == "backgroundImage") {
                    toastr.success("Background panel saved successfully!", 'Success', {
                        allowHtml: true
                    });
                }
            };

            appBrandingCtrl.reset = function () {
                if (local_environment) {
                    appBrandingCtrl.get_branding_data('gateway_branding.json');
                } else {
                    appBrandingCtrl.get_branding_data('gatewayBranding/' + appBrandingCtrl.gatewayId);
                }
            };

            appBrandingCtrl.getPageData = function () {
                if (local_environment) {
                    appBrandingCtrl.get_gateway_bg_set('gateway_bg_set.json');
                    appBrandingCtrl.get_branding_data('gateway_branding.json');
                } else {
                    appBrandingCtrl.get_gateway_bg_set('getImageSet/GATEWAY_BACKGROUND');
                    appBrandingCtrl.get_branding_data('gatewayBranding/' + appBrandingCtrl.gatewayId);
                }
            };
            appBrandingCtrl.getPageData();

            // equal heights columns
            $timeout(function () {
                var highestCol = Math.max($('.sidebar').height(), $('.main-page').height());
                $('.col-xs-3.brand-sidebar').height((highestCol) + 290 + 'px');
            }, 1000);

            }]);



}());