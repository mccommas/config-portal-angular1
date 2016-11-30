/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('appHomeController', ["$scope", "$uibModal", "toastr", "$timeout", "$location", "$stateParams", "$state", "$rootScope", "Restangular","programAttributesService",
        function ($scope, $uibModal, toastr, $timeout, $location, $stateParams, $state, $rootScope, Restangular,programAttributesService) {
            var appHome = this;
            var serverAppHome;

            if (local_environment) {
                //Creating restangular server object
                serverAppHome = Restangular.all('app').all('data');
            } else {
                serverAppHome = Restangular.all('configuration');
            }

            appHome.appId = $stateParams.appId;

            appHome.getOrganizationListing = function (url) {
                //function to get organization list DATA 
                serverAppHome.get(url).then(function (data) {
                    //this is the object or orgnization table 
                    appHome.orgListing = data;
                    programAttributesService.setProgramAttributes();
                });
            };
            appHome.getInReviewListing = function (url) {
                //function to get inReview Program list DATA 
                serverAppHome.get(url).then(function (data) {
                    //this is the object or inReview table 
                    appHome.inReviewListing = data;
                    appHome.applicationData = data;
                });
            };

            appHome.getApplicationData = function(url){
                serverAppHome.get(url).then(function (data) {
                    appHome.applicationData = data;
                });
            };

            if (local_environment) {
                //if local environment
                appHome.getOrganizationListing('organizations.json');
                appHome.getInReviewListing('Program_List.json');
                appHome.getApplicationData('application.json');
            } else {
                //need to add URL here
                appHome.getOrganizationListing('organizations/' + appHome.appId);
                appHome.getInReviewListing('programsInReview/' + appHome.appId);
            }

	        // open submit for Activate modal
	        appHome.openActivateModal = function (program) {
		        //Code to open Activate Modal
		        var modalInstance = $uibModal.open({
			        templateUrl: 'components/dashboard/programDetails/modals/submitActivate.html',
			        controller: 'ActiveProgramModal as activateCtrl',
			        backdrop: 'static',
			        animation: true,
			        keyboard: false,
			        resolve: {
				        //Passing program information as dependency to ActivateModal Controller
				        programData: function () {
					        return program; //This is a program object on which ACTIVATE button is clicked
				        },
                        apiEnabled: function(){
    						return false;
    					}
			        }
		        });

		        modalInstance.result.then(function (isSubmitted) {
			        //Called when ACTIVATE modal is closed
			        if (isSubmitted) {
				        //If activation was successfull
				        program.status = "Active";
				        toastr.success('Program Activated', 'Success', {
					        allowHtml: true
				        });
			        }
		        });
	        };


            appHome.setOrgIdToSession = function(url, program){
                serverAppHome.all(url).post(program.organizationId).then(function(data){
                    $rootScope.$broadcast('navigateToOrg', {'app':appHome.applicationData, 'orgId':program.organizationId});
                    $state.go('programDetails',{'programId':program.id});
                });
            };

            appHome.goToProgram = function(program){
                if (local_environment) {
                    $rootScope.$broadcast('navigateToOrg', {'app':appHome.applicationData, 'orgId':program.organizationId});
                    $state.go('programDetails',{'programId':program.id});
                } else {
                    appHome.setOrgIdToSession('organizationReference', program);
                }
            };

            appHome.goToOrg = function(orgId){
                $rootScope.$broadcast('navigateToOrg', {'app':appHome.applicationData, 'orgId':orgId});
                $state.go('programslist',{'orgId':orgId});
            };

            //count the number of table rows in inReviewListings.html
	        //$timeout(function(){
		     //   var rowCount = $('#proTable tr').length;
		     //   console.log(rowCount)
	        //},1000)

        }]); // end appHomeController
}());