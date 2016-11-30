/**
 * Created by jmccommas on 1/10/15.
 */
(function () {
    "use strict";
    configAppControllers.controller('appBrandingLogoCtrl', ["$scope", "$rootScope", "Restangular", "$stateParams", "$route", "$uibModal", "toastr", "$q", "$location", "$state", "$timeout", "FileUploader",
        function ($scope, $rootScope, Restangular, $stateParams, $route, $uibModal, toastr, $q, $location, $state, $timeout, FileUploader) {
            var logoCtrl = this;
            var brandErrorMessage = $('.brand-error-messages');
            var checkMessage = $('.check-message');
            var messages = {
                errorFormat: "Please choose correct file format. Accepted file types are: .jpg, .png, .jpeg",
                errorResolution: "Incorrect image resolution. Image size must be 70px by 360px",
                errorSize: "File size exceeds 250KB.",
                success: "Header Successfully Updated!",
                successLogo: "Logo Successfully Uploaded",
                reset: "Header was reset and canceled",
                resetLogo: 'Image logo was reset',
                image: 'Image Uploaded'
            };

            $(brandErrorMessage).html('');
            logoCtrl.uploader = new FileUploader();
            var selectedFile;
            var parentCtrl = $scope.$parent.appBrandingCtrl;

            var uploader = logoCtrl.uploader = parentCtrl.uploader = new FileUploader({
                url: _NODE_IMAGE_URL_APP_BRANDING_LOGO,
                queueLimit: 1
            });
            uploader.onBeforeUploadItem = function (item) {

            };

            // FILTERS

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
                    var file, img, is_valid, reqHeight = 70,
                        reqWidth = 360;
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
                // console.log(fileItem);
                //  console.log(response);
                toastr.success("Logo saved successfully.", 'Success', {
                    allowHtml: true
                });
                $timeout(function () {
                    logoCtrl.uploadSuccessFull = true;
                }, 1000);
                parentCtrl.uploadeNewImage = response;
                //alert(response);
                if ($(brandErrorMessage).html() == messages.successLogo) {
                    $(brandErrorMessage).html('');

                } else {
                    $(brandErrorMessage).html(messages.successLogo);
                }
            };

            $("#btnBrowse").click(function () {
                $("#anguUpload").trigger('click');
            });

            $("#anguUpload").change(function (e) {
                uploader.clearQueue();
                selectedFile = this.files[0];
            });
            logoCtrl.reset = function () {
                uploader.clearQueue();
                selectedFile = this.files[0];
                toastr.error(messages.resetLogo);
                $(brandErrorMessage).html('');
            };
        }]);
}());