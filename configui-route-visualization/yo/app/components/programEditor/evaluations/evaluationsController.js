/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    'use strict';
    configAppControllers.controller('ProgramEditorEvaluations', ['$scope', 'toastr', '$route', '$location', '$uibModal', '$stateParams', 'Restangular',
        function ($scope, toastr, $route, $location, $uibModal, $stateParams, Restangular) {
            var evaluationCtrl = this;
            var serverEvaluation;
            var originalResetData;
            var resetdata;

            evaluationCtrl.ProgramId = $stateParams.programId;
            // Sets default welcome intro page on programHome
            evaluationCtrl.homeContent = false;

            if (local_environment) {
                serverEvaluation = Restangular.all('app').all('data');
            } else {
                serverEvaluation = Restangular.all('configuration');
            }

            var newEvaluation = true;

            evaluationCtrl.get_evaluation_data = function (url) {
                serverEvaluation.get(url).then(function (data) {
                    evaluationCtrl.programEditEvaluation = data;
                    if (evaluationCtrl.programEditEvaluation.evaluations.length > 0) {
                      var length = evaluationCtrl.programEditEvaluation.evaluations.length;
                      for (var x = 0; x < length; x++){
                        var evaluation = evaluationCtrl.programEditEvaluation.evaluations[x];
                        if (evaluation.supplementalSectionId > 0) {
                            evaluationCtrl.programEvaluation = evaluation;
                            evaluationCtrl.programEvaluation.minRequired = evaluation.minRequired + '';
                            evaluationCtrl.programEvaluation.maxAllowed = evaluation.maxAllowed + '';
                            originalResetData = angular.copy(data);
                            newEvaluation = false;
                        } else if (evaluation.applicationFormsubsectionId > 0) {
                            evaluationCtrl.applicationEvaluation = evaluation;
                            originalResetData = angular.copy(data);
                            newEvaluation = false;
                        }
                        if (x === length && newEvaluation) {
                            evaluationCtrl.programEvaluation = {
                                "minRequired": '0',
                                "maxAllowed": '0',
                                "evaluationsRequired": false
                            };
                        }
                      }
                    }
                });

            };

            evaluationCtrl.post_evaluations_server = function () {
                serverEvaluation.all("programMaterials/evaluations").post(evaluationCtrl.programEditEvaluation).then(function (data) {
                    evaluationCtrl.programEditEvaluation = data;
                    originalResetData = angular.copy(data);
                    toastr.success('Program Evaluation saved Successfully');
                });
            };

            evaluationCtrl.save = function () {
                if (!local_environment) {
                    if (newEvaluation) {
                        evaluationCtrl.programEditEvaluation.evaluations.push(evaluationCtrl.programEvaluation);
                    }
                    /**Added a else to push the updated programEvaluation into the evaluation array**/
                    else {
                        angular.forEach(evaluationCtrl.programEditEvaluation.evaluations, function (evaluation) {
                            if (evaluation.supplementalSectionId > 0) {
                                var index = evaluationCtrl.programEditEvaluation.evaluations.indexOf(evaluation);
                                if (index > -1) {
                                    evaluationCtrl.programEditEvaluation.evaluations.splice(index, 1);
                                    evaluationCtrl.programEditEvaluation.evaluations.push(evaluationCtrl.programEvaluation);
                                }
                            }

                        });
                    }
                    evaluationCtrl.post_evaluations_server();
                } else {
                    toastr.success('Program Evaluations saved Successfully');
                }
            };


            evaluationCtrl.cancel = function () {
                $location.path('/programhome/' + $stateParams.programId + '/home');
                toastr.warning('Action has been canceled')
            };

            if (local_environment) {
                evaluationCtrl.get_evaluation_data('evaluations.json');
            } else {
                evaluationCtrl.get_evaluation_data("programMaterials/evaluations");
            }

            evaluationCtrl.reset = function () {
                if (local_environment) {
                    evaluationCtrl.get_evaluation_data('evaluations.json');
                } else {
                    evaluationCtrl.get_evaluation_data("programMaterials/evaluations");
                }
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.info('<b>Evaluations reset Successfully</b>' , '<b>Success!</b>', {
                    allowHtml: true
                });
            };


        }]);

}());
