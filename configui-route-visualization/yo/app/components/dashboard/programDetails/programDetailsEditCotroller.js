(function () {
    "use strict";
    configAppControllers.controller('EditProgramCtrl', ["$timeout", "toastr", "$stateParams", "$location", "Restangular", "$state", "$scope", "$rootScope", "$q","programAttributesService",
        function ($timeout, toastr, $stateParams, $location, Restangular, $state, $scope, $rootScope, $q, programAttributesService) {

            var EditProgCtrl = this;
            var serverProgram;
            var originalResetData;
            $scope.isEditProgramForm = true;
            EditProgCtrl.casid;
            EditProgCtrl.formId;
            var setFormPristine = function () {
                $timeout(function () {
                    $scope.programEditForm.$setPristine();
                }, 3000);
            };
            // Dropdowns for specific casId 811,815
            $scope.cas815StartTerms = _cas815StartTerms;
            $scope.cas815Tracks = _cas815Tracks;
            EditProgCtrl.todaysDate = new Date();

            EditProgCtrl.minDateforDeadline = function () {
                //EditProgCtrl.programDetails.startDate ? EditProgCtrl.programDetails.startDate :
	            // EditProgCtrl.todaysDatedate
                return new Date();
            };

            Date.prototype.mmddyyyy = function () {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd = this.getDate().toString();
                return (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]) + "/" + yyyy; // padding
            };
            //  minimum date format on start year
            $scope.startTermDate = new Date();
            $scope.startTermYear = $scope.startTermDate.getFullYear();

            var dates = {
                compare: function (a, b) {
                    var isSameDay = (a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear());
                    return isSameDay;
                }
            };

            if (local_environment) {
                serverProgram = Restangular.all('app').all('data');
            } else {
                serverProgram = Restangular.all('configuration');
            }

            var ListenerEvent = $rootScope.$on('headerdataloaded', function (event, data) {
                EditProgCtrl.headerdata = data;
                EditProgCtrl.casid = EditProgCtrl.headerdata.casId;
                EditProgCtrl.formId = EditProgCtrl.headerdata.formId;
                //EditProgCtrl.getFormTemplate();
                if (EditProgCtrl.headerdata.casId == 809 && EditProgCtrl.headerdata.formId == "6350") {
                    //If CasId is 809 and FormID is 6350 then we have to use _Program_academicYears_form_6350 for start Year dropdown
                    EditProgCtrl.academicYears = _Program_academicYears_form_6350;
                }
                EditProgCtrl.programAttributes = null;
                programAttributesService.getProgramAttributes(EditProgCtrl.headerdata.userType).then(function(data){
                    EditProgCtrl.programAttributes = data;
                    EditProgCtrl.getFormTemplate();
                    if(EditProgCtrl.programAttributes && !EditProgCtrl.programAttributes._defaul_config){
                        if (local_environment) {
                            EditProgCtrl.get_program_data('program.json');
                        } else {
                            EditProgCtrl.get_program_data('getProgram/' + $stateParams.programId);
                        }
                    }else{
                        EditProgCtrl.initLoading();
                    }
                },function(data){
                    cosnole.error("Program Attribute Service failed, reason: ",data);
                    EditProgCtrl.initLoading();
                });
            });

            $scope.$on('$destroy',function(){
                ListenerEvent();
            });

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
                    if (EditProgCtrl.programDetails.deadlineDisplay != "Rolling") {
                        var temp = new Date(EditProgCtrl.programDetails.deadlineDisplay.replace(/-/g, '/'));
                        //console.log(temp);
                        //console.log(new Date(EditProgCtrl.programDetails.deadline.replace(/-/g, '/')));
                        if (dates.compare(temp, new Date(EditProgCtrl.programDetails.deadline.replace(/-/g, '/')))) {
                            EditProgCtrl.programDetails.deadlineDisplay = "showDeadline";
                        } else {
                            EditProgCtrl.programDetails.chooseDate = new Date(temp.getTime() + temp.getTimezoneOffset() * 60000);
                            EditProgCtrl.programDetails.deadlineDisplay = "chooseDate";
                        }
                    }

                    var startDate = new Date(EditProgCtrl.programDetails.startDate.replace(/-/g, '/'));
                    EditProgCtrl.programDetails.startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000); //.mmddyyyy()

                    var deadlineDate = new Date(EditProgCtrl.programDetails.deadline.replace(/-/g, '/'));
                    EditProgCtrl.programDetails.deadline = new Date(deadlineDate.getTime() + deadlineDate.getTimezoneOffset() * 60000); //formatDate()
                }
            };

            EditProgCtrl.get_program_data = function (url) {
                serverProgram.get(url).then(function (data) {
                    $rootScope.$broadcast('startHeaderLoading', true);
                    //   alert(JSON.stringify(data));
                    originalResetData = angular.copy(data);
                    EditProgCtrl.bindFormData(data);
                }, function (response) {});
            };
            EditProgCtrl.add_program_server = function (submittingProgram) {
                serverProgram.all("saveprogram").post(submittingProgram).then(function (data) {
                    //alert(JSON.stringify(EditProgCtrl.programDetails));
                //  alert(JSON.stringify(EditProgCtrl.programDetails));
                    toastr.success('<b>' + EditProgCtrl.programDetails.programName + '</b>' + ' <br>Saved Successfully', '<b>Success!</b>', {
                        allowHtml: true
                    });
                    $state.go('programDetails', {
                        programId: $stateParams.programId, "previousState": $state.current.name
                    });
                }, function (response) {
                    // toastr.error('Error with status code', response.status)
                //  alert(JSON.stringify(EditProgCtrl.programDetails));
                    toastr.error('<b> oops!</b>' + ' <br>Error Saving', '<b>Error!</b>', {
                        allowHtml: true
                    });
                });
            };
            EditProgCtrl.cancel = function () {
                $state.go('programDetails', {
                    programId: $stateParams.programId, "previousState": $state.current.name
                });
                toastr.warning('<b>' + EditProgCtrl.programDetails.programName + '</b>' + ' <br>Canceled Successfully', '<b>Editing</b>', {
                    allowHtml: true
                });

            };
            String.prototype.replaceAll = function (target, replacement) {
                return this.split(target).join(replacement);
            };

            EditProgCtrl.programDetailsSubmit = function () {

                // If Program status is closed and program deadline date is updated to future then set the program status to active and save
                if (EditProgCtrl.programDetails.status.toLowerCase() === "closed" || EditProgCtrl.programDetails.status.toLowerCase() === "active") {
                    var today = new Date();
                    var deadlineDate = new Date(EditProgCtrl.programDetails.deadline);
                    //Setting deadline time to end of deadline day
                    deadlineDate.setHours(23, 59, 59, 999);
                    if(deadlineDate >= today){
                        EditProgCtrl.programDetails.status = 'active';
                    }else if(deadlineDate < today){
                        EditProgCtrl.programDetails.status = 'closed';
                    }
                }

                var submittingProgram = angular.copy(EditProgCtrl.programDetails);

                var temp;
                if (submittingProgram.deadlineDisplay == "chooseDate") {
                	submittingProgram.deadlineDisplay = submittingProgram.chooseDate;
                    temp = new Date(submittingProgram.deadlineDisplay);
                    submittingProgram.deadlineDisplay = formatDateServer(temp);
                    delete submittingProgram.chooseDate;
                } else if (submittingProgram.deadlineDisplay == "showDeadline") {
                	submittingProgram.deadlineDisplay = submittingProgram.deadline;
                    temp = new Date(submittingProgram.deadlineDisplay);
                    submittingProgram.deadlineDisplay = formatDateServer(temp);
                }
                temp = new Date(submittingProgram.startDate);
                submittingProgram.startDate = formatDateServer(temp);
                temp = new Date(submittingProgram.deadline);
                submittingProgram.deadline = formatDateServer(temp);
                if (submittingProgram.chooseDate != undefined) {
                    delete submittingProgram.chooseDate;
                }

                if (!local_environment) {
                    EditProgCtrl.add_program_server(submittingProgram);

                } else {
                //  alert(JSON.stringify(EditProgCtrl.programDetails));
                    toastr.success('<b>' + EditProgCtrl.programDetails.programName + '</b>' + ' <br>Saved Successfully', '<b>Success!</b>', {
                        allowHtml: true
                    });
                    $state.go('programDetails', {
                        programId: $stateParams.programId, "previousState": $state.current.name

                    });
                }

            };

            var bindAllDropDowns = function (url) {
                $q.all(url).then(function (data) {
                    EditProgCtrl.statesList = data[0];
                    EditProgCtrl.startTerms = _Program_startTerms;
                    EditProgCtrl.levels = _Program_levels;
	                EditProgCtrl.levels806 = _Program_levels806;
	                EditProgCtrl.levels6327 = _Program_levels6327;
	                EditProgCtrl.levels807 = _Program_levels807;
	                EditProgCtrl.levels1839 = _Program_levels1839;
	                EditProgCtrl.levels1853 = _Program_levels1853;
	                EditProgCtrl.Subject_807 = _Subject_807;
                    EditProgCtrl.tracks = _Program_tracks;
                    EditProgCtrl.programTypes = _Program_programTypes;
	                EditProgCtrl.programTypes_805 = _Program_programTypes_805;
	                EditProgCtrl.programTypes_806 = _Program_programTypes_806;
	                EditProgCtrl.Program_academicYears_form_809 = _Program_academicYears_form_809;
	                EditProgCtrl.Program_programTypes_6350 = _Program_programTypes_6350;
	                EditProgCtrl.Program_deliveries_6350 = _Program_deliveries_6350
	                EditProgCtrl.programTypes_6327 = _Program_programTypes_6327;
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
	                EditProgCtrl.cas1856Tracks = _cas1856Tracks;
                    if (local_environment) {
                        EditProgCtrl.get_program_data('program.json');
                    } else {
                        EditProgCtrl.get_program_data('getProgram/' + $stateParams.programId);
                        // EditProgCtrl.get_program_data('nameInfo');
                    }

                }, function (response) {
                    // toastr.error('Error with status code', response.status)
                });
            };



            EditProgCtrl.initLoading = function(){
                // load data after header data loaded
                if (local_environment) {
                    var promises = [serverProgram.one('states.json').get()];
                    bindAllDropDowns(promises);
                } else {
                    var promises = [
                        serverProgram.one('findlookupby/LK_States/ASC').get()
                    ];
                    bindAllDropDowns(promises);
                }

            }

            EditProgCtrl.isInvalidOpenDate = false;
            EditProgCtrl.isOpenDateGreaterthenDeadline = false;
            EditProgCtrl.isInvalidDeadlineDate = false;
            EditProgCtrl.isInvalidChooseDate = false;

            EditProgCtrl.getMinDateForDeadLine = function () {
                if (EditProgCtrl.headerdata.userType.toLowerCase() === "association user") {
                    return EditProgCtrl.programDetails.startDate ? EditProgCtrl.programDetails.startDate : EditProgCtrl.todaysDate;
                } else {
                    return EditProgCtrl.programDetails.startDate ? EditProgCtrl.programDetails.startDate > EditProgCtrl.todaysDate ? EditProgCtrl.programDetails.startDate : EditProgCtrl.todaysDate : EditProgCtrl.todaysDate;
                }
            };

            function isLater(str1, str2) {
                return new Date(str1) > new Date(str2);
            }

            EditProgCtrl.validateDate = function (idDatePicker, value) {
                var numberPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                var toBeMatched = value;
                if (typeof value != "string") {
                    toBeMatched = value.mmddyyyy();
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
                var resetdata = angular.copy(originalResetData);
                EditProgCtrl.bindFormData(resetdata);
                var body = $("html, body");
                body.animate({
                    scrollTop: 0
                }, '500', 'swing');
                toastr.info('<b>Program Details reset Successfully</b>', '<b>Success!</b>', {
                    allowHtml: true
                });
                setFormPristine();
            };
            EditProgCtrl.formTemplate = "";
            EditProgCtrl.getFormTemplate = function () {
                console.log(EditProgCtrl.formId);
                console.log("EditProgCtrl.programAttributes: ",EditProgCtrl.programAttributes);
                // Condition for userType 'admissions user'' to disable few fields
                if (EditProgCtrl.headerdata.userType.toLowerCase() === "admissions user" && (EditProgCtrl.headerdata.program.status.toLowerCase() === 'active' || EditProgCtrl.headerdata.program.status.toLowerCase() === 'closed')) {
                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_limited.html";
                }else if(EditProgCtrl.programAttributes && !EditProgCtrl.programAttributes._defaul_config){
                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_Configurable.html";
                }else if(EditProgCtrl.formId == 6327){
                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6327.html";
	            }else if(EditProgCtrl.formId == 6282){
	                EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6282.html";
			    }else if(EditProgCtrl.formId == 6335){
			        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6335.html";
			    }else if(EditProgCtrl.formId == 6350){
			        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_6350.html";
			    }
                else {
                    /*EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_Configurable.html";*/
                    switch (EditProgCtrl.casid) {
                    case 805:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_805.html";
	                    break;
                    case 806:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_806.html";
	                    break;
                    case 807:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_807.html";
	                    break;
                    case 808:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_808.html";
	                    break;
                    case 809:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_809.html";
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
                    case 1854:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1854.html";
	                    break;
                    case 1853:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1853.html";
	                    break;
	                    case 1855:
		                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1855.html";
		                    break;
                    case 1849:
	                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_1849.html";
	                    break;
	                    case 1856:
		                    EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit1856.html";
		                    break;
                    default:
                        EditProgCtrl.formTemplate = "components/dashboard/forms/programDetailsEdit_base.html";
                        break;
                    }
                }
            };
        }]);
}());
