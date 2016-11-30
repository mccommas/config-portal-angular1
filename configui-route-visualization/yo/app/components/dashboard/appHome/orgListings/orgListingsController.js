/**
 * Created by jmccommas on 8/3/15.
 */
(function () {
    'use strict';
    configAppControllers.controller('OrgListingsController', ['$scope', '$location', '$route', 'Restangular', '$stateParams', '$uibModal', '$timeout', 'toastr', '$rootScope', '$q',
  function ($scope, $route, $location, Restangular, $stateParams, $uibModal, $timeout, toastr, $rootScope, $q) {
            var orgListCtrl = this;
            var orgListingsServer;
            if (local_environment) {
                orgListingsServer = Restangular.all('app').all('data');
            } else {
                orgListingsServer = Restangular.all('configuration');
            }

  } // end functions

 ]); // end controller function
}());