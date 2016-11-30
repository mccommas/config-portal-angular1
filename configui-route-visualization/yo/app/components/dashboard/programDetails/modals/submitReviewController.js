(function () {
    "use strict";
    configAppControllers.controller('SubmitProgramReviewModal', ["$scope", "$state", "toastr", "$timeout", "$uibModalInstance", "$location", "Restangular", "programData","apiEnabled",
        function ($scope, $state, toastr, $timeout, $uibModalInstance, $location, Restangular, programData,apiEnabled) {
            var serverSubmit;
            var reviewCtrl = this;
            reviewCtrl.programData = programData;
            reviewCtrl.apiEnabled = apiEnabled;
            if (local_environment) {
                serverSubmit = Restangular.all('app').all('data');
            } else {
                serverSubmit = Restangular.all('configuration');
            }


            reviewCtrl.post_submit_for_review = function () {
                serverSubmit.all("/programStatus/" + reviewCtrl.programData.id).post('review').then(function (data) {
                    $uibModalInstance.close(true);
                });
            };

            reviewCtrl.submitReview = function () {
                if (local_environment) {
                    $uibModalInstance.close(true);
                } else {
                    reviewCtrl.post_submit_for_review();
                }
            };

            reviewCtrl.cancel = function () {
                $uibModalInstance.close(false);
                /*toastr.warning('Submit for review canceled', 'Canceled', {
                    allowHtml: true
                });*/
            };
        }]);
}());