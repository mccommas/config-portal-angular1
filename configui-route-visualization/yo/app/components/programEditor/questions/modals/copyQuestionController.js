configAppControllers.controller('CopyQuestionModal', ["$scope", "$uibModalInstance", "$location", "ngTableParams", "formQuestSetData", "$filter", "httprequesthandle",
    function ($scope, $uibModalInstance, $location, ngTableParams, formQuestSetData, $filter, httprequesthandle) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.post_quest_server = function (url) {
            httprequesthandle.http_post(url, $scope.question).then(function (data) {
                $uibModalInstance.close(data);
            });
        };
        $scope.get_copyquestion_url = 'questionBlocksToCopy';
        $scope.get_copy_question = function () {
            httprequesthandle.http_get_live($scope.get_copyquestion_url).then(function (copydata) {
                console.log("GET successful");
                $scope.copydata = copydata;               
            });
        };
        if (local_environment) {
            httprequesthandle.http_get_live('data/copy_question_get.json').then(function (copydata) {
                $scope.copydata = copydata;
            });
            httprequesthandle.http_get_live('data/copy_question_response.json').then(function (copydata) {
                $scope.copyresponse = copydata;
            });
        } else {
            $scope.get_copy_question();
        }

        $scope.copiedQuestion = [];
        $scope.toggleCheckbox = function (qid) {
            if ($scope.copiedQuestion.indexOf(qid) >= 0) {
                $scope.copiedQuestion.splice($scope.copiedQuestion.indexOf(qid), 1);
            } else {
                $scope.copiedQuestion.push(qid);
            }
        };
        $scope.copyQuestion = function () {
            if (local_environment) {
                $uibModalInstance.close($scope.copyresponse);
            } else {
                $scope.post_quest_server("programMaterials/copyquestions/" + $scope.copiedQuestion.join() + "/" + formQuestSetData.questionSetid);
            }
        };

    }]);