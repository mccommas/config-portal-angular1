(function () {
	"use strict";
	configAppControllers.controller('AddQuestionSetModal', ["$scope", "toastr", "$uibModalInstance", "$location", "formQuestSetData", "$stateParams", "Restangular",
		function ($scope, toastr, $uibModalInstance, $location, formQuestSetData, $stateParams, Restangular) {
			var serverQuestionSet;
			if (local_environment) {
				serverQuestionSet = Restangular.all('app').all('data');
			} else {
				serverQuestionSet = Restangular.all('configuration');
			}

			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
				toastr.warning('Action was canceled', 'Canceled', {
					allowHtml: true
				});
			};
			$scope.questionsSet;

			$scope.post_quest_set_server = function (url) {
				serverQuestionSet.all(url).post($scope.questionsSet).then(function (data) {
					data.questions = $scope.questionsSet.questions;
					$scope.questionsSet = data;
					$uibModalInstance.close(data);
				});
			};


			if (formQuestSetData.action == "edit") {
				$scope.questionsSet = formQuestSetData.questionSet;
			}


			if (formQuestSetData.action == "add") {
				$scope.questionsSet = {};
			}

			$scope.saveQuestionSet = function () {
				if (local_environment) {
					$uibModalInstance.close($scope.questionsSet);
				} else {
					//Using savequestionblockUrl URL from formQuestSetData resolved data
					$scope.post_quest_set_server(formQuestSetData.savequestionblockUrl);
				}

				toastr.success('Question Set saved!!', 'Success', {
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
						$scope.delete_quest_set_url = "programMaterials/deletequestionblock/" + formQuestSetData.questionSet.id;
						serverQuestionSet.one($scope.delete_quest_set_url).remove();
						$uibModalInstance.close(true);
						toastr.success(' Question Set Deleted', 'Success', {
							allowHtml: true
						});
					}
				};
				$scope.cancelDelete = function () {
					$uibModalInstance.close(false);
					toastr.warning('Action was canceled', 'Canceled', {
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