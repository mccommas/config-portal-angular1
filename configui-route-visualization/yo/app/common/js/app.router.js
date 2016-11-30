/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";

    configAppControllers.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'KeepaliveProvider', 'IdleProvider', '$provide',
        function ($stateProvider, $urlRouterProvider, $httpProvider, KeepaliveProvider, IdleProvider, $provide) {

            //Show warning modal if idle for 1680 second (28Min)
            IdleProvider.idle(1680);
            //Show Timeout modal after 120 second (2Min) of warning modal
            IdleProvider.timeout(120);
            // default route
            $urlRouterProvider.otherwise("/cas");
            $urlRouterProvider.when(
                '/programs/:orgId', '/programs/:orgId/programsList'
            );
            $urlRouterProvider.when(
                '/appHome/:appId', '/appHome/:appId/organizationsList'
            );
            $urlRouterProvider.when(
                '/programhome/:programId', '/programhome/:programId/home'
            );
            $urlRouterProvider.when(
                '/appGatewayEditor/:gatewayId', '/appGatewayEditor/:gatewayId/home'
            );
            $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
                // Setting default target as blank
                taOptions.defaultTagAttributes.a.target = '_blank';
                return taOptions;
            }]);
            // ui router states for dashboard views
            //$urlRouterProvider.when('/');
            $stateProvider
                .state('cas', {
                    url: "/cas",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerViewRight.html'
                        },
                        content: {
                            templateUrl: 'components/dashboard/intros/welcome.html'
                        }
                    }
                })
                .state('app', {
                    url: "/app/:casId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerLogoViewRight.html'
                        },
                        content: {
                            templateUrl: 'components/dashboard/intros/application.html'

                        }
                    }
                })
                .state('apphome', {
                    url: "/appHome/:appId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsApp.html',
                            controller: 'headerIconsAppController as headerAppCtrl'
                        },
                        content: {
                            templateUrl: 'components/dashboard/appHome/appHome.html',
                            controller: 'appHomeController as appHome'
                        }
                    }
                })
                // nested views for appHome listing tables
                .state('apphome.organizations', {
                    url: "/organizationsList",
                    views: {
                        appHomeContent: {
                            templateUrl: 'components/dashboard/appHome/orgListings/orgListings.html',
                            controller: 'OrgListingsController as orgListCtrl'
                        }
                    },
                    resolve: {}
                })
                .state('apphome.inReviewListings', {
                    url: "/inReviewListings",
                    views: {
                        appHomeContent: {
                            templateUrl: 'components/dashboard/appHome/inReviewListings/inReviewListings.html',
                            controller: 'InReviewListingsController as inReviewListCtrl'
                        }
                    },
                    resolve: {}
                })
                .state('org', {
                    url: "/org",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerLogoViewRight.html'
                        },
                        content: {
                            templateUrl: 'components/dashboard/intros/organizations.html'
                        }
                    }
                })
                .state('programslist', {
                    url: "/programs/:orgId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsOrgs.html',
                            controller: 'headerIconsOrgsController as headerOrgCtrl'
                        },
                        content: {
                            templateUrl: 'components/dashboard/programDetails/programs.html',
                            controller: 'ProgramsCtrl as programCtrl'
                        }
                    },
                    resolve: {
                        casInfoData: ['programsService', '$state',
                            function (programsService, $state) {
                                return programsService.getCASInfo();
                            }]
                    }
                })

                // nested views for program listing tables
                .state('programslist.programs', {
                    url: "/programsList",
                    views: {
                        content: {
                            templateUrl: 'components/dashboard/programDetails/programsListTable.html'
                        }
                    },
                    resolve: {}
                })

                .state('programslist.applications', {
                    url: "/applicationsList",
                    views: {
                        content: {
                            templateUrl: 'components/dashboard/applicationDetails/appListing/applicationsListTable.html'
                        }
                    }
                })
                .state('organizationEditor', {
                    url: "/organizationEditor/:orgId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsOrgs.html',
                            controller: 'headerIconsOrgsController as headerOrgCtrl'
                        },
                        content: {
                            templateUrl: 'components/programEditor/questions/questionsView.html',
                            controller: 'ProgramEditorQuestions as questionsCtrl'
                        }
                    }

                })
                .state('programDetails', {
                    url: "/programDetails/:programId?target",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsPrograms.html',
                            controller: 'headerController as headerCtrl'
                        },
                        content: {
                            templateUrl: 'components/dashboard/programDetails/programDetails.html',
                            controller: 'ProgramDetailCtrl as ProgDetailCtrl'
                        }
                    },
                    params: {
                        previousState: null
                    }
                })
                .state('programedit', {
                    url: "/programEdit/:programId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsPrograms.html',
                            controller: 'headerController as headerCtrl'
                        },
                        content: {
                            templateUrl: 'components/dashboard/programDetails/programDetailsEdit.html',
                            controller: 'EditProgramCtrl as EditProgCtrl'
                        }
                    },
                    params: {
                        previousState: null
                    }

                })

                .state('programBranding', {
                    url: "/programBranding/:programId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsPrograms.html',
                            controller: 'headerController as headerCtrl'
                        },
                        content: {
                            templateUrl: 'components/branding/brandingView.html'
                        }
                    },
                    params: {
                        previousState: null
                    }
                })
                .state('programHome', {
                    url: "/programhome/:programId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsPrograms.html',
                            controller: 'headerController as headerCtrl'
                        },
                        content: {
                            templateUrl: 'components/programEditor/mainView/mv.html',
                            controller: 'mvController as mvCtrl'

                        }
                    },
                    params: {
                        previousState: null
                    }
                })
                .state('programHome.home', {
                    url: "/home",
                    templateUrl: 'components/programEditor/home/homeView.html'
                })

                .state('programHome.evaluation', {
                    url: "/evaluation",
                    templateUrl: 'components/programEditor/evaluations/evaluationsView.html',
                    controller: 'ProgramEditorEvaluations as evaluationCtrl'
                })
                .state('programHome.question', {
                    url: "/question",
                    templateUrl: 'components/programEditor/questions/questionsView.html',
                    controller: 'ProgramEditorQuestions as questionsCtrl'
                })
                .state('programHome.hstranscripts', {
                    url: "/high-school-transcripts",
                    templateUrl: 'components/programEditor/highschooltranscripts/hsTranscriptsView.html',
                    controller: 'HighSchoolTranscripts as hstCtrl'
                })
                .state('programHome.collegetranscripts', {
                    url: "/college-transcripts",
                    templateUrl: 'components/programEditor/collegetranscripts/collegeTranscripts.html',
                    controller: 'CollegeTranscripts as clgtransCtrl'
                })
                .state('programHome.prerequisites', {
                    url: "/prerequisites",
                    templateUrl: 'components/programEditor/prerequisites/prerequisitesView.html',
                    controller: 'ProgramEditorPrerequisites as prereqCtrl'
                })
                .state('programHome.document', {
                    url: "/document",
                    templateUrl: 'components/programEditor/documents/documentsView.html',
                    controller: 'ProgramEditorDocument as documentCtrl'
                })

                // appGateway states
                .state('appGatewayBranding', {
                    url: "/appGatewayBranding/:gatewayId/:programId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsGateway.html',
                            controller: 'headerController as headerCtrl'
                        },
                        content: {
                            templateUrl: 'components/appGateway/branding/appBranding.html',
                            controller: 'appGatewayBrandingCtrl as appBrandingCtrl'
                        }
                    }
                })
                .state('appGatewayEditor', {
                    url: "/appGatewayEditor/:gatewayId/:programId",
                    views: {
                        rightheader: {
                            templateUrl: 'components/headers/headerIconsGateway.html',
                            controller: 'headerController as headerCtrl'
                        },
                        content: {
                            templateUrl: 'components/appGateway/appGatewayEditor/appMainView/appMv.html',
                            controller: 'appMvController as appMvCtrl'

                        }
                    },
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state',
                            function (appMvService, $state) {
                                return appMvService.getGatewaySectionData();
                            }]
                    }
                })

                // nested view for app gateway
                .state('appGatewayEditor.home', {
                    url: "/home",
                    templateUrl: 'components/appGateway/appGatewayEditor/home/homeView.html'
                })
                .state('appGatewayEditor.welcome', {
                    url: "/welcome",
                    templateUrl: 'components/appGateway/appGatewayEditor/welcome/welcome.html'
                })
                // Supplemental Application routes
                .state('appGatewayEditor.supplemental', {
                    url: "/supplemental",
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/suppHome.html',
                    controller: 'supplementalAppCtrl as suppAppCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("supplemental", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.suppQuest', {
                    url: "/supplemental-questions",
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/suppQuest.html',
                    controller: 'supplementalQuestCtrl as suppQuestCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("supplemental", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.suppPay', {
                    url: "/supplemental-payment",
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/suppPay.html',
                    controller: 'supplementalPayCtrl as suppPayCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("supplemental", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.suppInReview', {
                    url: "/supplemental-applications-submit-for-review",
                    templateUrl: 'components/appGateway/appGatewayEditor/supplemental/suppInReview.html',
                    controller: 'supplementalReviewCtrl as suppReviewCtrl'
                })
                // Interview Scheduler routes
                .state('appGatewayEditor.interview', {
                    url: "/interview",
                    templateUrl: 'components/appGateway/appGatewayEditor/interview/interview.html',
                    controller: 'InterviewController as interviewCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("interview", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.interview-scheduler', {
                    url: "/interview-scheduler",
                    templateUrl: 'components/appGateway/appGatewayEditor/interview/interview-scheduler.html',
                    controller: 'InterviewSchedulerController as interviewSchedCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("interview", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.interviewInReview', {
                    url: "/interview-submit-for-review",
                    templateUrl: 'components/appGateway/appGatewayEditor/interview/interviewInReview.html',
                    controller: 'interviewInReviewCtrl as interInReviewCtrl'
                })
                // Fee Collection routes
                .state('appGatewayEditor.fee', {
                    url: "/fee",
                    templateUrl: 'components/appGateway/appGatewayEditor/fee/fee.html',
                    controller: 'appFeeCtrl as feeCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("fee", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.fee-collection', {
                    url: "/fee-collection",
                    templateUrl: 'components/appGateway/appGatewayEditor/fee/fee-collection.html',
                    controller: 'feeCollectionCtrl as feeCollectCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("fee", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.feeInReview', {
                    url: "/feeInReview",
                    templateUrl: 'components/appGateway/appGatewayEditor/fee/feeInReview.html',
                    controller: 'feeInReviewCtrl as feeReviewCtrl'
                })
                // Documents Upload routes
                .state('appGatewayEditor.documents', {
                    url: "/documents",
                    templateUrl: 'components/appGateway/appGatewayEditor/documents/documents.html',
                    controller: 'appDocumentCtrl as appDocCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("documents", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.documents-upload', {
                    url: "/documents-upload",
                    templateUrl: 'components/appGateway/appGatewayEditor/documents/documents-upload.html',
                    controller: 'documentUploadCtrl as docUploadCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("documents", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.docInReview', {
                    url: "/documents-upload-submit-for-review",
                    templateUrl: 'components/appGateway/appGatewayEditor/documents/docInReview.html',
                    controller: 'documentInReviewCtrl as docInReviewCtrl'
                })

                // Accept Offer routes
                .state('appGatewayEditor.offer', {
                    url: "/offer",
                    templateUrl: 'components/appGateway/appGatewayEditor/offer/offer.html',
                    controller: 'appOfferCtrl as offerCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("offer", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.offer-extend', {
                    url: "/offer-extend",
                    templateUrl: 'components/appGateway/appGatewayEditor/offer/offer-extend.html',
                    controller: 'offerExtendedCtrl as offerExtendedCtrl',
                    resolve: {
                        getGatewaySecResolved: ['appMvService', '$state', '$stateParams',
                            function (appMvService, $state, $stateParams) {
                                return appMvService.getGatewaySectionData("offer", $stateParams.gatewayId);
                            }]
                    }
                })
                .state('appGatewayEditor.offerInReview', {
                    url: "/offer-extend-submit-for-review",
                    templateUrl: 'components/appGateway/appGatewayEditor/offer/offerInReview.html',
                    controller: 'offerInReviewCtrl as offerInReviewCtrl'
                })
        }]).run(['Idle', 'ng1UIRouter', function (Idle, ng1UIRouter) {
            var vis = window['ui-router-visualizer'];
            vis.visualizer(ng1UIRouter);
            //Comment line below to disable idle timer
            Idle.watch();
        }]);


} ());