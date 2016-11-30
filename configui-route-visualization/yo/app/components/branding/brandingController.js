/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('BrandingCtrl', ["$scope", "$rootScope", "Restangular", "$stateParams", "$route", "$uibModal", "toastr", "FileUploader", "$q", "$location", "$state", "$timeout",
        function ($scope, $rootScope, Restangular, $stateParams, $route, $uibModal, toastr, FileUploader, $q, $location, $state, $timeout) {
            var brandCtrl = this;
            var brandErrorMessage = $('.brand-error-messages');
            var checkMessage = $('.check-message');
            var messages = {
                errorFormat: "Please choose correct file format. Accepted file types are: .jpg, .png, .jpeg",
                errorResolution: "Wrong image resolution. Image size must be 270px by 900px",
                errorSize: "File size exceeds 250KB.",
                success: "Header Successfully Updated",
                reset: "Header reset Successful",
                cancel: "Action has been canceled"
            };

            var serverBranding;
            var orginalbrandingdata;

            function hexToRgb(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }


            if (local_environment) {
                serverBranding = Restangular.all('app').all('data');
            } else {
                serverBranding = Restangular.all('configuration');
            }

            // Toggle the edit header button
            $scope.isCollapsed = true;
            $scope.$watch('isCollapsed', function () {
                $scope.toggleText = $scope.isCollapsed ? 'edit header' : 'cancel edit';

            });
            // end toggle btn


            brandCtrl.closeDropDown = function () {
                $timeout(function () {
                    //$state.go('programBranding', null, {
                    //    reload: true
                    //});
                    $scope.isCollapsed = true;
                }, 2000);
                $(brandErrorMessage).html('');
                $scope.isCollapsed = false;
            };

            brandCtrl.openDropDown = function () {
                $timeout(function () {
                    $scope.isCollapsed = false;
                }, 2000);
            };

            brandCtrl.get_branding_data = function (url) {
                serverBranding.get(url).then(function (data) {
                    brandCtrl.brandingData = angular.copy(data);
                    orginalbrandingdata = angular.copy(data);
                    brandCtrl.bind_branding_data(data);
                });
            };

            brandCtrl.branding = {
                instructions: {},
                instructionsTitle: {},
                backgroundImage: {},
                headLineText: {},
                backgroundColor: {}
            };

            brandCtrl.bind_branding_data = function (data) {
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].configName.toLowerCase()) {
                    case "instructions":
                        brandCtrl.branding.instructions = data[i];
                        break;
                    case "instructionstitle":
                        brandCtrl.branding.instructionsTitle = data[i];
                        break;
                    case "headlinetext":
                        brandCtrl.branding.headLineText = data[i];
                        brandCtrl.headlineColor = brandCtrl.branding.headLineText.configValue;
                        $timeout(function () {
                            $(".slider").slider("value", hexToRgb(brandCtrl.headlineColor).g);
                        });
                        break;
                    case "backgroundimage":
                        brandCtrl.branding.backgroundImage = data[i];
                        brandCtrl.headerImage = brandCtrl.branding.backgroundImage.configValue;
                        break;
                    case "primaryheadlinetext":
                        brandCtrl.branding.primaryheadlinetext = data[i];
                        brandCtrl.primaryheadlinetext = brandCtrl.branding.primaryheadlinetext.configValue;
                        break;
                    }
                }
            };

            brandCtrl.uploader = new FileUploader();

            var ListenerEvent = $rootScope.$on('headerdataloaded', function (event, data) {
                brandCtrl.headerdata = data;
            });

            $scope.$on('$destroy',function(){
                ListenerEvent();
            });

            var selectedFile;

            var uploader = brandCtrl.uploader = new FileUploader({
                url: _NODE_IMAGE_URL,
                queueLimit: 1
            });

            brandCtrl.getRequestBody = function (filenameSaved) {
                var data = angular.copy(brandCtrl.brandingData);

                return data;
            };

            var guid = (function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return function () {
                    //return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    //    s4() + '-' + s4() + s4() + s4();
                    return s4() + '-' + s4();
                };
            })();

            uploader.onBeforeUploadItem = function (item) {
                item.formData.push({
                    name: guid() + item.file.name.substring(item.file.name.indexOf('.'), item.file.name.length)
                });
                item.name = guid() + item.file.name.substring(item.file.name.indexOf('.'), item.file.name.length);
                console.log(item);
            };

            // FILTERS

            uploader.filters.push({
                name: 'imageFilter',
                fn: function (item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    var isValid = '|jpg|png|jpeg|'.indexOf(type) !== -1;
                    if (!isValid) {
                        uploader.clearQueue();
                        selectedFile = null;
                        toastr.error('Image Format Error!!');
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
                fn: function (item /*{File|FileLikeObject}*/ , options) {
                    var is_valid = (item.size <= 250000);
                    if (!is_valid) {
                        uploader.clearQueue();
                        selectedFile = null;
                        toastr.error('Image Format Error!!');

                        if ($(brandErrorMessage).html() == messages.errorSize) {
                            $(brandErrorMessage).html('');
                        } else {
                            $(brandErrorMessage).html(messages.errorSize);
                        }
                        return false;
                    }
                    if (is_valid) {
                        $(brandErrorMessage).html('')
                    }
                    return true;
                }
            });

            uploader.filters.push({
                name: 'imageResolution',
                fn: function (item /*{File|FileLikeObject}*/ , options) {
                    var deferred = $q.defer();
                    var file, img, is_valid, reqHeight = 270,
                        reqWidth = 900;
                    var _URL = window.URL || window.webkitURL;
                    if ((file = selectedFile)) {
                        img = new Image();
                        img.onload = function () {
                            if (this.width == reqWidth && this.height == reqHeight) {
                                deferred.resolve(true);
                            } else {
                                uploader.clearQueue();
                                selectedFile = null;
                                toastr.error('Image Format Error!!');

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
                var uploadedImagePath = response.substring(response.indexOf("images"), response.length);
                brandCtrl.postBrandingDataServer(response);
                var html = '<i class="fa fa-check"></i>';

                $timeout(function () {
                    $(checkMessage).html(html);
                }, 1000);
                //brandCtrl.closeDropDown();

            };

            $("#btnBrowse").click(function () {
                $("#anguUpload").trigger('click');
            });

            $("#anguUpload").change(function (e) {
                uploader.clearQueue();
                selectedFile = this.files[0];
                //  $.each(e.target.files, function(index, file){
                // alert(file);
                //   });
            });

            brandCtrl.getRequestBody = function (filename) {
                var data = angular.copy(brandCtrl.brandingData);
                var watcher = {
                    headlinetext: false,
                    //    backgroundimage: false,
                    primaryheadlinetext: false
                };
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].configName.toLowerCase()) {
                    case "headlinetext":
                        watcher.headlinetext = true;
                        data[i].configValue = $('#brandingheading').attr('picker');
                        break;
                        //                    case "backgroundimage":
                        //                        watcher.backgroundimage = true;
                        //                        if (filename) {
                        //                            data[i].configValue = filename;
                        //                        }
                        //                        break;
                    case "primaryheadlinetext":
                        watcher.primaryheadlinetext = true;
                        data[i].configValue = brandCtrl.primaryheadlinetext;
                        break;
                    }
                }
//                if (!watcher.backgroundimage) {
       //                    if (filename) {
       //                        data.push({
       //                            "configName": "backgroundimage",
       //                            "configValue": filename
       //                        });
       //                    }
       //                }
                if (!watcher.headlinetext) {
                    data.push({
                        "configName": "headlineText",
                        "configValue": $('#brandingheading').attr('picker')
                    });
                }
                if (!watcher.primaryheadlinetext) {
                    data.push({
                        "configName": "primaryHeadlineText",
                        "configValue": brandCtrl.primaryheadlinetext
                    });
                }
                return data;
            };

            brandCtrl.postBrandingDataServer = function (filename) {
                //  alert(filename);
                var temp_container = [
                    {
                        "configName": "headlineText",
                        "configValue": $('#brandingheading').attr('picker')
                    },
                    {
                        "configName": "primaryHeadlineText",
                        "configValue": brandCtrl.primaryheadlinetext
                    }
                ];

                var data;
                if (brandCtrl.brandingData == null || brandCtrl.brandingData == undefined) {
                    data = temp_container;
                } else {
                    data = brandCtrl.getRequestBody(filename);
                }
                if (!local_environment) {
                    serverBranding.all('programBrandingConfig').post(data).then(function (data) {
                        brandCtrl.brandingData = angular.copy(data);
                        brandCtrl.bind_branding_data(data);
                    });
                }
                brandCtrl.closeDropDown();
                toastr.success(messages.success, 'Success!!', {
                    allowHtml: true
                });
            };

            // open home text modal
            brandCtrl.openHomeTxtModal = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/branding/modals/homeTxt.html',
                    controller: 'homeTxtModal as homeModalCtrl',
                    backdrop: 'static',
                    windowClass: 'homeTxt-modal-window',
                    size: size,
                    keyboard: false,
                    resolve: {
                        brandingData: function () {
                            return angular.copy(brandCtrl.branding);
                        },
                        orginalBrandData: function () {
                            return brandCtrl.brandingData;
                        }
                    }
                });

                modalInstance.result.then(function (data) {
                    brandCtrl.brandingData = angular.copy(data);
                    brandCtrl.bind_branding_data(data);
                });
            };

            // open branding pdf instructions
            brandCtrl.openPdf = function (size) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'components/branding/modals/brandingpdf.html',
                    controller: 'brandInstructionsModal as brandInstructions',
                    backdrop: 'static',
                    size: size,
                    keyboard: false

                });

            };

            // gets the current header img name and appends it to DOM
            //brandCtrl.currentImgName = function () {
            //    var currentFileName = $('#headerImage').attr("src");
            //    var parts = currentFileName.split('/');
            //    currentFileName = parts[parts.length - 1];
            //    $('span.current-image').html(currentFileName);
            //};
            //$timeout(function () {
            //    brandCtrl.currentImgName();
            //}, 2000);


            if (local_environment) {
                brandCtrl.get_branding_data('branding.json');
            } else {
                brandCtrl.get_branding_data('programBrandingConfig');
            }

            brandCtrl.resetBranding = function () {
                var resetdata = angular.copy(orginalbrandingdata);
                brandCtrl.brandingData = angular.copy(resetdata);
                brandCtrl.bind_branding_data(resetdata);
                $timeout(function () {
                    toastr.info(messages.reset, 'Success!!', {
                        allowHtml: true
                    });
                }, 500);
                selectedFile = null;
                $(brandErrorMessage).html('');
                uploader.clearQueue();
            };
            brandCtrl.cancel = function () {
                var resetdata = angular.copy(orginalbrandingdata);
                brandCtrl.brandingData = angular.copy(resetdata);
                brandCtrl.bind_branding_data(resetdata);
                $timeout(function () {
                    toastr.info(messages.cancel, 'Success!!', {
                        allowHtml: true
                    });
                }, 500);
                selectedFile = null;
                $(brandErrorMessage).html('');
                uploader.clearQueue();
                $timeout(function () {
                    $scope.isCollapsed = !$scope.isCollapsed;
                }, 1000);
                // brandCtrl.resetBranding();
            };

    }]);
}());