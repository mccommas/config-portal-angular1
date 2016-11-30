(function () {
    "use strict";
    configAppService.service('programsService', ["Restangular", "$q", "$state", "$timeout", "$stateParams",

        function (Restangular, $q, $state, $timeout, $stateParams) {
            this.getCASInfo = function (statename, gatewayid) {
                var deferred = $q.defer();
                var serverMV;
                if (local_environment) {
                    serverMV = Restangular.all('app').all('data');
                } else {
                    serverMV = Restangular.all('configuration');
                }


                var getCASInfoData = function (url) {
                    serverMV.get(url).then(function (data) {
                        deferred.resolve(data);
                    });
                };
                if (local_environment) {
                    getCASInfoData('casInfo.json');
                } else {
                    getCASInfoData('casInfo');
                }
                return deferred.promise;
            };
        }]);
}());