configAppControllers.controller('copyProgramDetailsModal', ["$scope", "$timeout", "$stateParams", "$windowInstance", "$location", "Restangular", "programsData",
    function ($scope, $timeout, $stateParams, $windowInstance, $location, Restangular, programsData) {
        var CopyProgCtrl = this;
        CopyProgCtrl.predicatemodal = 'programName';
        var serverCopyProgram;

        if (local_environment) {
            serverCopyProgram = Restangular.all('app').all('data');
        } else {
            serverCopyProgram = Restangular.all('configuration');
        }

        CopyProgCtrl.cancel = function () {
            $windowInstance.dismiss('cancel');
        };
        CopyProgCtrl.copiedProgram = null;

        CopyProgCtrl.OrgPrograms = programsData;

       	// fixed this checkbox as we now have copy all programs selected by default
	    // updated on 08/14/2015 bt jmccommas
	    CopyProgCtrl.copyAllSetting = {
		    isChecked: true
	    };

        CopyProgCtrl.copyProgramServer = function () {
            serverCopyProgram.all("copyProgram/" + CopyProgCtrl.copiedProgram.id + "/" + CopyProgCtrl.copyAllSetting.isChecked).post(null).then(function (data) {
                $windowInstance.close(data);
            });
        };

        CopyProgCtrl.checkedProgram = function (program) {
            CopyProgCtrl.copiedProgram = program;
        };

        CopyProgCtrl.copyProgram = function () {
            if (CopyProgCtrl.copiedProgram != null) {
                if (!local_environment) {
                    CopyProgCtrl.copyProgramServer();
                } else {
                    $windowInstance.close(angular.copy(CopyProgCtrl.copiedProgram));
                }
            }
        };
    }]);