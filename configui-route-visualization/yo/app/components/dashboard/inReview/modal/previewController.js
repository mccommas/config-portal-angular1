configAppControllers.controller('previewCtrl', ['$scope', 'Restangular', 'toastr', '$windowInstance', 'previewItem', 'brandingData', 'programData', 'prerequisitesData', 'documentData', 'evaluationData', 'questionData', 'highSchoolData', 'collegeTransData', 'nameInfoData', 'activeProgramSettings', 'homeConfig', 'headerData',
	function ($scope, Restangular, toastr, $windowInstance, previewItem, brandingData, programData, prerequisitesData, documentData, evaluationData, questionData, highSchoolData, collegeTransData, nameInfoData, activeProgramSettings, homeConfig, headerData) {
        var previewCtrl = this;

        var localData;
        if (local_environment) {
            //Creating restangular server object
            localData = Restangular.all('app').all('data');
        } else {
            localData = Restangular.all('configuration').all('assets').all('app').all('data');
        }
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////*************** Shared Code  ***************//////////////////////////////////////
        ////////////////////////**********************************************************////////////////////////

        //Setting headerdata
        previewCtrl.headerData = headerData;
        // declaring some values for html binding
        previewCtrl.previewItem = previewItem;
        //Program related data
        previewCtrl.programData = programData;
        var cleanDate = previewCtrl.programData.deadline.split('-');
        $scope.deadline = cleanDate[1] + '/' + cleanDate[2] + '/' + cleanDate[0];

        previewCtrl.nameInfo = nameInfoData;
        if (homeConfig && homeConfig.length > 0) {
            previewCtrl.homeConfig = homeConfig;
        } else {
            localData.get('program_home_preview_config_local.json').then(function (response) {
                if (response) {
                    var programHomeConfig;
                    programHomeConfig = _.find(response.programDetails, function (programHome) {
                        return programHome.id === previewCtrl.nameInfo.casId;
                    });
                    if (programHomeConfig) {
                        previewCtrl.homeConfig = programHomeConfig.fields;
                    } else {
                        programHomeConfig = _.find(response.programDetails, function (programHome) {
                            return programHome.id === "default";
                        });
                        previewCtrl.homeConfig = programHomeConfig.fields;
                    }
                }
            });
        }


        ////////////////////////**********************************************************////////////////////////
        ////////////////////////*************** ALL BRANDING MODAL CODING ***************////////////////////////
        ////////////////////////**********************************************************////////////////////////

        //Branding modal data
        previewCtrl.brandingData = brandingData;
        //this function / code will extract different values from brandingData so that values can be used
        // irrespective of their index
        previewCtrl.branding = {};
        previewCtrl.bind_branding_data = function () {
            if (previewCtrl.brandingData) {
                for (var i = 0; i < previewCtrl.brandingData.length; i++) {
                    //iterating through all items of brandingData and applying switch on different configName
                    switch (previewCtrl.brandingData[i].configName.toLowerCase()) {
                    case "instructions":
                        previewCtrl.branding.instructions = previewCtrl.brandingData[i].configValue;
                        break;
                    case "instructionstitle":
                        previewCtrl.branding.instructionsTitle = previewCtrl.brandingData[i].configValue;
                        break;
                    case "headlinetext":
                        previewCtrl.branding.headLineText = previewCtrl.brandingData[i].configValue;
                        break;
                    case "backgroundimage":
                        previewCtrl.branding.backgroundImage = previewCtrl.brandingData[i].configValue;
                        break;
                    case "primaryheadlinetext":
                        previewCtrl.branding.primaryheadlinetext = previewCtrl.brandingData[i].configValue;
                        break;
                    }
                }
            }
        };
        //calling function to extract branding data
        previewCtrl.bind_branding_data();

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////******************** All Nav Tab Data ********************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        //Retrieve the active program settings
        previewCtrl.activeProgramSettings = activeProgramSettings;
        previewCtrl.navTabs = [];
        angular.forEach(previewCtrl.activeProgramSettings, function (setting) {
            if (setting.isChildPresent === true) {
                //excluding settings not displayed as tabs in the program materials view
                if (setting.sectionName !== "Home Page/Branding" &&
                    setting.sectionName !== "High School Transcripts" &&
                    setting.sectionName !== "College Transcripts & Coursework") {

                    previewCtrl.navTabs.push(setting.sectionName);
                }
            }
        });
        previewCtrl.navTabs = _.sortBy(previewCtrl.navTabs, function (tab) {
            return tab;
        });

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////*************** ALL PREREQUISITES MODAL CODING ***********////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        //Prerequisite Modal Data
        previewCtrl.prerequisitesData = prerequisitesData;
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////*************** ALL EVALUATIONS MODAL CODING *************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        //Evaluation modal data
        previewCtrl.evaluationData = evaluationData;
        var newEvaluation = true;
        if (previewCtrl.evaluationData) {
            //Processing Program Evaluation and Application Evaluation
            if (previewCtrl.evaluationData.evaluations.length > 0) {
                var numberOfEvals = function () {
                    return new Array(data.evaluations[0].minRequired);
                };
                //If there is data inside evaluations, then iterate through each evaluation item
                angular.forEach(previewCtrl.evaluationData.evaluations, function (evaluation) {
                    //If supplementalSectionId is greater than 0 then push evaluation element to programEvaluation
                    if (evaluation.supplementalSectionId > 0) {
                        // Creating program Evaluation model data
                        var numberOfEvals = function () {
                            return new Array(evaluation.minRequired);
                        };
                        previewCtrl.programEvaluation = {
                            data: evaluation,
                            numberOfEvals: numberOfEvals()
                        };
                        newEvaluation = false;
                    } else if (evaluation.applicationFormsubsectionId > 0) {
                        //If applicationFormsubsectionId is greater than 0 then push evaluation element to applicationEvaluation
                        // Creating application Evaluation model data
                        previewCtrl.applicationEvaluation = evaluation;
                    }
                });
            }
        }
        if (newEvaluation) {
            //If new evaluation then show Zero value in view.
            previewCtrl.programEvaluation = {
                "minRequired": 0,
                "maxAllowed": 0,
                "evaluationsRequired": false
            };
        }
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////********ALL HIGH SCHOOL TRANSCRIPTS MODAL CODING *********////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        //High school modal data
        previewCtrl.highSchoolData = highSchoolData;

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////********ALL COLLEGE TRANSCRIPT MODAL CODING *********////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        previewCtrl.collegeTransData = collegeTransData;

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////********ALL DOCUMENT MODAL CODING *********////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        //Document Modal Data
        previewCtrl.documentData = documentData;

        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////********ALL QUESTION MODAL CODING *********////////////////////////
        ////////////////////////**********************************************************////////////////////////
        ////////////////////////**********************************************************////////////////////////

        //Question Modal Data
        previewCtrl.questionData = questionData;


        // lastly we need to close the modal
        previewCtrl.cancel = function () {
            $windowInstance.dismiss('cancel');
        };

        previewCtrl.range = function (n) {
            if (n) {
                return new Array(n);
            } else {
                return [];
            }
        };
	}
]);