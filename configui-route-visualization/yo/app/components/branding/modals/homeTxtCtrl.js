/**
 * Created by jmccommas on 12/19/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('homeTxtModal', ["$scope", "$uibModalInstance", "$location", "$stateParams", "Restangular", "toastr", "brandingData", "orginalBrandData",
        function ($scope, $uibModalInstance, $location, $stateParams, Restangular, toastr, brandingData, orginalBrandData) {

            var homeModalCtrl = this;
            var modalHomeTxtServer;

            if (local_environment) {
                modalHomeTxtServer = Restangular.all('app').all('data');
            } else {
                modalHomeTxtServer = Restangular.all('configuration');
            }
            var orgResetModalData = angular.copy(brandingData);
            homeModalCtrl.brandData = brandingData;

            homeModalCtrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                toastr.warning('Action has been canceled');
            };

            homeModalCtrl.resetinstruction = function () {
                homeModalCtrl.brandData = angular.copy(orgResetModalData);
                toastr.info('Instructions reset successfully');
            };

            homeModalCtrl.getInstructionRequest = function () {
                var watcher = {
                    instructions: false
                };
                for (var j = 0; j < orginalBrandData.length; j++) {
                    switch (orginalBrandData[j].configName.toLowerCase()) {
                    case "instructions":
                        watcher.instructions = true;
                        orginalBrandData[j].configValue = homeModalCtrl.brandData.instructions.configValue;
                        break;
                    }
                }
                if (!watcher.instructions) {
                    orginalBrandData.push({
                        "configName": "instructions",
                        "configValue": homeModalCtrl.brandData.instructions.configValue
                    });
                }
                return orginalBrandData;
            };

            homeModalCtrl.post_home_text_server = function (url) {
                modalHomeTxtServer.all(url).post(homeModalCtrl.getInstructionRequest()).then(function (data) {
                    $uibModalInstance.close(data);
                });
            };

            homeModalCtrl.saveHomeTxt = function () {
                if (local_environment) {
                    $uibModalInstance.close(homeModalCtrl.brandData);
                    toastr.success('Program Instructions saved Successfully');
                } else {
                    homeModalCtrl.post_home_text_server("programBrandingConfig");
                    toastr.success('Program Instructions saved Successfully');
                }

            };

        }]);
}());