(function () {
    "use strict";
    configAppControllers.controller('ActiveProgramModal', ["$scope", "$state", "toastr", "programData", "$uibModalInstance", "$location", "Restangular","apiEnabled",
        function ($scope, $state, toastr, programData, $uibModalInstance, $location, Restangular,apiEnabled) {
            var serverSubmit;
            var activateCtrl = this;
	        activateCtrl.programData = programData;
	        activateCtrl.apiEnabled = apiEnabled;
            //programData contains program details
            if (local_environment) {
                serverSubmit = Restangular.all('app').all('data');
            } else {
                serverSubmit = Restangular.all('configuration');
            }
            //This function is to make HTTP request to send Activation Status to server
            activateCtrl.post_submit_for_review = function () {
                serverSubmit.all("programStatus/" + activateCtrl.programData.id).post('active').then(function (data) {
                    $uibModalInstance.close(true);
                });
            };

            activateCtrl.submitActive = function () {
                //Called when ACTIVate button is clicked
                if (local_environment) {
                    $uibModalInstance.close(true);
                } else {
                    activateCtrl.post_submit_for_review();
                }
            };


            activateCtrl.cancel = function () {
                //Called when Continue Editing is called
                $uibModalInstance.close(false);
                toastr.warning('Activate Canceled', 'Canceled', {
                    allowHtml: true
                });
            };

        }]);
}());