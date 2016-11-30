/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
	'use strict';
	configAppControllers.controller('ProgramEditorQuestions', ['$timeout', '$scope', '$route', '$location', '$uibModal', '$stateParams', 'Restangular', 'toastr', '$state',
		function ($timeout, $scope, $route, $location, $uibModal, $stateParams, Restangular, toastr, $state) {
			var questionsCtrl = this;
			var serverQuestion;
			var setFormPristine = function () {
				$timeout(function () {
					$scope.questionsHome.$setPristine();
				}, 1000);
			};
			questionsCtrl.serviceUrls = {
				"getquestiondata": "",
				"savequestionblock": "",
				"savequestioninstruction": ""
			};

			questionsCtrl.currentState = $state.current.name;
			//Depending on current state change serviceUrl
			if (questionsCtrl.currentState === "organizationEditor") {
				questionsCtrl.serviceUrls.getquestiondata = "organizationeditor/questions";
				questionsCtrl.serviceUrls.savequestionblock = "organizationeditor/saveOrUpdateQuestionBlock";
				questionsCtrl.serviceUrls.savequestioninstruction = "saveorganizationquestionsinstructions";
			} else {
				questionsCtrl.serviceUrls.getquestiondata = "programMaterials/questions";
				questionsCtrl.serviceUrls.savequestionblock = "programMaterials/saveOrUpdateQuestionBlock";
				questionsCtrl.serviceUrls.savequestioninstruction = "savecustomquestionsinstructions";
			}

			if (local_environment) {
				serverQuestion = Restangular.all('app').all('data');
			} else {
				serverQuestion = Restangular.all('configuration');
			}

			function clone(obj) {
				var attr,
					copy;
				if (null === obj || "object" !== typeof obj) {
					return obj;
				}
				copy = obj.constructor();
				for (attr in obj) {
					if (obj.hasOwnProperty(attr)) {
						copy[attr] = obj[attr];
					}
				}
				return copy;
			}

			questionsCtrl.status = {
				isFirstOpen: true,
				isFirstDisabled: false
			};
			questionsCtrl.addIsOpenProperty = function (data) {
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
			questionsCtrl.addNewQuestionInput = function (event) {
				questionsCtrl.questions.push({
					'question': ''
				});
			};


			questionsCtrl.get_question_data = function (url) {
				serverQuestion.get(url).then(function (data) {
					questionsCtrl.addIsOpenProperty(data);
					questionsCtrl.questionData = data;
					setFormPristine();
				});
			};

			// Add Question Modal
			questionsCtrl.openQuestion = function (questionsetIndex) {
				var modalInstance = $uibModal.open({
					templateUrl: 'components/programEditor/questions/modals/addQuestion.html',
					controller: 'AddQuestionModal',
					backdrop: 'static',
					keyboard: false,
					resolve: {
						formQuestData: function () {
							questionsCtrl.formQuestData = {
								action: "add",
								question: null,
								questionSetId: questionsCtrl.questionData.questionSet[questionsetIndex].id
							};
							return questionsCtrl.formQuestData;
						}
					}
				});

				modalInstance.result.then(function (newQuestion) {
					questionsCtrl.submitted = true;
					questionsCtrl.messages = 'SAVED';
					$timeout(function () {
						questionsCtrl.messages = null;
					}, 3000);
					if (questionsCtrl.questionData.questionSet[questionsetIndex].questions === undefined) {
						questionsCtrl.questionData.questionSet[questionsetIndex].questions = [];
					}
					questionsCtrl.questionData.questionSet[questionsetIndex].questions.push(newQuestion);
				});
			};
			questionsCtrl.addQuestion = function (questionsetIndex) {
				questionsCtrl.openQuestion(questionsetIndex);
			};

			// edit Question Modal
			questionsCtrl.openEditQuestion = function (questsetIndex, questIndex) {
				var modalInstance = $uibModal.open({
					templateUrl: 'components/programEditor/questions/modals/addQuestion.html',
					controller: 'AddQuestionModal',
					backdrop: 'static',
					keyboard: false,
					resolve: {
						formQuestData: function () {
							questionsCtrl.formQuestData = {
								action: "edit",
								question: angular.copy(questionsCtrl.questionData.questionSet[questsetIndex].questions[questIndex]),
								questionSetId: questionsCtrl.questionData.questionSet[questsetIndex].id
							};
							return questionsCtrl.formQuestData;
						}
					}
				});

				modalInstance.result.then(function (updatedQuestion) {
					questionsCtrl.questionData.questionSet[questsetIndex].questions[questIndex] = updatedQuestion;
				});
			};
			questionsCtrl.editQuestion = function (questsetIndex, questIndex) {
				questionsCtrl.openEditQuestion(questsetIndex, questIndex);
			};
			// delete Question Modal
			questionsCtrl.openDeleteQuestion = function (questsetIndex, questIndex) {
				var modalInstance = $uibModal.open({
					templateUrl: 'components/programEditor/questions/modals/deleteQuestion.html',
					controller: 'AddQuestionModal',
					backdrop: 'static',
					keyboard: false,
					resolve: {
						formQuestData: function () {
							questionsCtrl.formQuestData = {
								action: "delete",
								question: angular.copy(questionsCtrl.questionData.questionSet[questsetIndex].questions[questIndex]),
							};
							return questionsCtrl.formQuestData;
						}
					}
				});

				modalInstance.result.then(function (toDelete) {
					if (toDelete) {
						questionsCtrl.questionData.questionSet[questsetIndex].questions.splice(questIndex, 1);
					}
				});
			};
			questionsCtrl.confirmDeleteQuestion = function (questsetIndex, questIndex) {
				questionsCtrl.openDeleteQuestion(questsetIndex, questIndex);
			};


			// Add Question Set Modal
			questionsCtrl.openQuestionSet = function () {
				var modalInstance = $uibModal.open({
					templateUrl: 'components/programEditor/questions/modals/addQuestionSet.html',
					controller: 'AddQuestionSetModal',
					backdrop: 'static',
					keyboard: false,
					resolve: {
						formQuestSetData: function () {
							questionsCtrl.parentdata = questionsCtrl.questionData.questionSet.length;
							questionsCtrl.formQuestSetData = {
								action: "add",
								savequestionblockUrl: questionsCtrl.serviceUrls.savequestionblock,
								questionSet: questionsCtrl.parentdata
							};
							return questionsCtrl.formQuestSetData;
						}
					}
				});

				modalInstance.result.then(function (tempQSet) {
					tempQSet.isOpen = true;
					questionsCtrl.questionData.questionSet.push(tempQSet);
				});

			};
			questionsCtrl.addQuestionSet = function () {
				questionsCtrl.openQuestionSet();
			};

			// delete QuestionSet Modal
			questionsCtrl.openDeleteQuestionSet = function (questsetIndex) {
				var modalInstance = $uibModal.open({
					templateUrl: 'components/programEditor/questions/modals/deleteQuestionSet.html',
					controller: 'AddQuestionSetModal',
					backdrop: 'static',
					keyboard: false,
					resolve: {
						formQuestSetData: function () {
							questionsCtrl.parentdata = questionsCtrl.questionData.questionSet.length;
							questionsCtrl.formQuestSetData = {
								action: "delete",
								questionSet: questionsCtrl.questionData.questionSet[questsetIndex]
							};
							return questionsCtrl.formQuestSetData;
						}
					}
				});

				modalInstance.result.then(function (toDelete) {
					if (toDelete) {
						questionsCtrl.questionData.questionSet.splice(questsetIndex, 1);
					}
				});
			};

			questionsCtrl.confirmDeleteQuestionSet = function (questsetIndex) {
				questionsCtrl.openDeleteQuestionSet(questsetIndex);
				if ($(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").height() == "0") {

					$(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").animate({
						"height": "0"
					});
				}
			};
			// edit QuestionSet Modal
			questionsCtrl.openEditQuestionSet = function (questsetIndex) {
				var modalInstance = $uibModal.open({
					templateUrl: 'components/programEditor/questions/modals/editQuestionSet.html',
					controller: 'AddQuestionSetModal',
					backdrop: 'static',
					keyboard: false,
					resolve: {
						formQuestSetData: function () {
							questionsCtrl.formQuestSetData = {
								action: "edit",
								savequestionblockUrl: questionsCtrl.serviceUrls.savequestionblock,
								questionSet: clone(questionsCtrl.questionData.questionSet[questsetIndex])
							};
							return questionsCtrl.formQuestSetData;
						}
					}
				});

				modalInstance.result.then(function (updatedQuestionSet) {
					questionsCtrl.questionData.questionSet[questsetIndex] = updatedQuestionSet;
				});
			};
			questionsCtrl.editQuestionSet = function (questsetIndex) {

				questionsCtrl.openEditQuestionSet(questsetIndex);
				if ($(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").height() == "0") {
					$(".panel-group .panel:nth-child(" + questsetIndex + 1 + ")").children(".panel-collapse").animate({
						"height": "0"
					});
				}
			};

			questionsCtrl.post_question_server = function (url) {

				serverQuestion.all(questionsCtrl.serviceUrls.savequestioninstruction).post(questionsCtrl.questionData).then(function (data) {
					questionsCtrl.questionData = data;

				});
			};

			questionsCtrl.save = function () {

				if (local_environment) {
					questionsCtrl.get_question_data('questions.json');
					toastr.success('Program Questions saved successfully', 'Success', {
						allowHtml: true
					});
				} else {
					questionsCtrl.post_question_server();
					toastr.success('Program Questions saved successfully', 'Success', {
						allowHtml: true
					});
				}

			};

			questionsCtrl.cancel = function () {
				$location.path('/programhome/' + $stateParams.programId + '/home');
				toastr.warning('Questions has been canceled', 'Canceled', {
					allowHtml: true
				})
			};


			if (local_environment) {
				questionsCtrl.get_question_data('questions.json');
			} else {
				questionsCtrl.get_question_data(questionsCtrl.serviceUrls.getquestiondata);
			}

			questionsCtrl.reset = function () {
				if (local_environment) {
					questionsCtrl.get_question_data('questions.json');
				} else {
					questionsCtrl.get_question_data(questionsCtrl.serviceUrls.getquestiondata);
				}

				var body = $("html, body");
				body.animate({
					scrollTop: 0
				}, '500', 'swing');

				toastr.info('<b>Question reset Successfully</b>', '<b>Success</b>', {
					allowHtml: true
				});
			};

		}]);
}());