/**
 * Created by jmccommas on 1/7/15.
 */

(function () {
    "use strict";
    configAppControllers.controller('learnMoreModalCtrl', ["$timeout", "toastr", "$stateParams", "$location", "Restangular", "$windowInstance", "$scope", "$rootScope", "$q", "learnMoredata",
        function ($timeout, toastr, $stateParams, $location, Restangular, $windowInstance, $scope, $rootScope, $q, learnMoredata) {
            var learnMoreCtrl = this;
            var addLinksModalServer;
            switch (learnMoredata.action) {
            case "add":
                learnMoreCtrl.savebtntext = "Add";
                break;
            case "edit":
                learnMoreCtrl.savebtntext = "Edit";
                break;
            }

            learnMoreCtrl.learnData = angular.copy(learnMoredata.learnData);
            if (local_environment) {
                addLinksModalServer = Restangular.all('app').all('data');
            } else {
                addLinksModalServer = Restangular.all('configuration');
            }

            learnMoreCtrl.post_link_data = function () {
                addLinksModalServer.all("gatewayBrandingConfig/LEARN_MORE").post(learnMoreCtrl.learnData).then(function (data) {
                    learnMoreCtrl.learnData = data;
                    $windowInstance.close(learnMoreCtrl.learnData);
                    toastr.success('Learn More Changes Saved', '<b>Success</b>', {
                        allowHtml: true
                    });
                });
            };

            learnMoreCtrl.cancel = function () {
                $windowInstance.close(null);
                toastr.warning('Add learn more Canceled', '<b>Canceled</b>', {
                    allowHtml: true
                });
            };


            learnMoreCtrl.addLearnMore = function () {
                if (local_environment) {
                    if (learnMoredata.action == "add") {
                        learnMoreCtrl.learnData.id = Math.floor((Math.random() * 100) + 1);
                    }
                    toastr.success('Link Changes Saved', '<b>Success</b>', {
                        allowHtml: true
                    });
                    $windowInstance.close(learnMoreCtrl.learnData);
                } else {
                    learnMoreCtrl.post_link_data();
                }
            };
     }]);
}());