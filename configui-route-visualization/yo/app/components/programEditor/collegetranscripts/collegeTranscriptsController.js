/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";

    configAppControllers.controller('CollegeTranscripts', ['$scope', 'toastr', '$route', '$location', '$uibModal', '$stateParams', 'Restangular',
        function ($scope, toastr, $route, $location, $uibModal, $stateParams, Restangular) {
            var clgtransCtrl = this;
            var serverClgTranscripts;
            var originalResetData;
            var resetdata;


            if (local_environment) {
                serverClgTranscripts = Restangular.all('app').all('data');
            } else {
                serverClgTranscripts = Restangular.all('configuration');
            }

            clgtransCtrl.typeOptions1 = _Transcript_accepted;

            clgtransCtrl.get_CA_data = function (url) {
                serverClgTranscripts.get(url).then(function (data) {
                    clgtransCtrl.transcriptCAdata = data;
                    originalResetData = angular.copy(data);
                });
            };

            clgtransCtrl.onchgTransAccept = function () {
                clgtransCtrl.transcriptCAdata.courseWorkAccepted = "";
            };

            clgtransCtrl.save = function () {
                serverClgTranscripts.all('collegeTranscripts/').post(clgtransCtrl.transcriptCAdata).then(function (data) {
                	clgtransCtrl.transcriptCAdata = data;
                    $scope.transcriptCAdata = data;
                    toastr.success('<b>College Transcripts saved Successfully</b>' , '<b>Success!</b>', {
                        allowHtml: true
                    });
                    originalResetData = angular.copy(data);
                });
            };

            clgtransCtrl.cancel = function () {
                $location.path('/programhome/' + $stateParams.programId + '/home');
                toastr.warning('Action has been canceled')
            };


            if (local_environment) {
                clgtransCtrl.get_CA_data('prg_ca_transcripts.json');
            } else {
                clgtransCtrl.get_CA_data('collegeTranscripts/');
            }

            clgtransCtrl.reset = function () {
                resetdata = angular.copy(originalResetData);
                clgtransCtrl.transcriptCAdata = resetdata;
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>College Transcripts reset Successfully</b>' , '<b>Success!</b>', {
                    allowHtml: true
                });
            };

    }]);
}());