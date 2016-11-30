/**
 * Created by jmccommas on 12/5/14.
 */
(function () {
    'use strict';
    configAppControllers.controller('mvController', ["$scope", "$timeout", "toastr", "$stateParams", "$state", "$location", "Restangular", "$rootScope",
        function ($scope, $timeout, toastr, $stateParams, $state, $location, Restangular, $rootScope) {

            var mvCtrl = this;
            $scope.homeContent = true;
            $scope.state = $state;
            var serverMV;

            var ListenerEvent = $rootScope.$on('headerdataloaded', function (event, data) {
                mvCtrl.headerdata = data;
                mvCtrl.casid = mvCtrl.headerdata.casId;
                // console.log(JSON.stringify(data));
            });
            if (local_environment) {
                serverMV = Restangular.all('app').all('data');
            } else {
                serverMV = Restangular.all('configuration');
            }
            /*var ListenerEvent = $rootScope.$on('headerdataloaded', function (event, data) {
                mvCtrl.headerdata = data;
            });*/

            $scope.$on('$destroy',function(){
                ListenerEvent();
            });

            mvCtrl.prgramsectiondata = [];
            mvCtrl.menu_item = {
                chkHome: true,
                chkEvaluation: false,
                chkQuestion: false,
                chkHST: false,
                chkCTCW: false,
                chkPrerequisites: false,
                chkDocument: false

            };

            mvCtrl.menu_item_visible = {
                Home: true,
                Evaluation: false,
                Question: false,
                HST: false,
                CTCW: false,
                Prerequisites: false,
                Document: false
            };


            mvCtrl.bind_show_hide_menu = function (data) {
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].sectionName) {
                    case "Documents":
                        mvCtrl.menu_item_visible.Document = true;
                        if (data[i].isChildPresent) {
                            mvCtrl.menu_item.chkDocument = true;
                        } else {
                            mvCtrl.menu_item.chkDocument = false;
                        }
                        break;
                    case "Prerequisites":
                        mvCtrl.menu_item_visible.Prerequisites = true;
                        if (data[i].isChildPresent) {
                            mvCtrl.menu_item.chkPrerequisites = true;
                        } else {
                            mvCtrl.menu_item.chkPrerequisites = false;
                        }
                        break;
                    case "Evaluations":
                        mvCtrl.menu_item_visible.Evaluation = true;
                        if (data[i].isChildPresent) {
                            mvCtrl.menu_item.chkEvaluation = true;
                        } else {
                            mvCtrl.menu_item.chkEvaluation = false;
                        }
                        break;
                    case "Questions":
                        mvCtrl.menu_item_visible.Question = true;
                        if (data[i].isChildPresent) {
                            mvCtrl.menu_item.chkQuestion = true;
                        } else {
                            mvCtrl.menu_item.chkQuestion = false;
                        }
                        break;
                    case "High School Transcripts":
                        mvCtrl.menu_item_visible.HST = true;
                        if (data[i].isChildPresent) {
                            mvCtrl.menu_item.chkHST = true;
                        } else {
                            mvCtrl.menu_item.chkHST = false;
                        }
                        break;
                    case "College Transcripts & Coursework":
                        mvCtrl.menu_item_visible.CTCW = true;
                        if (data[i].isChildPresent) {
                            mvCtrl.menu_item.chkCTCW = true;
                        } else {
                            mvCtrl.menu_item.chkCTCW = false;
                        }
                        break;
                    }
                }
            };
            mvCtrl.getMVData = function (url) {
                serverMV.get(url).then(function (data) {
                    mvCtrl.bind_show_hide_menu(data);
                    mvCtrl.prgramsectiondata = data;
                });
            };


            mvCtrl.post_server_changed_checkbox = function (key, value) {
                var sectionid = null;
                for (var i = 0; i < mvCtrl.prgramsectiondata.length; i++) {
                    if (mvCtrl.prgramsectiondata[i].sectionName.toLowerCase() == key.toLowerCase()) {
                        sectionid = mvCtrl.prgramsectiondata[i].id;
                        break;
                    }
                }
                if (sectionid != null) {
                    if (!local_environment) {
                        serverMV.all("sectionRequired/" + value).post(sectionid).then(function (data) {

                        });
                    }
                }
            };


            mvCtrl.program_editor_checkbox_change = function (chkid) {
                switch (chkid) {
                case "chkHome":
                    mvCtrl.post_server_changed_checkbox("home", mvCtrl.menu_item[chkid]);
                    break;
                case "chkEvaluation":
                    mvCtrl.post_server_changed_checkbox("Evaluations", mvCtrl.menu_item[chkid]);
                    break;

                case "chkQuestion":
                    mvCtrl.post_server_changed_checkbox("Questions", mvCtrl.menu_item[chkid]);
                    break;
                case "chkHST":
                    mvCtrl.post_server_changed_checkbox("High School Transcripts", mvCtrl.menu_item[chkid]);
                    break;
                case "chkCTCW":
                    mvCtrl.post_server_changed_checkbox("College Transcripts & Coursework", mvCtrl.menu_item[chkid]);
                    break;
                case "chkPrerequisites":
                    mvCtrl.post_server_changed_checkbox("Prerequisites", mvCtrl.menu_item[chkid]);
                    break;
                case "chkDocument":
                    mvCtrl.post_server_changed_checkbox("Documents", mvCtrl.menu_item[chkid]);
                    break;
                case "chkHome":
                    mvCtrl.post_server_changed_checkbox("home", mvCtrl.menu_item[chkid]);
                    break;
                case "chkEvaluation":
                    mvCtrl.post_server_changed_checkbox("Evaluations", mvCtrl.menu_item[chkid]);
                    break;
                case "chkQuestion":
                    mvCtrl.post_server_changed_checkbox("Questions", mvCtrl.menu_item[chkid]);
                    break;
                case "chkHST":
                    mvCtrl.post_server_changed_checkbox("High School Transcripts", mvCtrl.menu_item[chkid]);
                    break;
                case "chkCTCW":
                    mvCtrl.post_server_changed_checkbox("College Transcripts & Coursework", mvCtrl.menu_item[chkid]);
                    break;
                case "chkPrerequisites":
                    mvCtrl.post_server_changed_checkbox("Prerequisites", mvCtrl.menu_item[chkid]);
                    break;
                case "chkDocument":
                    mvCtrl.post_server_changed_checkbox("Documents", mvCtrl.menu_item[chkid]);
                    break;

                }
            };



            if (local_environment) {
                mvCtrl.getMVData('program_sections.json');
            } else {
                mvCtrl.getMVData('getProgramSections');
            }

            // equal heights columns
            $timeout(function () {
                var highestCol = Math.max($('.sidebar').height(), $('.main-page').height());
                $('.mv-sidebar').height(highestCol);
            }, 500);

        }]);
}());