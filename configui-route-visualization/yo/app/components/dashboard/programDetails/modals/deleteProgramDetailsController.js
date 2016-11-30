(function () {
    'use strict';
    configAppControllers.controller('deleteProgramDetailsModal', ['$scope','toastr', '$windowInstance', 'Restangular', 'programData',
        function ($scope,toastr, $windowInstance, Restangular, programData) {
            var deleteProgModalCtrl = this;
            var serverOrgProgram;
            if (local_environment) {
                serverOrgProgram = Restangular.all('app').all('data');
            } else {
                serverOrgProgram = Restangular.all('configuration');
            }
            deleteProgModalCtrl.programItem = programData;

            deleteProgModalCtrl.deleteProgram_server = function () {
                var url = "deleteProgram/" + deleteProgModalCtrl.programItem.id;
                serverOrgProgram.one('deleteProgram', deleteProgModalCtrl.programItem.id).remove();
                $windowInstance.close(true);
                //toastr.success('Program deleted Successfully');
            };

            deleteProgModalCtrl.confirm = function () {
                if (!local_environment) {
                    deleteProgModalCtrl.deleteProgram_server();
                } else {
                    $windowInstance.close(true);
                }
                toastr.success('Program deleted Successfully');
            };
            deleteProgModalCtrl.cancel = function () {
                $windowInstance.close(false);
            };
        }]);
}());