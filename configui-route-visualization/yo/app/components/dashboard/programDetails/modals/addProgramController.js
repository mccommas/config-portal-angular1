(function () {
    "use strict";
    configAppControllers.controller('AddProgramCtrl', ["$timeout", "toastr", "$stateParams", "$location", "Restangular", "$windowInstance", "programData", "$scope", "$rootScope", "$q", "namInfoOrgData", "$state","programAttributesService",
        function ($timeout, toastr, $stateParams, $location, Restangular, $windowInstance, programData, $scope, $rootScope, $q, namInfoOrgData, $state, programAttributesService) {

            var EditProgCtrl = this;
            var serverProgram;
            $scope.isAddProgramForm = false;
            var originalResetData;
            EditProgCtrl.casid;
            EditProgCtrl.formId;

            // Dropdowns for specific casId 811,815
            $scope.cas815StartTerms = _cas815StartTerms;
            $scope.cas815Tracks = _cas815Tracks;
            EditProgCtrl.orgprogramData = programData;
            if (namInfoOrgData) {
                EditProgCtrl.casid = namInfoOrgData.casId;
            }
            if (local_environment) {
                serverProgram = Restangular.all('app').all('data');
            } else {
                serverProgram = Restangular.all('configuration');
            }

            EditProgCtrl.headerdata = namInfoOrgData;
            EditProgCtrl.casid = EditProgCtrl.headerdata.casId;
            EditProgCtrl.formId = EditProgCtrl.headerdata.formId;

            var formatDate = function (dateFieldValue) {
                var year = dateFieldValue.getFullYear() + "";
                var month = (dateFieldValue.getMonth() + 1) + "";
                var day = dateFieldValue.getDate() + "";
                var dateFormat = month + "/" + day + "/" + year;
                return dateFormat;
            };

            var formatDateServer = function (dateFieldValue) {
                var year = dateFieldValue.getFullYear() + "";
                var month = (dateFieldValue.getMonth() + 1) + "";
                var day = dateFieldValue.getDate() + "";
                var dateFormat = year + "-" + month + "-" + day;
                return dateFormat;
            };

            EditProgCtrl.bindFormData = function (data) {
                // console.log(data);
                EditProgCtrl.programDetails = data;
                if (EditProgCtrl.programDetails.deadlineDisplay) {
                    if (EditProgCtrl.programDetails.deadlineDisplay != "Rolling" && EditProgCtrl.programDetails.deadlineDisplay != "showDeadline") {
                        var temp = new Date(EditProgCtrl.programDetails.deadlineDisplay.replace(/-/g, '/'));
                        EditProgCtrl.programDetails.chooseDate = formatDate(new Date(temp.getTime() + temp.getTimezoneOffset() * 60000));
                        EditProgCtrl.programDetails.deadlineDisplay = "chooseDate";
                    }

                    var startDate = new Date(EditProgCtrl.programDetails.startDate.replace(/-/g, '/'));
                    EditProgCtrl.programDetails.startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000).mmddyyyy();

                    var deadlineDate = new Date(EditProgCtrl.programDetails.deadline.replace(/-/g, '/'));
                    EditProgCtrl.programDetails.deadline = formatDate(new Date(deadlineDate.getTime() + deadlineDate.getTimezoneOffset() * 60000));
                }
            };

            EditProgCtrl.add_program_server = function () {
                serverProgram.all("saveprogram", $stateParams.orgId).post(EditProgCtrl.programDetails).then(function (data) {
                    $windowInstance.close(data);
                //    alert(JSON.stringify(data));
                });
            };
            EditProgCtrl.cancel = function () {
                $windowInstance.close(null);
                toastr.warning('Adding program was canceled', '<b>Canceled</b>', {
                    allowHtml: true
                });

            };
            String.prototype.replaceAll = function (target, replacement) {
                return this.split(target).join(replacement);
            };

            EditProgCtrl.programDetailsSubmit = function () {
                var temp;
                if (EditProgCtrl.programDetails.deadlineDisplay == "chooseDate") {
                    EditProgCtrl.programDetails.deadlineDisplay = EditProgCtrl.programDetails.chooseDate;
                    temp = new Date(EditProgCtrl.programDetails.deadlineDisplay);
                    EditProgCtrl.programDetails.deadlineDisplay = formatDateServer(temp);
                    delete EditProgCtrl.programDetails.chooseDate;
                } else if (EditProgCtrl.programDetails.deadlineDisplay == "showDeadline") {
                    EditProgCtrl.programDetails.deadlineDisplay = EditProgCtrl.programDetails.deadline;
                    temp = new Date(EditProgCtrl.programDetails.deadlineDisplay);
                    EditProgCtrl.programDetails.deadlineDisplay = formatDateServer(temp);
                }
                temp = new Date(EditProgCtrl.programDetails.startDate);
                EditProgCtrl.programDetails.startDate = formatDateServer(temp);
                temp = new Date(EditProgCtrl.programDetails.deadline);
                EditProgCtrl.programDetails.deadline = formatDateServer(temp);
                if (EditProgCtrl.programDetails.chooseDate != undefined) {
                    delete EditProgCtrl.programDetails.chooseDate;
                }

                if (!local_environment) {
                    EditProgCtrl.add_program_server();

                } else {
                    $windowInstance.close(EditProgCtrl.programDetails);
                }
                //  alert(JSON.stringify(EditProgCtrl.programDetails));
                toastr.success('<b>' + EditProgCtrl.programDetails.programName + '</b>' + ' <br>Added Successfully', '<b>Success!</b>', {
                    allowHtml: true
                });

            };

            var bindAllDropDowns = function (url) {
                $q.all(url).then(function (data) {
                    EditProgCtrl.statesList = data[0];
                    EditProgCtrl.startTerms = _Program_startTerms;
                    EditProgCtrl.levels = _Program_levels;
	                EditProgCtrl.levels806 = _Program_levels806;
	                EditProgCtrl.levels6327 = _Program_levels6327;
	                EditProgCtrl.levels807 = _Program_levels807;
	                EditProgCtrl.Subject_807 = _Subject_807;
	                EditProgCtrl.levels1839 = _Program_levels1839;
                    EditProgCtrl.tracks = _Program_tracks;
                    EditProgCtrl.programTypes = _Program_programTypes;
	                EditProgCtrl.programTypes_805 = _Program_programTypes_805;
	                EditProgCtrl.programTypes_806 = _Program_programTypes_806;
	                EditProgCtrl.programTypes_6327 = _Program_programTypes_6327;
	                EditProgCtrl.Program_academicYears_form_809 = _Program_academicYears_form_809;
	                EditProgCtrl.Program_programTypes_6350 = _Program_programTypes_6350;
	                EditProgCtrl.Program_deliveries_6350 = _Program_deliveries_6350
	                EditProgCtrl.programTypes_1833 = _Program_programTypes_1833;
	                EditProgCtrl.Program_deliveries_1838 = _Program_deliveries_1838;
	                EditProgCtrl.Program_Program_Length_1849 = _Program_Program_Length_1849;
	                EditProgCtrl.Program_Positions_Available_1849 = _Program_Positions_Available_1849;
	                EditProgCtrl.Program_department_1849 = _Program_department_1849;
                    EditProgCtrl.concentrations = _Program_concentrations;
                    EditProgCtrl.academicYears = _Program_academicYears;
                    EditProgCtrl.deliveries = _Program_deliveries;
                    $scope.cas815StartTerms = _cas815StartTerms;
                    $scope.cas815Tracks = _cas815Tracks;

                }, function (response) {
                    // toastr.error('Error with status code', response.status)
                });
            };

            

            Date.prototype.mmddyyyy = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd = this.getDate().toString();
                return (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]) + "/" + yyyy; // padding
            };
            EditProgCtrl.isInvalidOpenDate = false;
            EditProgCtrl.isOpenDateGreaterthenDeadline = false;
            EditProgCtrl.isInvalidDeadlineDate = false;
            EditProgCtrl.isInvalidChooseDate = false;

            function isLater(str1, str2) {
                return new Date(str1) > new Date(str2);
            }
            EditProgCtrl.validateDate = function (idDatePicker, value) {
                var numberPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                var toBeMatched = value;
                if (typeof value != "string") {
                    if (value) {
                        toBeMatched = value.mmddyyyy();
                    }
                }

                if (isLater(EditProgCtrl.programDetails.startDate, EditProgCtrl.programDetails.deadline)) {
                    EditProgCtrl.isOpenDateGreaterthenDeadline = true;
                } else {
                    EditProgCtrl.isOpenDateGreaterthenDeadline = false;
                }
                switch (idDatePicker) {
                case "startDate":
                    EditProgCtrl.isInvalidOpenDate = !numberPattern.test(toBeMatched);
                    break;
                case "deadLine":
                    EditProgCtrl.isInvalidDeadlineDate = !numberPattern.test(toBeMatched);
                    break;
                case "chooseDate":
                    EditProgCtrl.isInvalidChooseDate = !numberPattern.test(toBeMatched);
                    break;
                }
            };

            EditProgCtrl.reset = function () {
                EditProgCtrl.programDetails = {
                    "id": (local_environment ? Math.floor((Math.random() * 1000) + 1) : ""),
                    "programId": (local_environment ? Math.floor((Math.random() * 1000) + 1) : ""),
                    "programName": "",
                    "status":"draft",
                    "programLevel": "",
                    "department": "",
                    "track": "",
                    "academicYear": "",
                    "startTerm": "",
                    "delivery": "",
                    "fee": null,
                    "city": "",
                    "state": "",
                    "zipCode": null,
                    "campus": null,
                    "waDisplayName": null,
                    "startDate": "",
                    "deadline": "",
                    "deadlineDisplay": "Rolling",
                    "createdDate": "",
                    "updatedDate": "",
                    "programType": "",
                    "applicationType": "",
                    "concentration": "",
                    "formId": null
                };
                toastr.info('<b>Add Program Details reset Successfully</b>', '<b>Success!</b>', {
                    allowHtml: true
                });
                $('input[type=radio]').prop('checked', false);

            };

            EditProgCtrl.programDetails = {
                "id": (local_environment ? Math.floor((Math.random() * 1000) + 1) : ""),
                "programId": (local_environment ? Math.floor((Math.random() * 1000) + 1) : null),
                "programName": "",
                "status":"draft",
                "programLevel": "",
                "department": "",
                "track": "",
                "academicYear": "",
                "startTerm": "",
                "delivery": "",
                "fee": null,
                "city": "",
                "state": "",
                "zipCode": null,
                "campus": null,
                "waDisplayName": null,
                "startDate": "",
                "deadline": "",
                "deadlineDisplay": "Rolling",
                "createdDate": "",
                "updatedDate": "",
                "programType": "",
                "applicationType": "",
                "concentration": "",
                "formId": null
            };

            EditProgCtrl.initLoading = function(){
                // test
                if (local_environment) {
                    var promises = [serverProgram.one('states.json').get()];
                    bindAllDropDowns(promises);
                } else {
                    var promises = [
                        serverProgram.one('findlookupby/LK_States/ASC').get()
                    ];
                    bindAllDropDowns(promises);
                }
            };

            EditProgCtrl.programAttributes = null;
            programAttributesService.getProgramAttributes().then(function(data){
                EditProgCtrl.programAttributes = data;
                if(EditProgCtrl.programAttributes && !EditProgCtrl.programAttributes._defaul_config){
                    
                }else{
                    EditProgCtrl.initLoading();
                }
                EditProgCtrl.getFormTemplate();
            },function(data){
                cosnole.error("Program Attribute Service failed, reason: ",data);
                EditProgCtrl.initLoading();
            });

            EditProgCtrl.formTemplate = "";
            EditProgCtrl.getFormTemplate = function () {
                console.log(EditProgCtrl.formId);
                // Condition for userType 'admissions user'' to disable few fields
                if(!EditProgCtrl.programAttributes._defaul_config){
                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_Configurable.html";
                }else {
                    switch (EditProgCtrl.casid) {
                    case 805:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_805.html";
                        break;
                    case 806:
                        switch (EditProgCtrl.formId){
                            case 6327:
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6327.html";
                                break;
                            default: 
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_806.html";
                                break;
                        }
                        break;
                    case 807:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_807.html";
                        break;
                    case 808:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_808.html";
                        break;
                    case 809:
                        switch (EditProgCtrl.formId){
                            case 6350:
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6350.html";
                                break;
                            default: 
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_809.html";
                                break;
                        }
                        break;
                    case 811:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_811.html";
                        break;
                    case 813:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_813.html";
                        break;
                    case 815:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_815.html";
                        break;
                    case 817:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_817.html";
                        break;
                    case 822:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_822.html";
                        break;
                    case 824:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_824.html";
                        break;
                    case 1832:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1832.html";
                        break;
                    case 1833:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1833.html";
                        break;
                    case 1839:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1839.html";
                        break;
                    case 1844:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1844.html";
                        break;
                    case 1838:
                        switch (EditProgCtrl.formId){
                            case 6282:
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6282.html";
                                break;
                            case 6335:
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6335.html";
                                break;
                            default: 
                                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_base.html";
                                break;
                        }
                        break;
                    default:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_base.html";
                        break;
                    }
                }
            };

        }]);
}());