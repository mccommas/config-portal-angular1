/**
 * Created by jmccommas on 1/11/15.
 */
(function () {
    'use strict';
    configAppControllers.controller('supplementalQuestCtrl', ['$scope', '$timeout', '$route', '$location', '$uibModal', '$stateParams', '$state', 'Restangular', 'toastr', 'formnotsave',
        function ($scope, $timeout, $route, $location, $uibModal, $stateParams, $state, Restangular, toastr, formnotsave) {
            var suppQuestCtrl = this;
            var serverQuestion;

            if (local_environment) {
                serverQuestion = Restangular.all('app').all('data');
            } else {
                serverQuestion = Restangular.all('configuration');
            }

            var setFormPristine = function () {
                $timeout(function () {
                    $scope.suppQuestions.$setPristine();
                    formnotsave.bindwatcher($scope.suppQuestions);
                }, 1000);
            };

            // jquery used to validate forms, if no questions disable submit button
            suppQuestCtrl.checkQuestions = function () {
                $timeout(function () {
                    setInterval(function () {
                        var qLength = jQuery('li#questions-text');
                        if (qLength.length === 0) {
                            jQuery('#save-button.btn.btn-save, #continue-btn1.btn.btn-reset').addClass('disabled')
                        } else {
                            jQuery('#save-button.btn.btn-save, #continue-btn1.btn.btn-reset').removeClass('disabled')
                        }
                    }, 500)
                }, 500)
            };
            suppQuestCtrl.checkQuestions();


            suppQuestCtrl.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };
            suppQuestCtrl.addIsOpenProperty = function (data) {
                for (var i = 0; i < data.questionSet.length; i++) {
                    if (!data.questionSet[i].questions) {
                        data.questionSet[i].questions = [];
                    }
                    if (!data.questionSet[i].questions.length) {
                        data.questionSet[i].isOpen = true;
                    } else {
                        data.questionSet[i].isOpen = false;
                    }
                }
            };

            // Push and Delete Questions
            suppQuestCtrl.addNewQuestionInput = function (event) {
                suppQuestCtrl.questions.push({
                    'question': ''
                });
            };


            suppQuestCtrl.get_question_data = function (url) {
                serverQuestion.get(url).then(function (data) {
                    suppQuestCtrl.addIsOpenProperty(data);
                    suppQuestCtrl.questionData = data;
                    setFormPristine();
                });
            };

            suppQuestCtrl.validateQuestionForm = function (type) {
                var messsage = "Maximum Number of Questions Reached.";
                if (type === "questionblock") {
                    messsage = "Maximum Number of Question Sets Reached.";
                }
                toastr.error(messsage);
            };

            // Add Question Modal
            suppQuestCtrl.openQuestion = function (questionsetIndex) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/addQuestion.html',
                    controller: 'AddSuppQuestionModal',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        formQuestData: function () {
                            suppQuestCtrl.formQuestData = {
                                action: "add",
                                question: null,
                                questionSetId: suppQuestCtrl.questionData.questionSet[questionsetIndex].id
                            };
                            return suppQuestCtrl.formQuestData;
                        }
                    }
                });

                modalInstance.result.then(function (newQuestion) {
                    suppQuestCtrl.submitted = true;
                    suppQuestCtrl.messages = 'SAVED';
                    $timeout(function () {
                        suppQuestCtrl.messages = null;
                    }, 3000);
                    if (suppQuestCtrl.questionData.questionSet[questionsetIndex].questions === undefined) {
                        suppQuestCtrl.questionData.questionSet[questionsetIndex].questions = [];
                    }
                    suppQuestCtrl.questionData.questionSet[questionsetIndex].questions.push(newQuestion);
                });
            };
            suppQuestCtrl.addQuestion = function (questionsetIndex) {
                if (suppQuestCtrl.questionData.questionSet[questionsetIndex].questions === undefined) {
                    suppQuestCtrl.questionData.questionSet[questionsetIndex].questions = [];
                }
                if (suppQuestCtrl.questionData.questionSet[questionsetIndex].questions.length < 30) {
                    suppQuestCtrl.openQuestion(questionsetIndex);
                } else {
                    suppQuestCtrl.validateQuestionForm("question");
                }
            };

            // edit Question Modal
            suppQuestCtrl.openEditQuestion = function (questsetIndex, questIndex) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/addQuestion.html',
                    controller: 'AddSuppQuestionModal',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        formQuestData: function () {
                            suppQuestCtrl.formQuestData = {
                                action: "edit",
                                question: angular.copy(suppQuestCtrl.questionData.questionSet[questsetIndex].questions[questIndex]),
                                questionSetId: suppQuestCtrl.questionData.questionSet[questsetIndex].id
                            };
                            return suppQuestCtrl.formQuestData;
                        }
                    }
                });

                modalInstance.result.then(function (updatedQuestion) {
                    suppQuestCtrl.questionData.questionSet[questsetIndex].questions[questIndex] = updatedQuestion;
                });
            };
            suppQuestCtrl.editQuestion = function (questsetIndex, questIndex) {
                suppQuestCtrl.openEditQuestion(questsetIndex, questIndex);
            };
            // delete Question Modal
            suppQuestCtrl.openDeleteQuestion = function (questsetIndex, questIndex) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/deleteQuestion.html',
                    controller: 'AddSuppQuestionModal',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        formQuestData: function () {
                            suppQuestCtrl.formQuestData = {
                                action: "delete",
                                question: angular.copy(suppQuestCtrl.questionData.questionSet[questsetIndex].questions[questIndex]),
                            };
                            return suppQuestCtrl.formQuestData;
                        }
                    }
                });

                modalInstance.result.then(function (toDelete) {
                    if (toDelete) {
                        suppQuestCtrl.questionData.questionSet[questsetIndex].questions.splice(questIndex, 1);
                    }
                });
            };
            suppQuestCtrl.confirmDeleteQuestion = function (questsetIndex, questIndex) {
                suppQuestCtrl.openDeleteQuestion(questsetIndex, questIndex);

            };


            // Add Question Set Modal
            suppQuestCtrl.openQuestionSet = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/addQuestionSet.html',
                    controller: 'AddSuppQuestionSetModal',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        formQuestSetData: function () {
                            suppQuestCtrl.formQuestSetData = {
                                action: "add",
                                questionSet: suppQuestCtrl.parentdata
                            };
                            return suppQuestCtrl.formQuestSetData;
                        }
                    }
                });

                modalInstance.result.then(function (tempQSet) {
                    tempQSet.isOpen = true;
                    if (!suppQuestCtrl.questionData.questionSet) {
                        suppQuestCtrl.questionData.questionSet = [];
                    }
                    suppQuestCtrl.questionData.questionSet.push(tempQSet);
                });

            };
            suppQuestCtrl.addQuestionSet = function () {
                if (!suppQuestCtrl.questionData.questionSet) {
                    suppQuestCtrl.questionData.questionSet = [];
                }
                if (suppQuestCtrl.questionData.questionSet.length < 30) {
                    suppQuestCtrl.openQuestionSet();
                } else {
                    suppQuestCtrl.validateQuestionForm("questionblock");
                }
            };

            // delete QuestionSet Modal
            suppQuestCtrl.openDeleteQuestionSet = function (questsetIndex) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/deleteQuestionSet.html',
                    controller: 'AddSuppQuestionSetModal',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        formQuestSetData: function () {
                            suppQuestCtrl.parentdata = suppQuestCtrl.questionData.questionSet.length;
                            suppQuestCtrl.formQuestSetData = {
                                action: "delete",
                                questionSet: suppQuestCtrl.questionData.questionSet[questsetIndex]
                            };
                            return suppQuestCtrl.formQuestSetData;
                        }
                    }
                });

                modalInstance.result.then(function (toDelete) {
                    if (toDelete) {
                        suppQuestCtrl.questionData.questionSet.splice(questsetIndex, 1);
                    }
                });
            };

            suppQuestCtrl.confirmDeleteQuestionSet = function (questsetIndex) {
                suppQuestCtrl.openDeleteQuestionSet(questsetIndex);
                if ($(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").height() == "0") {

                    $(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").animate({
                        "height": "0"
                    });
                }
            };
            // edit QuestionSet Modal
            suppQuestCtrl.openEditQuestionSet = function (questsetIndex) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/modals/editQuestionSet.html',
                    controller: 'AddSuppQuestionSetModal',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        formQuestSetData: function () {
                            suppQuestCtrl.formQuestSetData = {
                                action: "edit",
                                questionSet: angular.copy(suppQuestCtrl.questionData.questionSet[questsetIndex])
                            };
                            return suppQuestCtrl.formQuestSetData;
                        }
                    }
                });

                modalInstance.result.then(function (updatedQuestionSet) {
                    suppQuestCtrl.questionData.questionSet[questsetIndex] = updatedQuestionSet;
                });
            };
            suppQuestCtrl.editQuestionSet = function (questsetIndex) {

                suppQuestCtrl.openEditQuestionSet(questsetIndex);
                if ($(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").height() == "0") {
                    $(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").animate({
                        "height": "0"
                    });
                }
            };

            suppQuestCtrl.post_question_server = function (url) {

                serverQuestion.all("saveGatewayQuestionInstructions").post(suppQuestCtrl.questionData).then(function (data) {
                    suppQuestCtrl.questionData = data;
                    $scope.suppQuestions.$setPristine();
                });
            };

            suppQuestCtrl.save = function () {

                if (local_environment) {
                    // $scope.suppQuestions.$setPristine();
                    suppQuestCtrl.get_question_data('gateway_questions.json');
                    toastr.success('Supplemental Application saved successfully', 'Success', {
                        allowHtml: true
                    });
                } else {
                    suppQuestCtrl.post_question_server();
                    toastr.success('Supplemental Application saved successfully', 'Success', {
                        allowHtml: true
                    });
                }

            };
            suppQuestCtrl.continueSave = function () {

                if (local_environment) {
                    // $scope.suppQuestions.$setPristine();
                    toastr.success('Supplemental Application saved successfully', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function () {
                        $state.go('appGatewayEditor.suppPay')
                    }, 3000);
                } else {
                    suppQuestCtrl.post_question_server();
                    toastr.success('Supplemental Application saved successfully', 'Success', {
                        allowHtml: true
                    });
                    $timeout(function () {
                        $state.go('appGatewayEditor.suppPay')
                    }, 3000);
                }

            };


            if (local_environment) {
                suppQuestCtrl.get_question_data('gateway_questions.json');
            } else {
                suppQuestCtrl.get_question_data('gateway/questions');
            }

            suppQuestCtrl.reset = function () {
                if (local_environment) {
                    suppQuestCtrl.get_question_data('gateway_questions.json');
                } else {
                    suppQuestCtrl.get_question_data('gateway/questions');
                }

                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');

                toastr.success('<b>Questions Reset Successful</b>', '<b>Success!</b>', {
                    allowHtml: true
                });
            };

        }]);
}());