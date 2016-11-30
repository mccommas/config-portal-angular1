(function () {
    'use strict';
    configAppControllers.controller('ProgramsCtrl', ['$scope', '$kWindow', '$location', '$route', 'Restangular', '$stateParams', '$uibModal', '$timeout', 'toastr', '$rootScope', '$q', '$state', 'casInfoData', 'Configuration',
        function ($scope, $kWindow, $location, $route, Restangular, $stateParams, $uibModal, $timeout, toastr, $rootScope, $q, $state, casInfoData, Configuration) {
            var serverOrgProgram;
            var programCtrl = this;
            $scope.location = $location;
            $scope.isAddProgramForm = false;
            programCtrl.admissionUser = "admissions user";
            programCtrl.associationUser = "association user";
            if (local_environment) {
                serverOrgProgram = Restangular.all('app').all('data');
            } else {
                serverOrgProgram = Restangular.all('configuration');
            }
            $scope.casInfoData = casInfoData;
            if ($scope.casInfoData.xmlCasId == Configuration.xmlCASID) {
                $state.go("programslist.applications", {
                    gatewayId: $stateParams.orgId
                });
            }
            $scope.$route = $route;
            $scope.oneAtATime = true;
            $scope.organizationObj = [];
            $scope.list_organizations = [];
            $scope.orderbysetting = "";
            $scope.predicate = 'programName';

            $scope.getheaderOrgData = function (url, programsdata) {
                serverOrgProgram.get(url).then(function (data) {
                    $scope.headerOrgdata = data;
                    $scope.OrglistPrograms = programsdata;
                    //Fetching isAnyProgramActive field from programsdata and adding it to headerdata
                    data.isAnyProgramActive = programsdata.isAnyProgramActive;
                    $rootScope.$broadcast('orgHeaderLoaded', data);
                });
            };

            $scope.get_page_data = function (url) {
                serverOrgProgram.get(url).then(function (data) {
                    if (local_environment) {
                        $scope.getheaderOrgData('nameInfoOrg.json', data);
                    } else {
                        $scope.getheaderOrgData('nameInfoForOrg', data);
                    }

                });
            };


            if (local_environment) {
                $scope.get_page_data('Program_List.json');
            } else {
                $scope.get_page_data('programs/' + $stateParams.orgId);
            }

            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.bindProgram = function (data) {
                $scope.selected_org = data;
            };

            // Toggle the program add/copy btn to show hide btns
            $scope.togglePrograms = function (event) {
                $scope.showPrograms = true;
                $(event.target).addClass('disabled');
            };

            $scope.deleteProgram = function () {

            };

            $scope.sortingSetting = function (sortby) {

            };

            // Selected table data. Used on program listings table to toggle the row
            $scope.setSelected = function (program_status) {
                if ($scope.lastSelected == this) {
                    if (this.showButtons) {
                        //this.showButtons = false;
                    } else {
                        //this.showButtons = true;
                    }

                } else if ($scope.lastSelected) {
                    $scope.lastSelected.selected = '';
                    $scope.lastSelected.showButtons = false;
                    this.showButtons = true;
                } else {
                    this.showButtons = true;
                }

                this.selected = 'selected';

                $scope.lastSelected = this;
            }; // end table data

            // Toggle Search Button Icon
            $scope.toggleSearch = function () {
                $scope.showViewAll = !$scope.showViewAll;
                $timeout(function () {
                    $('input#programSearch').focus();
                }, 100)
            }; // toggle search

            $scope.gotoProgramEdit = function (program) {
                if ($scope.headerOrgdata.userType.toLowerCase() == programCtrl.admissionUser) {
                    return;
                }
                $state.go("programedit", {
                    programId: program.id
                });
            };

            // all modals for programs

            // Add Program Modal
            $scope.openAddProgramWindow = function () {
                $scope.title = "add program";
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: $scope.title,
                    actions: {},
                    width: 800,
                    draggable: true,
                    pinned: true,
                    position: {
                        top: 100
                    },
                    visible: false,
                    templateUrl: 'components/dashboard/programDetails/modals/addProgram.html',
                    controller: 'AddProgramCtrl as EditProgCtrl',
                    resolve: {
                        programData: function () {
                            return $scope.OrglistPrograms;
                        },
                        namInfoOrgData: function () {
                            return $scope.headerOrgdata;
                        }
                    }
                });

                windowInstance.result.then(function (result) {
                    if (result) {
                        if (result.programName != "") {
                            $scope.OrglistPrograms.programs.unshift(result);
                            //toastr.success('Program ' + result.programName.toUpperCase() + ' Added Successfully');
                        }
                    }
                });
            };

            $scope.result = "";
            $scope.openDeleteProgramWindow = function (programObject) {
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: false,
                    width: 600,
                    templateUrl: 'components/dashboard/programDetails/modals/deleteProgramDetails.html',
                    controller: 'deleteProgramDetailsModal as deleteProgModalCtrl',
                    resolve: {
                        programData: function () {
                            return programObject;
                        }
                    }
                });


                windowInstance.result.then(function (result) {
                    if (result) {
                        var indexofProgram = $scope.OrglistPrograms.programs.indexOf(programObject);
                        $scope.OrglistPrograms.programs.splice(indexofProgram, 1);
                    } else {

                    }
                });

            };
            // View Program Details Modal
            $scope.openCopyProgramWindow = function () {
                $scope.title = "Copy a Program";
                var windowInstance = $kWindow.open({
                    modal: true,
                    title: $scope.title,
                    //content: $scope.content,
                    width: 800,
                    templateUrl: 'components/dashboard/programDetails/modals/copyProgram.html',
                    controller: 'copyProgramDetailsModal as CopyProgCtrl',
                    resolve: {
                        programsData: function () {
                            return $scope.OrglistPrograms;
                        }
                    }
                });

                windowInstance.result.then(function (result) {
                    if (result) {
                        if (result.programName != "") {
                            $scope.OrglistPrograms.programs.unshift(result);
                            toastr.success('Program ' + result.programName.toUpperCase() + ' Copied Successfully');
                        }
                    }
                });
            };

            // open submit for review modal
            programCtrl.openReviewModal = function (program) {
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
                            return $scope.headerOrgdata.apiEnabled;
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

            // open submit for Activate modal
            programCtrl.openActivateModal = function (program) {
                //Code to open Activate Modal
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/dashboard/programDetails/modals/submitActivate.html',
                    controller: 'ActiveProgramModal as activateCtrl',
                    backdrop: 'static',
                    animation: false,
                    keyboard: false,
                    resolve: {
                        //Passing program information as dependency to ActivateModal Controller
                        programData: function () {
                            return program; //This is a program object on which ACTIVATE button is clicked
                        },
                        apiEnabled: function(){
    						return $scope.headerOrgdata.apiEnabled;
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

            programCtrl.closeProgram = function (program) {
                if (local_environment) {
                    program.status = 'closed';
                    toastr.success('Program Archived', 'Success', {
                        allowHtml: true
                    });
                } else {
                    program.status = 'closed';
                    serverOrgProgram.all("/programStatus/" + program.id).post('closed').then(function (data) {
                        toastr.success('Program Archived', 'Success', {
                            allowHtml: true
                        });
                    });
                }
            };
            programCtrl.rowMouseEnter=function(isEnter){
                    if(isEnter){
                        
                    }else{
                        
                    }
            }
        } // end functions



    ]); // end controller function
}());