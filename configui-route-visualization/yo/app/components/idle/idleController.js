/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('idleCtrl', ["$scope", "Restangular", "$uibModalInstance",
        function ($scope, Restangular, $uibModalInstance) {
            var idleCtrl = this;

            function padLeft(nr, n, str) {
                return new Array(n - String(nr).length + 1).join(str || '0') + nr;
            }
            $scope.$on('IdleWarn', function (e, countdown) {
                var remaining = {
                    totalSeconds: countdown
                };
                remaining.minutes = Math.floor(countdown / 60);
                remaining.seconds = padLeft(countdown - remaining.minutes * 60, 2);
                idleCtrl.countdownTime = remaining;
            });
            idleCtrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
         }]); // end headerController
}());