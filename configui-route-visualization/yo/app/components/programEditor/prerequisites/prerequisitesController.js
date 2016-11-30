/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
	"use strict";
	configAppControllers.controller('ProgramEditorPrerequisites', ["$scope", "toastr", "$location", "$timeout", "Restangular", "$stateParams",
		function ($scope, toastr, $location, $timeout, Restangular, $stateParams) {
			var prereqCtrl = this;
			var serverPrerequisite;
			var setFormPristine = function () {
				$timeout(function () {
					$scope.programEditPrerequisites.$setPristine();
				}, 1000);
			};
			$scope.integerval = /^\d{0,9}(\.\d{1,9})?$/;

			if (local_environment) {
				serverPrerequisite = Restangular.all('app').all('data');
			} else {
				serverPrerequisite = Restangular.all('configuration');
			}

			prereqCtrl.prerequisitesList;

			prereqCtrl.add_prerequisites = function () {
				if (!prereqCtrl.prerequisitesList.prerequisites) {
					prereqCtrl.prerequisitesList.prerequisites = [];
				}
				if (prereqCtrl.prerequisitesList.prerequisites.length <= 50) {
					prereqCtrl.prerequisitesList.prerequisites.push({
						"id": null,
						"name": "",
						"description": "",
						"example": "",
						"minGrade": "",
						"minCredits": null
					});
				}

			};
			prereqCtrl.isPageVisible = true;
			prereqCtrl.show_Page_Or_Alert = function () {
				if (prereqCtrl.prerequisitesList.prerequisites == undefined) {
					prereqCtrl.isPageVisible = false;
				}
			};

			prereqCtrl.post_prereqisites_server = function () {
				var url = 'programMaterials/prerequisites';
				serverPrerequisite.all(url).post(prereqCtrl.prerequisitesList).then(function (data) {
					prereqCtrl.prerequisitesList = data;
					toastr.success('Prerequisites saved Successfully');
				}, function (response) {
					toastr.error('Error with status code', response.status)
				});
			};

			prereqCtrl.delete_prereqisites_server = function (prerequisiteId) {
				if (!local_environment) {
					if (prerequisiteId) {
						var url = 'programMaterials/prerequisites/' + prerequisiteId;
						serverPrerequisite.one(url).remove();

					}
				}

				toastr.success('Prerequisites removed Successfully');
			};

			prereqCtrl.remove_prerequisites = function (index) {
				prereqCtrl.delete_prereqisites_server(prereqCtrl.prerequisitesList.prerequisites[index].id);
				prereqCtrl.prerequisitesList.prerequisites.splice(index, 1);

			};

			prereqCtrl.save = function () {
				if (!local_environment) {
					prereqCtrl.post_prereqisites_server();
				}
			};

			prereqCtrl.cancel = function () {
				$location.path('/programhome/' + $stateParams.programId + '/home');
				toastr.warning('Action has been canceled')
			};
			prereqCtrl.alerts = [];

			prereqCtrl.get_prerequisite_data = function (url) {
				serverPrerequisite.get(url).then(function (data) {
					prereqCtrl.prerequisitesList = data;
					prereqCtrl.show_Page_Or_Alert();
					setFormPristine();
				});
			};

			if (local_environment) {
				// prereqCtrl.get_prerequisite_data('prerequisites.json');
			} else {
				prereqCtrl.get_prerequisite_data('programMaterials/prerequisites');
			}

			prereqCtrl.reset = function () {
				if (local_environment) {
					prereqCtrl.get_prerequisite_data('prerequisites.json');
				} else {
					prereqCtrl.get_prerequisite_data('programMaterials/prerequisites');
				}

				var body = $("html, body");
				body.animate({
					scrollTop: 0
				}, '500', 'swing');

				toastr.info('<b>Prerequisites reset Successfully</b>', '<b>Success!</b>', {
					allowHtml: true
				});
			}

		}]);

}());