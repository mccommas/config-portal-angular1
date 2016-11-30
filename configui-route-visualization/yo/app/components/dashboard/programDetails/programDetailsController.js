configAppControllers.controller('ProgramDetailCtrl', ["$scope","$timeout", "$rootScope", "toastr", "$stateParams", "$location", "Restangular","programAttributesService",
    function ($scope,$timeout, $rootScope, toastr, $stateParams, $location, Restangular,programAttributesService) {
        var ProgDetailCtrl = this;
        var serverProgram;
        ProgDetailCtrl.admissionUser = "admissions user";
        ProgDetailCtrl.associationUser = "association user";
        ProgDetailCtrl.casid;
        ProgDetailCtrl.ProgramId = $stateParams.programId;

        if (local_environment) {
            serverProgram = Restangular.all('app').all('data');
        } else {
            serverProgram = Restangular.all('configuration');
        }


        var formatDate = function (dateFieldValue) {
            var year = dateFieldValue.getFullYear() + "";
            var month = (dateFieldValue.getMonth() + 1) + "";
            var day = dateFieldValue.getDate() + "";
            var dateFormat = month + "/" + day + "/" + year;
            return dateFormat;
        };

        var ListenerEvent = $rootScope.$on('headerdataloaded', function (event, data) {
            ProgDetailCtrl.headerdata = data;
            ProgDetailCtrl.casid = ProgDetailCtrl.headerdata.casId;
            ProgDetailCtrl.formId = ProgDetailCtrl.headerdata.formId;

            programAttributesService.getProgramAttributes().then(function(response){
                ProgDetailCtrl.programAttributes = response;
                if (local_environment) {
                    ProgDetailCtrl.get_program_data('program.json');

                } else {
                    ProgDetailCtrl.get_program_data('getProgram/' + $stateParams.programId);
                }
                if(ProgDetailCtrl.programAttributes && !ProgDetailCtrl.programAttributes._defaul_config){
                    ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_Configurable.html";
                }else{
                    ProgDetailCtrl.getFormTemplate();
                }
            },function(response){
                toastr.error('Error: ', response)
            });
        });

        $scope.$on('$destroy',function(){
            ListenerEvent();
        });

        ProgDetailCtrl.get_program_data = function (url) {
            serverProgram.get(url).then(function (data) {
                ProgDetailCtrl.programDetails = data;
            });

        };

        ProgDetailCtrl.get_program_status = function(status){
            switch(status){
                case null: return "N/A";
                case "active" : return "approved";
                default : return status;
            }
        };

        ProgDetailCtrl.get_program_preview = function (url) {
            serverProgram.get(url).then(function (data) {
                ProgDetailCtrl.programPreview = data;
            });

        };

        ProgDetailCtrl.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        ProgDetailCtrl.getFormTemplate = function () {
            if(ProgDetailCtrl.programAttributes && !ProgDetailCtrl.programAttributes._defaul_config){
                    ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_Configurable.html";
            }else{
                switch (ProgDetailCtrl.casid) {
                    case 806:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_806.html";
                        break;
                    case 807:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_807.html";
                        break;
                    case 809:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_809.html";
                        break;
                    case 811:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_811.html";
                        break;
                    case 813:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_813.html";
                        break;
                    case 815:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_815.html";
                        break;
                    case 817:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_817.html";
                        break;
                    case 822:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_822.html";
                        break;
                    case 824:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_824.html";
                        break;
                    case 1832:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1832.html";
                        break;
                    case 1838:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1838.html";
                        break;
                    case 1839:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1839.html";
                        break;
                    case 1844:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1844.html";
                        break;
                    case 1853:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1853.html";
                        break;
                    case 1854:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1854.html";
                        break;
                    case 1855:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_1855.html";
                        break;
                    default:
                        ProgDetailCtrl.formTemplate = "components/dashboard/forms/programDetails_base.html";
                        break;
                }
            }
        }
    }]);