/**
 * Created by jmccommas on 8/3/15.
 */

(function () {
	'use strict';
	configAppControllers.controller('InReviewListingsController', ['$scope', '$route', 'Restangular','$state', '$stateParams', '$uibModal', '$timeout', 'toastr', '$rootScope', '$q',
		function ($scope, $route, Restangular, $state, $stateParams, $uibModal, $timeout, toastr, $rootScope, $q) {
			var inReviewListCtrl = this;
			var inReviewListServer;
			if (local_environment) {
				inReviewListServer = Restangular.all('app').all('data');
			} else {
				inReviewListServer = Restangular.all('configuration');
			}

		} // end functions

	]); // end controller function
}());
