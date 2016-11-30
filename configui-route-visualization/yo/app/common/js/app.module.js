/**
 * Created by jmccommas on 10/29/14.
 */
var configApp = angular.module("configApp", [
        'ui.router',
        'ngRoute',
        'ngAnimate',
        'toastr',
	    'ngIdle',
        'ngMessages',
        'ui.bootstrap',
        'restangular',
        'textAngular',
        'truncate',
        'perfect_scrollbar',
        'kendo.directives',
        'kendo.window',
        'angularSpinner',
        'angularFileUpload',
        'ui.select',
        'cacheBuster',
        'ngBootbox',
        'xeditable',
        'configAppConfiguration',
        'configAppControllers',
        'configAppDirective',
        'configAppService',
        'templates-main',
        'configAppFilter',
    'configAppAnimation'
        // Angular Controller,Service and directives
    ]);

var configAppConfiguration = angular.module('configAppConfiguration', []);
var configAppControllers = angular.module('configAppControllers', []);
var configAppService = angular.module('configAppService', []);
var configAppDirective = angular.module('configAppDirective', []);
var configAppFilter = angular.module('configAppFilter', []);
var configAppAnimation = angular.module('configAppAnimation', []);

// code here is to switch dev environment from local data to live data
var runningdemo = true;
var local_environment = true;
var max_upload_limit = 250000;
