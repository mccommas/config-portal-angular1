(function () {
    "use strict";
    configAppControllers.controller('ApplicationController', ['$scope', '$location', '$route', 'httprequesthandle',
        function ($scope, $route, $location, httprequesthandle) {
            $scope.$route = $route;

            if (local_environment) {
                httprequesthandle.http_get('data/navigation-new.json').then(function (data) {
                    $scope.subMenuItemAPP = data;
                });
            } else {
                httprequesthandle.http_get('getallcasforprofile').then(function (data) {
                    $scope.subMenuItemAPP = data;
                });
            } // end switch
        }
    ]);
}());