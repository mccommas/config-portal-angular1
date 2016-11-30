/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
	"use strict";
	configAppControllers.controller('headerController', ["$scope", "Restangular", "$state", "$rootScope", "$stateParams", "$window", "programNavService",
		function ($scope, Restangular, $state, $rootScope, $stateParams, $window, programNavService) {
			var headerCtrl = this;
			headerCtrl.programId = $stateParams.programId;
			headerCtrl.gatewayId = $stateParams.gatewayId;
			headerCtrl.headerData = null;
			headerCtrl.currentState = $state;
			var serverHeader;
			if (local_environment) {
				serverHeader = Restangular.all('app').all('data');
			} else {
				serverHeader = Restangular.all('configuration');
			}

			headerCtrl.get_header_data = function (url) {
				serverHeader.get(url).then(function (data) {
					headerCtrl.headerData = data;
					$rootScope.$broadcast('headerdataloaded', data);
				});
			};

            headerCtrl.startHeaderLoading = function () {
                if (local_environment) {
                	if($state.$current.name == 'programDetails'){
                    	headerCtrl.get_header_data('nameinfo.json');
	                }else{
	                	headerCtrl.get_header_data('nameinfo.json');
	                }
                } else {
                	if($state.$current.name == 'programDetails'){
                		headerCtrl.get_header_data('getProgramNameInfo/'+ ($stateParams.programId ? $stateParams.programId : headerCtrl.gatewayId) );
                	}else{
                		headerCtrl.get_header_data('nameInfo');
                	}
                }
            };
            var listenerEvent = $rootScope.$on('startHeaderLoading', function (event, data) {
                //headerCtrl.startHeaderLoading();
            });

            $scope.$on('$destroy', function () {
                //listenerEvent(); // remove listener.
            });
            //if ($state.$current.name.toString() != "programedit") {
                headerCtrl.startHeaderLoading();
            //}


			headerCtrl.goToHome = function () {
				if($state.params.previousState && $state.params.previousState === "programedit"){
					$state.go("programedit", {"programId":$stateParams.programId, "previousState": $state.current.name});
				}else{
					$state.go("programDetails", {"programId":$stateParams.programId, "previousState": $state.current.name});
				}
			};

			headerCtrl.goToBranding = function () {
				$state.go("programBranding", {"programId":$stateParams.programId, "previousState": $state.current.name});
			};

			headerCtrl.gotoPreviousView = function(){
				if($state.params.previousState){
					$state.go($state.params.previousState,{"programId":$stateParams.programId, "previousState": $state.current.name});
				}else{
					$state.go("programslist", {"orgId":headerCtrl.headerData.organization.id});
				}
			};

			headerCtrl.backToOrg = function () {
				//Just doing history.back using $window angular service
				$window.history.back();
				//                if ($stateParams.target) {
				//                    //if target query string is present then redirect to appHome
				//                    $window.history.back();
				//                } else {
				//                    $state.go('programslist.programs', {
				//                        orgId: headerCtrl.headerData.organization.id
				//                    });
				//                }
			};
			headerCtrl.backToApps = function () {
				$state.go('programslist.applications', {
					orgId: headerCtrl.headerData.organization.id
				});
			};

			headerCtrl.backToPrograms = function(){
				var parentState = programNavService.getParent();
				if(parentState){
					if(parentState.state === "apphome.inReviewListings"){
						$rootScope.$broadcast('navigateToApp');
					}
					$state.go(parentState.state,parentState.params);
				}else{
					$state.go('programslist',{'orgId':headerCtrl.headerData.organization.id});
				}
			};

			switch ($state.$current.path.toString()) {
				case "programedit":
					headerCtrl.showProgramTitle = true;
					break;
				case "programDetails":
					headerCtrl.showProgramTitle = true;
					break;
				case "programBranding":
					headerCtrl.showBrandingTitle = true;
					break;
				default:
					headerCtrl.showEditorTitle = true;
					break;
			}

			switch ($state.$current.path.toString()) {
				case "appGatewayEditor":
					headerCtrl.showAppEditirTitle = true;
					break;
				case "appGatewayBranding":
					headerCtrl.showAppBrandingTitle = true;
					break;
				default:
					headerCtrl.showAppEditirTitle = true;
					break;
			}

		}]); // end headerController
}());