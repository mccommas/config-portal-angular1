configAppService.service('appMvService', ["Restangular", "$q", "$state", "$timeout",

    function (Restangular, $q, $state, $timeout) {
        this.getGatewaySectionData = function (statename, gatewayid) {
            var deferred = $q.defer();
            var serverMV;
            var menu_item = {};
            if (local_environment) {
                serverMV = Restangular.all('app').all('data');
            } else {
                serverMV = Restangular.all('configuration');
            }
            var bind_show_hide_menu = function (data) {
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].sectionName) {
                    case "extend_offer":
                        menu_item.Offer = data[i];
                        break;
                    case "interview_scheduler":
                        menu_item.Interview = data[i];
                        break;
                    case "Welcome":
                        menu_item.Welcome = data[i];
                        break;
                    case "supplemental_application":
                        menu_item.Supplemental = data[i];
                        break;
                    case "fee_collection":
                        menu_item.Fee = data[i];
                        break;
                    case "document_upload":
                        menu_item.Documents = data[i];
                        break;
                    }
                }

                var resolvedObj = {
                    data: data,
                    menu_item: menu_item
                };

                var spp_states = [
                    "supplemental",
                    "suppQuest",
                    "suppPay",
                    "documents",
                    "documents-upload",
                    "interview",
                    "interview-scheduler",
                    "offer",
                    "offer-extend"
                ];
                var doc_states = [
                    "documents",
                    "documents-upload"
                ];
                var interview_states = [
                    "interview",
                    "interview-scheduler"
                ];
                var fee_states = [
                    "fee",
                    "fee-collection"
                ];
                var offer_states = [
                    "offer",
                    "offer-extend"
                ];
                if (statename) {
                    if (statename == "supplemental") {
                        if (spp_states.indexOf(statename) >= 0) {
                            if (menu_item.Supplemental) {
                                if (menu_item.Supplemental.status == "active" || menu_item.Supplemental.status == "review") {
                                    $state.go("appGatewayEditor.suppInReview", {
                                        gatewayId: gatewayid
                                    });
                                } else {
                                    deferred.resolve(resolvedObj);
                                }
                            }
                        }
                    } else if (statename == "documents") {
                        if (doc_states.indexOf(statename) >= 0) {
                            if (menu_item.Documents) {
                                if (menu_item.Documents.status == "active" || menu_item.Documents.status == "review") {
                                    $state.go("appGatewayEditor.docInReview", {
                                        gatewayId: gatewayid
                                    });
                                } else {
                                    deferred.resolve(resolvedObj);
                                }
                            }
                        }
                    } else if (statename == "interview") {
                        if (interview_states.indexOf(statename) >= 0) {
                            if (menu_item.Interview) {
                                if (menu_item.Interview.status == "active" || menu_item.Interview.status == "review") {
                                    $state.go("appGatewayEditor.interviewInReview", {
                                        gatewayId: gatewayid
                                    });
                                } else {
                                    deferred.resolve(resolvedObj);
                                }
                            }
                        }
                    } else if (statename == "fee") {
                        if (fee_states.indexOf(statename) >= 0) {
                            if (menu_item.Fee) {
                                if (menu_item.Fee.status == "active" || menu_item.Fee.status == "review") {
                                    $state.go("appGatewayEditor.feeInReview", {
                                        gatewayId: gatewayid
                                    });
                                } else {
                                    deferred.resolve(resolvedObj);
                                }
                            }
                        }
                    } else if (statename == "offer") {
                        if (offer_states.indexOf(statename) >= 0) {
                            if (menu_item.Offer) {
                                if (menu_item.Offer.status == "active" || menu_item.Offer.status == "review") {
                                    $state.go("appGatewayEditor.offerInReview", {
                                        gatewayId: gatewayid
                                    });
                                } else {
                                    deferred.resolve(resolvedObj);
                                }
                            }
                        }
                    }
                } else {
                    deferred.resolve(resolvedObj);
                }
            };

            var getMVData = function (url) {
                serverMV.get(url).then(function (data) {
                    bind_show_hide_menu(data);
                });
            };
            if (local_environment) {
                getMVData('gateway_sections.json');
            } else {
                getMVData('getGatewaySections');
            }
            return deferred.promise;
        };
    }]);