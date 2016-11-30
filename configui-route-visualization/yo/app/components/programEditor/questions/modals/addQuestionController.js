(function () {
    "use strict";
    configAppControllers.controller('AddQuestionModal', ["$scope", "toastr", "$timeout", "$uibModalInstance", "$location", "Restangular", "formQuestData",
        function ($scope, toastr, $timeout, $uibModalInstance, $location, Restangular, formQuestData) {
            var serverQuestion;

            if (local_environment) {
                serverQuestion = Restangular.all('app').all('data');
            } else {
                serverQuestion = Restangular.all('configuration');
            }

            $scope.questionTypeSelect = _Question_Type;
            $scope.answerFormatSelect = _Answer_Format;
            $scope.answerDisplay4Select = _Answer_Display4;
            $scope.answerDisplay8Select = _Answer_Display8;


            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                toastr.warning('Action was canceled', 'Canceled', {
                    allowHtml: true
                });
            };

            $scope.question = formQuestData.question;
            var ansEssayTyp = {
                "maxChars": 0
            };

            var ansMultipleTyp = {
                "answerOption": ""
            };


            $scope.tempMultipleChoiseAns = [];
            $scope.tempEssayLengthAns = [{
                "maxChars": 0
            }];

            $scope.post_quest_server = function (url) {
                serverQuestion.all(url).post($scope.question).then(function (data) {
                    $uibModalInstance.close(data);
                });
            };

            switch (formQuestData.action) {
            case "add":
                $scope.modalHeader = "Add Question";
                $scope.savebtntext = "Add";
                break;
            case "edit":
                $scope.modalHeader = "Edit Question";
                $scope.savebtntext = "Edit";
                break;
            }

            $scope.QuestionTypChange = function () {
                if ($scope.question.questionTypeId == 10 || $scope.question.questionTypeId == 9) {
                    $scope.tempMultipleChoiseAns = [];
                    for (var i = 0; i < 2; i++) {
                        $scope.tempMultipleChoiseAns.push({
                            "answerOption": ""
                        });
                    }
                }
            };

            if (formQuestData.action !== "delete") {
                if (formQuestData.action == "add" && $scope.question == null) {
                    $scope.question = {
                        "questionText": "",
                        "isRequired": false,
                        "questionTypeId": null,
                        "answers": []
                    };
                } else {
                    if ($scope.question.isRequired == undefined) {
                        $scope.question.isRequired = false;
                    }
                }

                if ($scope.question.questionTypeId != null) {
                    if ($scope.question.questionTypeId.toString() === "9" || $scope.question.questionTypeId.toString() === "10") {
                        $scope.tempMultipleChoiseAns = $scope.question.answers;
                    } else if ($scope.question.questionTypeId.toString() === "6") {
                        $scope.tempEssayLengthAns = $scope.question.answers;
                    }
                }

                $scope.numberPattern = /^[1-9]\d{0,3}$/;

                $scope.saveQuestion = function (addQuestionModal) {

                    if ($scope.question.questionTypeId.toString() === "10") {
                        $scope.question.answers = $scope.tempMultipleChoiseAns;
                    } else if ($scope.question.questionTypeId.toString() === "9") {
                        $scope.question.answers = $scope.tempMultipleChoiseAns;
                    } else if ($scope.question.questionTypeId.toString() === "6") {
                        $scope.question.answers = $scope.tempEssayLengthAns;
                    }
                    //$scope.question.isRequired = $('.setEditCheck2').hasClass('On') ? true : false;
                    if (local_environment) {
                        $uibModalInstance.close($scope.question);

                    } else {
                        $scope.save_quest_url = "programMaterials/saveOrUpdateQuestion/" + formQuestData.questionSetId;
                        $scope.post_quest_server($scope.save_quest_url);

                    }
                    toastr.success('Program Question saved successfully', 'Success', {
                        allowHtml: true
                    });

                };

                $scope.addNewQuestionInput = function (a) {
                    $scope.tempMultipleChoiseAns.push({
                        "answerOption": ""
                    });
                };

                $scope.removeQuestionInput = function (index) {
                    $scope.tempMultipleChoiseAns.splice(index, 1);
                    if ($scope.tempMultipleChoiseAns.length <= 2) {
                        var deleteIcon = $('question-delete');
                        deleteIcon.remove();
                    }

                    toastr.success('Question Deleted', 'Success', {
                        allowHtml: true
                    });
                };
            } else if (formQuestData.action == "delete") {
                $scope.removeQuestion = function () {
                    if (local_environment) {
                        $uibModalInstance.close(true);
                        toastr.success(' Question Deleted', 'Success', {
                            allowHtml: true
                        });
                    } else {
                        $scope.delete_quest_url = "programMaterials/deletequestion/" + formQuestData.question.id;
                        serverQuestion.one($scope.delete_quest_url).remove();
                        $uibModalInstance.close(true);
                        toastr.success(' Question Deleted', 'Success', {
                            allowHtml: true
                        });
                    }
                };
                $scope.cancelDelete = function () {
                    $uibModalInstance.close(false);
                    toastr.warning('Delete question', 'Canceled', {
                        allowHtml: true
                    });
                };

            }

            function bindEvents() {
                $(".setEditCheck2").click(function (e) {
                    if ($(this).hasClass("On")) {
                        $(this).toggleClass("On").toggleClass("Off");
                        $("#optionsRadios2").click();

                    } else if ($(this).hasClass("Off")) {
                        $(this).toggleClass("On").toggleClass("Off");
                        $("#optionsRadios1").click();
                    }
                });
            }

            setTimeout(bindEvents, 500);

        }]);
}());