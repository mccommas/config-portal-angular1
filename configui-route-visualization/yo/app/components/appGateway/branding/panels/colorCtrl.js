/**
 * Created by jmccommas on 1/10/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appBrandingColorCtrl', ["$scope", "$rootScope", "Restangular", "$stateParams", "$route", "$uibModal", "toastr", "$q", "$location", "$state", "$timeout",
        function ($scope, $rootScope, Restangular, $stateParams, $route, $uibModal, toastr, $q, $location, $state, $timeout) {
            var colorCtrl = this;
            colorCtrl.gatewayId = $stateParams.gatewayId;
            var serverAppBranding;
            var parentCtrl = $scope.$parent.appBrandingCtrl;
            if (local_environment) {
                serverAppBranding = Restangular.all('app').all('data');
            } else {
                serverAppBranding = Restangular.all('configuration');
            }
        }]);
}());