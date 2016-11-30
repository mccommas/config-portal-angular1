(function () {
    "use strict";
    (function () {
        "use strict";
        configAppControllers.controller('AddSuppQuestionSetModal', ["$scope", "toastr", "$uibModalInstance", "$location", "formQuestSetData", "$stateParams", "Restangular",
            function ($scope, toastr, $uibModalInstance, $location, formQuestSetData, $stateParams, Restangular) {
                var serverQuestionSet;

                if (local_environment) {
                    serverQuestionSet = Restangular.all('app').all('data');
                } else {
                    serverQuestionSet = Restangular.all('configuration');
                }

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                    toastr.warning('Changes Canceled', 'Canceled', {
                        allowHtml: true
                    });
                };
                $scope.questionsSet;

                $scope.post_quest_set_server = function (url) {
                    serverQuestionSet.all(url).post($scope.questionsSet).then(function (data) {
                        $scope.questionsSet = data;
                        //alert(JSON.stringify(data));
                        $uibModalInstance.close(data);
                    });

                };


                if (formQuestSetData.action == "edit") {
                    $scope.questionsSet = formQuestSetData.questionSet;
                    $scope.saveQuestionSet = function () {

                        if (local_environment) {
                            $uibModalInstance.close($scope.questionsSet);
                        } else {
                            $scope.save_quest_set_url = "gateway/saveOrUpdateGatewayQuestionBlock";
                            $scope.post_quest_set_server($scope.save_quest_set_url);
                        }
                        toastr.success('Question Set Saved!', 'Success', {
                            allowHtml: true
                        });
                    };
                }


                if (formQuestSetData.action == "add") {
                    $scope.questionsSet = {

                    };
                }

                $scope.saveQuestionSet = function () {
                    if (local_environment) {
                        $uibModalInstance.close($scope.questionsSet);
                    } else {
                        $scope.save_quest_set_url = "gateway/saveOrUpdateGatewayQuestionBlock";
                        $scope.post_quest_set_server($scope.save_quest_set_url);
                    }

                    toastr.success('Question Set Saved!', 'Success', {
                        allowHtml: true
                    });
                };
                if (formQuestSetData.action == "delete") {
                    $scope.removeQuestion = function () {
                        if (local_environment) {
                            $uibModalInstance.close(true);
                            toastr.success(' Question Set Deleted', 'Success', {
                                allowHtml: true
                            });
                        } else {
                            $scope.delete_quest_set_url = "gateway/deleteGatewayQuestionBlock/" + formQuestSetData.questionSet.id;
                            serverQuestionSet.one($scope.delete_quest_set_url).remove();
                            $uibModalInstance.close(true);
                            toastr.success(' Question Set Deleted', 'Success', {
                                allowHtml: true
                            });
                        }
                    };
                    $scope.cancelDelete = function () {
                        $uibModalInstance.close(false);
                        toastr.warning('Delete Canceled', 'Canceled', {
                            allowHtml: true
                        });
                    };
                }


                function bindEvents() {

                    $(".setEditCheck").click(function (e, index) {
                        if ($(this).hasClass("On")) {
                            $(this).toggleClass("On").toggleClass("Off");
                            $("#optionsRadios2").click(index);

                        } else if ($(this).hasClass("Off")) {
                            $(this).toggleClass("On").toggleClass("Off");
                            $("#optionsRadios1").click(index);
                        }
                    });

                }

                setTimeout(bindEvents, 500);

            }]);
    }());

}());