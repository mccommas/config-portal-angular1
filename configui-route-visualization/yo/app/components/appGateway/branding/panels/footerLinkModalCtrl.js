/**
 * Created by jmccommas on 1/7/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('addLinkModalCtrl', ["$timeout", "toastr", "$stateParams", "$location", "Restangular", "$windowInstance", "$scope", "$rootScope", "$q", "footerlinkdata",
        function ($timeout, toastr, $stateParams, $location, Restangular, $windowInstance, $scope, $rootScope, $q, footerlinkdata) {
            var addLinkCtrl = this;
            var addLinksModalServer;

            switch (footerlinkdata.action) {
                case "add":
                    addLinkCtrl.savebtntext = "Add";
                    break;
                case "edit":
                    addLinkCtrl.savebtntext = "Edit";
                    break;
            }

            addLinkCtrl.linkData;
            if (footerlinkdata.action == "add") {
                addLinkCtrl.linkData = {
                    "type": "",
                    "link": ""
                };
            } else {
                addLinkCtrl.linkData = angular.copy(footerlinkdata.linkdata);
            }

            if (local_environment) {
                addLinksModalServer = Restangular.all('app').all('data');
            } else {
                addLinksModalServer = Restangular.all('configuration');
            }

            addLinkCtrl.post_link_data = function () {
                addLinksModalServer.all("saveGatewayFooter").post(addLinkCtrl.linkData).then(function (data) {
                    addLinkCtrl.linkData = data;
                    $windowInstance.close(addLinkCtrl.linkData);
                    toastr.success('Link Changes Saved', '<b>Success</b>', {
                        allowHtml: true
                    });
                });
            };

            addLinkCtrl.cancel = function () {
                $windowInstance.close(null);
                toastr.warning('Edit Link Canceled', '<b>Canceled</b>', {
                    allowHtml: true
                });
            };


            addLinkCtrl.addLinks = function () {
                if (local_environment) {
                    if (footerlinkdata.action == "add") {
                        addLinkCtrl.linkData.id = Math.floor((Math.random() * 100) + 1);
                    }
                    toastr.success('Link Changes Saved', '<b>Success</b>', {
                        allowHtml: true
                    });
                    $windowInstance.close(addLinkCtrl.linkData);
                } else {
                    addLinkCtrl.post_link_data();
                }
            };
     }]);
}());