/**
 * Created by jmccommas on 1/10/15. added svn and GIT repos on 07/06/2015
 */
(function () {
    "use strict";
    configAppControllers.controller('appBrandingBackgroundCtrl', ["$scope", "$rootScope", "Restangular", "$stateParams", "$route", "toastr", "$location", "$state", "$timeout", "FileUploader", "$q",
        function ($scope, $rootScope, Restangular, $stateParams, $route, toastr, $location, $state, $timeout, FileUploader, $q) {
            var backgroundCtrl = this;
            var brandErrorMessage = $('.brand-error-messages');
            var checkMessage = $('.check-message');
            var messages = {
                errorFormat: "Please choose correct file format. Accepted file types are: .jpg, .png, .jpeg",
                errorResolution: "Incorrect image resolution. Image size must be 1000px by 1000px",
                errorSize: "File size exceeds 250KB.",
                success: "Header Successfully Updated",
                successLogo: "Logo Successfully Uploaded",
                reset: "Header was reset and canceled",
                resetLogo: 'Image logo was reset',
                image: 'Image Uploaded'
            };

            var serverAppBackgroundChoose;

            if (local_environment) {
                serverAppBackgroundChoose = Restangular.all('app').all('data');
            } else {
                serverAppBackgroundChoose = Restangular.all('configuration');
            }
            backgroundCtrl.showPanel = "";

            backgroundCtrl.uploader = new FileUploader();
            var selectedFile;

            var parentCtrl = $scope.$parent.appBrandingCtrl;
            var uploader = backgroundCtrl.uploader = parentCtrl.backgroundUploader = new FileUploader({
                url: _NODE_IMAGE_URL_APP_BRANDING_BACKGROUND,
                queueLimit: 1
            });
            uploader.onBeforeUploadItem = function () {

            };

            backgroundCtrl.saveChooseExisting = function () {
                if (!local_environment) {
                    if (parentCtrl.appBrandingData.GATEWAY_BACKGROUND.configValue) {
                        serverAppBackgroundChoose.all('uploadExistingGatewayImage/GATEWAY_BACKGROUND').post(parentCtrl.appBrandingData.GATEWAY_BACKGROUND.configValue).then(function (data) {
                            toastr.success('Background Image Saved', '<b>Success</b>', {
                                allowHtml: true
                            });
                        });
                    }
                }
            };

            backgroundCtrl.backGroundChoosedPreImage = function (item) {
                uploader.clearQueue();
                parentCtrl.backgroundImageURL = item.imagePath;
                parentCtrl.appBrandingData.GATEWAY_BACKGROUND.configValue = item.imagePath;
            };
            $scope.backgroundFileChange = function (fileObject) {
                uploader.clearQueue();
                selectedFile = fileObject.files[0];
            };
            backgroundCtrl.OpenFileSelector = function () {
                $("#anguUploadBackGround").trigger('click');
            };
            uploader.filters.push({
                name: 'imageFilter',
                fn: function (item, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    var isValid = '|jpg|png|jpeg|'.indexOf(type) !== -1;
                    if (!isValid) {
                        uploader.clearQueue();
                        selectedFile = null;
                        toastr.error('Image Format Error');
                        if ($(brandErrorMessage).html() == messages.errorFormat) {
                            if ($(brandErrorMessage).html('')) {
                                $(brandErrorMessage).html(messages.errorFormat);
                            }
                        } else {
                            $(brandErrorMessage).html(messages.errorFormat);
                        }
                    }
                    if (isValid) {
                        $(brandErrorMessage).html('')
                    }
                    return isValid;
                }
            });

            uploader.filters.push({
                name: 'imageSize',
                fn: function (item, options) {
                    var is_valid = (item.size <= 250000);
                    if (!is_valid) {
                        uploader.clearQueue();
                        selectedFile = null;
                        toastr.error('Image Format Error');
                        if ($(brandErrorMessage).html() == messages.errorSize) {
                            $(brandErrorMessage).html('');
                        } else {
                            $(brandErrorMessage).html(messages.errorSize);
                        }
                    }
                    if (is_valid) {
                        $(brandErrorMessage).html('')
                    }
                    return is_valid;
                }
            });

            uploader.filters.push({
                name: 'imageResolution',
                fn: function (item, options) {
                    var deferred = $q.defer();
                    var file, img, is_valid, reqHeight = 1000,
                        reqWidth = 1000;
                    var _URL = window.URL || window.webkitURL;
                    if ((file = selectedFile)) {
                        img = new Image();
                        img.onload = function () {
                            if (this.width == reqWidth && this.height == reqHeight) {
                                deferred.resolve(true);
                            } else {
                                uploader.clearQueue();
                                selectedFile = null;
                                toastr.error('Image Format Error');
                                if ($(brandErrorMessage).html() == messages.errorResolution) {
                                    $(brandErrorMessage).html('');

                                } else {
                                    $(brandErrorMessage).html(messages.errorResolution);
                                }
                                deferred.resolve(false);
                            }
                            if (is_valid) {
                                $(brandErrorMessage).html('')
                            }
                        };
                        img.onerror = function () {
                            toastr.error(messages.errorResolution);
                            return false;
                        };
                        img.src = _URL.createObjectURL(file);
                    }
                    return deferred.promise;
                }
            });

            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                //toastr.success("BackGround saved successfully.", 'Success', {
                //    allowHtml: true
                //});
                $timeout(function () {
                    backgroundCtrl.uploadSuccessFull = true;
                }, 1000);
                //alert(response);
                parentCtrl.uploadedBackGround = response;
                parentCtrl.backgroundImageURL = response;
                //  parentCtrl.saveGatewayBrandingServer('backgroundImage');
                if ($(brandErrorMessage).html() == messages.successLogo) {
                    $(brandErrorMessage).html('');

                } else {
                    $(brandErrorMessage).html(messages.successLogo);
                }
            };

            backgroundCtrl.resetChooseImage = function () {
                parentCtrl.getPageData();
                appBrandingCtrl.backgroundImageURL = "";
                toastr.warning("BackGround Image reset.", 'Success', {
                    allowHtml: true
                });

            };


            backgroundCtrl.reset = function () {
                uploader.clearQueue();
                selectedFile = this.files[0];
                toastr.error(messages.resetLogo);
                $(brandErrorMessage).html('');
            };

            backgroundCtrl.switchPanel = function (panel) {
                backgroundCtrl.showPanel = panel;
                parentCtrl.chooseImage = "";
            };

            // Radio buttons add/remove class
            backgroundCtrl.addClass1 = function () {
                $('label.choose-existing').toggleClass('radio-disabled', this.checked);
                $('label.choose-image').removeClass('radio-disabled');
            };
            backgroundCtrl.addClass2 = function () {
                $('label.choose-existing').removeClass('radio-disabled');
                $('label.choose-image').addClass('radio-disabled', this.checked);
            };


        }]);
}());