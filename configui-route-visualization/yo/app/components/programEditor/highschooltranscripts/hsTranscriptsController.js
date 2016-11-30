/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('HighSchoolTranscripts', ['$scope', 'toastr', '$route', '$location', '$uibModal', '$stateParams', 'Restangular',
        function ($scope, toastr, $route, $location, $uibModal, $stateParams, Restangular) {
            var hstCtrl = this;
            var serverTranscripts;
            hstCtrl.ProgramId = $stateParams.programId;
            hstCtrl.transcriptdata;
            hstCtrl.boolToStr = function (arg) {
                return arg ? 'Yes' : 'No'
            };
            if (local_environment) {
                serverTranscripts = Restangular.all('app').all('data');
            } else {
                serverTranscripts = Restangular.all('configuration');
            }

            hstCtrl.get_hst_data = function (url) {
                serverTranscripts.get(url).then(function (data) {
                    hstCtrl.transcriptdata = data;
                });
            };

            hstCtrl.save = function () {
                serverTranscripts.all('highSchoolTranscripts/').post(hstCtrl.transcriptdata).then(function (data) {
                    hstCtrl.transcriptdata = data;

                    toastr.success('<b>Program High School Transcripts saved successfully</b>' , '<b>Success!</b>', {
                        allowHtml: true
                    });
                });
            };

            hstCtrl.cancel = function () {
                $location.path('/programhome/' + $stateParams.programId + '/home');
                toastr.warning('Action has been canceled')
            };

            if (local_environment) {
                hstCtrl.get_hst_data('prg_hs_transcripts.json');
            } else {
                hstCtrl.get_hst_data('highSchoolTranscripts/');
            }
        }]);
}());