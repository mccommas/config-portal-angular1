configAppControllers.controller('inReviewSettingCtrl', ['$scope', '$rootScope', 'Restangular', '$stateParams', '$kWindow', 'toastr', '$uibModal', '$state',
 function ($scope, $rootScope, Restangular, $stateParams, $kWindow, toastr, $uibModal, $state) {

        var inReviewCtrl = this,
            ProgDetailCtrl = $scope.$parent.ProgDetailCtrl,
            init;
        var previewDataServer;
        inReviewCtrl.currentState = $state;

        if (local_environment) {
            //Creating restangular server object
            previewDataServer = Restangular.all('app').all('data');
        } else {
            previewDataServer = Restangular.all('configuration');
        }

        

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////*************** GET REQUEST FUNCTIONS ********************////////////////////////
        ////////////////////////**********************************************************////////////////////////


        // get the data for home branding modal
        inReviewCtrl.getHomeBrandingData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.brandData = angular.copy(data);
            });
        };
        // get the data for Perquisites modal
        inReviewCtrl.getPrerequisitesData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.prerequisitesData = angular.copy(data);
            });
        };
        // get the data for Document modal
        inReviewCtrl.getDocumentData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.documentData = angular.copy(data);
            });
        };
        // get the data for Evaluation modal
        inReviewCtrl.getEvaluationData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.evaluationData = angular.copy(data);
            });
        };
        // get the data for Question modal
        inReviewCtrl.getQuestionData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.questionData = angular.copy(data);
            });
        };
        // get the data for High School transcript modal
        inReviewCtrl.getHighSchoolData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.highSchoolData = angular.copy(data);
            });
        };
        // get the data for College Transcripts & Coursework modal
        inReviewCtrl.getCollegeTransData = function (url) {
            //function to get application json for header section data
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.collegeTransData = angular.copy(data);
            });
        };

        //get the data for active program settings
        inReviewCtrl.getActiveProgramSettings = function (url) {
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.activeProgramSettings = angular.copy(data);
            });
        };

        //get the data for program home data config
        inReviewCtrl.getHomeBrandingConfigData = function (url) {
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.programHomeConfig = angular.copy(data);
            });
        };
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////*************** END GET REQUEST FUNCTIONS ****************////////////////////////
        ////////////////////////**********************************************************////////////////////////


        // all the modals and whatnot
        inReviewCtrl.openPreview = function (previewItem) {
            var modalWidth;
            if (previewItem.sectionName === 'College Transcripts & Coursework') {
                modalWidth = 500;
            } else if (previewItem.sectionName === 'Prerequisites') {
                modalWidth = 700;
            } else {
                modalWidth = 915
            }
            var windowInstance = $kWindow.open({
                modal: true,
                title: previewItem.sectionName,
                width: modalWidth,
                templateUrl: 'components/dashboard/inReview/modal/preview.html',
                controller: 'previewCtrl as previewCtrl',
                resolve: {
                    previewItem: function () {
                        return previewItem;
                    },
                    brandingData: function () {
                        return inReviewCtrl.brandData;
                    },
                    programData: function () {
                        return ProgDetailCtrl.programDetails;
                    },
                    prerequisitesData: function () {
                        return inReviewCtrl.prerequisitesData;
                    },
                    documentData: function () {
                        return inReviewCtrl.documentData;
                    },
                    evaluationData: function () {
                        return inReviewCtrl.evaluationData;
                    },
                    questionData: function () {
                        return inReviewCtrl.questionData;
                    },
                    headerData: function () {
                        return inReviewCtrl.headerdata;
                    },
                    highSchoolData: function () {
                        return inReviewCtrl.highSchoolData;
                    },
                    collegeTransData: function () {
                        return inReviewCtrl.collegeTransData;
                    },
                    nameInfoData: function () {
                        return ProgDetailCtrl.headerdata;
                    },
                    activeProgramSettings: function () {
                        return inReviewCtrl.activeProgramSettings
                    },
                    homeConfig: function () {
                        return inReviewCtrl.programHomeConfig
                    }
                }
            });
            windowInstance.result.then(function (data) {
                inReviewCtrl.brandData = angular.copy(data);
            });
        };

        // open submit for Activate modal
        inReviewCtrl.openActivateModal = function (program) {
            //Code to open Activate Modal
            var modalInstance = $uibModal.open({
                templateUrl: 'components/dashboard/programDetails/modals/submitActivate.html',
                controller: 'ActiveProgramModal as activateCtrl',
                backdrop: 'static',
                animation: true,
                keyboard: false,
	            resolve: {
		            programData: function () {
			            return program;
		            },
		            apiEnabled: function(){
			            return inReviewCtrl.headerdata.apiEnabled;
		            }
	            }
            });

            modalInstance.result.then(function (isSubmitted) {
                //Called when ACTIVATE modal is closed
                if (isSubmitted) {
                    //If activation was successfull
                    program.status = "Active";
                    ProgDetailCtrl.headerdata.program.status = "Active";
                    toastr.success('Program Activated', 'Success', {
                        allowHtml: true
                    });
                }
            });
        };
        inReviewCtrl.openResetDraftModal = function (program) {
            //changing program status to Draft in program object
            program.status = "Draft";
            //changing program status to Draft in program object that we have in header nameinfo
            ProgDetailCtrl.headerdata.program.status = "Draft";
            if (local_environment) {
                toastr.success('Program Drafted', 'Success', {
                    allowHtml: true
                });
            } else {
                previewDataServer.all("/programStatus/" + program.id).post('draft').then(function (data) {
                    toastr.success('Program Drafted', 'Success', {
                        allowHtml: true
                    });
                });
            }
        };
        // open submit for review modal
        inReviewCtrl.openReviewModal = function (program) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/dashboard/programDetails/modals/submitReview.html',
                controller: 'SubmitProgramReviewModal as reviewCtrl',
                backdrop: 'static',
                animation: false,
                keyboard: false,
	            resolve: {
		            programData: function () {
			            return program;
		            },
		            apiEnabled: function(){
			            return inReviewCtrl.headerdata.apiEnabled;
		            }
	            }
            });

            modalInstance.result.then(function (isSubmitted) {
                if (isSubmitted) {
                    program.status = "Review";
                    program.isReviewed = true;
                    toastr.success('Program Activity Submitted for Review', 'Success', {
                        allowHtml: true
                    });
                }

            })
        };

        inReviewCtrl.closeProgram = function (program) {
            if (local_environment) {
                program.status = 'closed';
                toastr.success('Program Archived', 'Success', {
                    allowHtml: true
                });
            } else {
                program.status = 'closed';
                previewDataServer.all("/programStatus/" + program.id).post('closed').then(function (data) {
                    toastr.success('Program Archived', 'Success', {
                        allowHtml: true
                    });
                });
            }
        };
        init = function (data) {
            if (local_environment) {
                //if local environment
                inReviewCtrl.getHomeBrandingData('branding.json');
                inReviewCtrl.getPrerequisitesData('prerequisites.json');
                inReviewCtrl.getDocumentData('documents.json');
                inReviewCtrl.getEvaluationData('evaluations.json');
                inReviewCtrl.getQuestionData('questionsPreview.json');
                inReviewCtrl.getHighSchoolData('prg_hs_transcripts.json');
                inReviewCtrl.getCollegeTransData('prg_ca_transcripts.json');
                //inReviewCtrl.getActiveProgramSettings('program_sections.json');
                inReviewCtrl.getHomeBrandingConfigData('program_home_preview_config.json');
            } else {
                //need to add URL here
                inReviewCtrl.getHomeBrandingData('programBrandingConfig');
                inReviewCtrl.getPrerequisitesData('programMaterials/prerequisites');
                inReviewCtrl.getDocumentData("programMaterials/documents");
                inReviewCtrl.getEvaluationData("programMaterials/evaluations");
                inReviewCtrl.getQuestionData('programMaterialquestionsPreview');
                inReviewCtrl.getHighSchoolData('highSchoolTranscripts/');
                inReviewCtrl.getCollegeTransData('collegeTranscripts/');
                //inReviewCtrl.getActiveProgramSettings('getProgramSections');
                inReviewCtrl.getHomeBrandingConfigData('programHomePageElements');
            }
        }
        inReviewCtrl.get_program_preview = function (url) {
            previewDataServer.get(url).then(function (data) {
                inReviewCtrl.programPreview = data;
                inReviewCtrl.activeProgramSettings = angular.copy(data);
                init(data);
            });
        };

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////************* IF LOCAL ENVIRONMENT CONDITION *************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        // getting the nameInfo here for programs
        var ListenerEvent = $rootScope.$on('headerdataloaded', function (event, data) {
            inReviewCtrl.headerdata = data;
            if (local_environment) {
                //if local environment 
                inReviewCtrl.get_program_preview('program_sections.json');
            } else {
                //need to add URL here 
                inReviewCtrl.get_program_preview('getProgramSections');
            }
        });

        $scope.$on('$destroy',function(){
            ListenerEvent();
        });        
}]);