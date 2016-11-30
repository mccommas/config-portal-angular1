/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
	"use strict";
	configAppControllers.controller('MainController', ["$scope", "$location", "usSpinnerService", "$timeout", "$state", "$rootScope", "Restangular", "toastr", "Configuration", "Idle", "Keepalive", "$uibModal",
		function ($scope, $location, usSpinnerService, $timeout, $state, $rootScope, Restangular, toastr, Configuration, Idle, Keepalive, $uibModal) {
			var MainCtrl = this;

			MainCtrl.pruneStyle = function (html) {
				var temp;
				html = html.replace('<pre', '<div');
				html = html.replace('</pre>', '</div>');
				$('body').append("<div id='tempDiv'>" + html + "</div>");
				$('#tempDiv').find("*").removeAttr("style");
				temp = $('#tempDiv').html();
				$('#tempDiv').remove();
				return temp;
			};
			MainCtrl.Configuration = Configuration;
			$rootScope.$on('$stateChangeStart', function (event, appMvCtrl, toState, toParams, fromState, fromParams) {
				//  console.log('event was:', event);
			});
			$rootScope.$on('$stateChangeError', function (event, appMvCtrl, toState, toParams, fromState, fromParams, error) {
				//  console.log('event was:', event);
				// toastr.error('Could not load ' + toState.name);
			});
			$rootScope.$on('$stateChangeSuccess', function () {
				var body = $("html, body");
				body.animate({
					scrollTop: 0
				}, '500');

			});
			$scope.startSpin = function () {
				if (!$scope.spinneractive) {
					usSpinnerService.spin('spinner-1');
					$scope.startcounter++;
				}
			};

			$scope.stopSpin = function () {
				if ($scope.spinneractive) {
					usSpinnerService.stop('spinner-1');
				}
			};
			$scope.spinneractive = false;

			$rootScope.$on('us-spinner:spin', function (event, key) {
				$scope.spinneractive = true;
			});

			$rootScope.$on('us-spinner:stop', function (event, key) {
				$scope.spinneractive = false;
			});
			Restangular.addRequestInterceptor(function (element, operation, what, url) {
				$rootScope.xhr = true;
				$timeout(function () {
					$scope.startSpin();
				});
				return element;
			});
			Restangular.addResponseInterceptor(function (data, what, url, response) {
				$rootScope.xhr = false;
				$timeout(function () {
					$scope.stopSpin();
				});
				return data;


			});
			Restangular.setErrorInterceptor(function (response) {

				if (response.status == 401) {
					toastr.error('Oops, looks like something went wrong here.<br>Please try your request again later.<br><br>Error Code: ' + response.status, 'ERROR!!', {
						allowHtml: true,
						closeButton: true
					});

				} else if (response.status == 400) {
					toastr.error('Oops, looks like something went wrong here.<br>Please try your request again later.<br><br>Error Code: ' + response.status, 'ERROR!!', {
						allowHtml: true,
						closeButton: true
					});
				} else {
					toastr.error("Response received with HTTP error code: " + response.status, 'ERROR!!', {
						allowHtml: true,
						closeButton: true
					});
				}
				return false;
				//console.log(data);
				//console.log(operation);
				//console.log(what);
				//console.log(url);
				//console.log(response);
				//console.log(deferred);

			});
			// Code for modal popup warning if browser is unsupported
			jQuery.reject({
				reject: {
					all: false,
					msie9: true,
					msie8: true
				}, // Reject all renderers for demo
				display: ['firefox', 'chrome', 'msie'],
				header: 'Your browser is not supported here', // Header Text
				paragraph1: 'You are currently using an unsupported browser', // Paragraph 1
				paragraph2: 'Please install one of the many optional browsers below to proceed'
				//closeMessage: 'Close this window!' // Message below close window link
			}); // Customized Text

			jQuery(function () {
				jQuery.reject();
			});
////////////////////////**********************************************************////////////////////////
			////////////////////////**********************************************************////////////////////////
			////////////////////////******************IDLE MODAL TIMEOUT CODE*********************////////////////////////
			////////////////////////**********************************************************////////////////////////
			////////////////////////**********************************************************////////////////////////

			function closeModals() {
				if (MainCtrl.warning) {
					MainCtrl.warning.close();
					MainCtrl.warning = null;
				}

				if (MainCtrl.timedout) {
					MainCtrl.timedout.close();
					MainCtrl.timedout = null;
				}
			}
			$scope.$on('IdleStart', function () {
				closeModals();
				MainCtrl.warning = $uibModal.open({
					templateUrl: 'components/idle/warning.html',
					controller: 'idleCtrl as idleCtrl', //Both timeout and warning modal use same controller
					windowClass: 'modal-danger'
					//backdrop : 'static'
				});
			});
			$scope.$on('IdleEnd', function () {
				closeModals();
			});
			$scope.$on('IdleTimeout', function () {
				closeModals();
				MainCtrl.timedout = $uibModal.open({
					templateUrl: 'components/idle/timeout.html',
					controller: 'idleCtrl as idleCtrl', //Both timeout and warning modal use same controller
					windowClass: 'modal-danger',
					backdrop : 'static'
				});
			});
		}]); /////// end MainController
}());