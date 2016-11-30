/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('CASController', ['$scope', '$location', '$route',
        function ($scope, $route, $location) {
            var CAS = this;
            CAS.showToast = function (toastType) {
                switch (toastType) {
                case "info":
                    toastr.options = {
                        "closeButton": false,
                        "progressBar": true,
                        "positionClass": "toast-bottom-right",
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    toastr.info('This is information toast');
                    break;
                case "success":
                    toastr.success('This is Success toast');
                    break;
                case "warning":
                    toastr.warning('This is Warning toast');
                    break;
                case "danger":
                    toastr.error('This is Danger toast');
                    break;
                }
            };

        }
    ]);
}());