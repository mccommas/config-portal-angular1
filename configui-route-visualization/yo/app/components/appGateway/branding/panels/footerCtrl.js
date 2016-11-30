/**
 * Created by jmccommas on 1/10/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appBrandingFooterCtrl', ["$scope", '$kWindow', "$rootScope", "Restangular", "$stateParams", "$route", "$uibModal", "toastr", "$q", "$location", "$state", "$timeout", "$ngBootbox",
        function ($scope, $kWindow, $rootScope, Restangular, $stateParams, $route, $uibModal, toastr, $q, $location, $state, $timeout, $ngBootbox) {
            var footerCtrl = this;
            var addLinksModalServer;

            $ngBootbox.setDefaults({
                animate: true,
                backdrop: true
            });


            if (local_environment) {
                addLinksModalServer = Restangular.all('app').all('data');
            } else {
                addLinksModalServer = Restangular.all('configuration');
            }

            var appBrandingCtrl = $scope.$parent.appBrandingCtrl;


            // Open add Link Modal
            footerCtrl.addLinkModal = function () {
                if (!appBrandingCtrl.footerLinksData) {
                    appBrandingCtrl.footerLinksData = [];
                }
                $scope.title = "add new link";
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: $scope.title,
                    width: 600,
                    templateUrl: 'components/appGateway/branding/panels/footerLinkModal.html',
                    controller: 'addLinkModalCtrl as addLinkCtrl',
                    resolve: {
                        footerlinkdata: function () {
                            return {
                                action: "add",
                                linkdata: null
                            };
                        }
                    }
                });

                windowInstance.result.then(function (data) {
                    if (data) {
                        appBrandingCtrl.footerLinksData.push(data);
                    }
                });
            };

            // Open add Link Modal
            footerCtrl.editLinkModal = function (item, index) {
                $scope.title = "edit new link";
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: $scope.title,
                    width: 600,
                    templateUrl: 'components/appGateway/branding/panels/footerLinkModal.html',
                    controller: 'addLinkModalCtrl as addLinkCtrl',
                    resolve: {
                        footerlinkdata: function () {
                            return {
                                action: "edit",
                                linkdata: item
                            };
                        }
                    }
                });

                windowInstance.result.then(function (data) {
                    if (data) {
                        appBrandingCtrl.footerLinksData[index] = data;
                    }
                });
            };

            footerCtrl.delete_links_server = function (Id) {
                if (Id) {
                    var url = 'deleteFooter/' + Id;
                    addLinksModalServer.one(url).remove();
                }
            };

            footerCtrl.remove_links = function (index) {

                $ngBootbox.confirm('Are you sure you want to delete this link?')
                    .then(function () {
                            if (!local_environment) {
                                footerCtrl.delete_links_server(appBrandingCtrl.footerLinksData[index].id);
                            }
                            appBrandingCtrl.footerLinksData.splice(index, 1);
                            $timeout(function () {
                                toastr.success('Link Deleted');
                            }, 500)
                        },
                        function () {
                            //Confirm was cancelled, don't delete customer
                            $timeout(function () {
                                toastr.warning('Delete Canceled');
                            }, 500)
                        });
            };


            // Open Learn More Modal
            footerCtrl.learnMoreModal = function (item, index) {
                var action = "";
                if (!item.configValue) {
                    item = {
                        "id": null,
                        "configName": "LEARN_MORE",
                        "configValue": ""
                    };
                    action = "add";
                    $scope.title = "Add Learn More Link";
                } else {
                    action = "edit";
                    $scope.title = "Edit Learn More Link";
                }
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: $scope.title,
                    width: 600,
                    templateUrl: 'components/appGateway/branding/panels/learnMoreModal.html',
                    controller: 'learnMoreModalCtrl as learnMoreCtrl',
                    resolve: {
                        learnMoredata: function () {
                            return {
                                action: action,
                                learnData: item
                            };
                        }
                    }
                });

                windowInstance.result.then(function (data) {
                    if (data) {
                        appBrandingCtrl.footerlearnMoreData = data;
                    }
                });
            };
        }]);
}());