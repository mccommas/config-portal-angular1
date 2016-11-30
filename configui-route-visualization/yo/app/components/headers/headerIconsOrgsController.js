/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('headerIconsOrgsController', ["$scope", "Restangular", "$state", "$rootScope", "$stateParams", "Configuration",
        function ($scope, Restangular, $state, $rootScope, $stateParams, Configuration) {
            var headerOrgCtrl = this;
            headerOrgCtrl.admissionUser = Configuration.admissionUser;
            headerOrgCtrl.associationUser = Configuration.associationUser;
            headerOrgCtrl.headerData = {
                orgLevelQuestions: true // bydefault it is true to make sure we dont see flick
            };
            var listenerEvent = $rootScope.$on('orgHeaderLoaded', function (event, data) {
                headerOrgCtrl.headerData = data;
                headerOrgCtrl.getQuestionEditorState(data);
            });
            headerOrgCtrl.getQuestionEditorState = function (data) {
                headerOrgCtrl.isQuestionEditable = data.orgLevelQuestions;
                //If orgLevelQuestions is true and userType is Admission User
                if (data.orgLevelQuestions && data.userType.toLowerCase() == Configuration.userType.admissionUser) {
                    //If isAnyProgramActive is true then OrgQuestion is hidden
                    if (data.isAnyProgramActive) {
                        headerOrgCtrl.isQuestionEditable = false;
                    } else {
                        headerOrgCtrl.isQuestionEditable = true;
                    }
                } else if (data.orgLevelQuestions && data.userType.toLowerCase() == Configuration.userType.associationUser) {
                    //If userType is assocication user and orgLevelQuestion then we  show Question Icon all time
                    headerOrgCtrl.isQuestionEditable = true;
                }
            };
            $scope.$on('$destroy', function () {
                listenerEvent(); // remove listener.
            });
            var serverOrgHeader;
            if (local_environment) {
                serverOrgHeader = Restangular.all('app').all('data');
            } else {
                serverOrgHeader = Restangular.all('configuration');
            }
            headerOrgCtrl.get_header_data = function (url) {
                serverOrgHeader.get(url).then(function (data) {
                    headerOrgCtrl.headerData = data;
                    headerOrgCtrl.getQuestionEditorState(data);
                });
            };
            headerOrgCtrl.startHeaderLoading = function () {
                if (local_environment) {
                    headerOrgCtrl.get_header_data('nameInfoOrg.json');
                } else {
                    headerOrgCtrl.get_header_data('nameInfoForOrg');
                }
            };
            if ($state.$current.name.toString() == "organizationEditor") {
                headerOrgCtrl.startHeaderLoading();
            }
            switch ($state.$current.path.toString()) {
            case "organizationEditor":
                headerOrgCtrl.showOrgEditor = true;
                headerOrgCtrl.showOrgHome = false;
                break;
            default:
                headerOrgCtrl.showOrgHome = true;
                headerOrgCtrl.showOrgEditor = false;
                break;
            }
        }]); // end headerController 
}());