/**
 * Created by jmccommas on 02/29/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('headerIconsAppController', ["$scope", "Restangular", "$state", "$rootScope", "$stateParams",
        function ($scope, Restangular, $state, $rootScope, $stateParams) {
            var headerAppCtrl = this;

            var listenerEvent = $rootScope.$on('orgHeaderLoaded', function (event, data) {
                headerAppCtrl.headerData = data;
            });

            $scope.$on('$destroy', function () {
                listenerEvent(); // remove listener.
            });

        }]); // end headerController
}());