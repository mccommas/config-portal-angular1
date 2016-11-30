configAppService.service('formnotsave', ['modalService', '$rootScope', '$state', '$q', 'toastr',
    function (modalService, $rootScope, $state, $q, toastr) {
        this.bindwatcher = function (form) {
            var listenerFunctionforFORM = function (callback, toState, toParam) {
                //Navigate to newUrl if the form isn't dirty
                //alert(form.$pristine);
                if (form.$pristine || form.$untouched) {
                    onRouteChangeOff();
                    callback(toState, toParam);
                } else {
                    var modalOptions = {
                        closeButtonText: 'Cancel',
                        actionButtonText: 'Ignore Changes',
                        headerText: 'Unsaved Changes',
                        bodyText: 'You have unsaved changes. Leave the page?'
                    };

                    modalService.showModal({}, modalOptions).then(function (result) {
                        if (result === 'ok') {
                            onRouteChangeOff(); //Stop listening for location changes
                            callback(toState, toParam);
                            toastr.warning('Continued with unsaved changes', 'Warning', {
                                allowHtml: true
                            });
                        }
                    });
                }
            };

            var onRouteChangeOff = function () {
                $rootScope.$broadcast("$destroy", null);
            };
            var cleanUpFunc = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                listenerFunctionforFORM($state.go, toState, toParams);
                event.preventDefault();
                return;
            });
            $rootScope.$on('$destroy', function () {
                cleanUpFunc();
            });
        };
        this.checkshowFormNotSaveForcefully = function (form) {
            var deferred = $q.defer();
            if (!form.$pristine) {
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Ignore Changes',
                    headerText: 'Unsaved Changes',
                    bodyText: "Please save your changes before submitting for review"
                };

                modalService.showModal({}, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        form.$setPristine();
                        deferred.resolve(true);
                        return deferred.promise;
                    } else {
                        deferred.resolve(false);
                        return deferred.promise;
                    }
                });
            } else {
                deferred.resolve(true);
            }
            return deferred.promise;
        };
    }]);