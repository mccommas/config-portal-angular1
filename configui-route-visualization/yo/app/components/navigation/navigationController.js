/**
 * Created by jmccommas on 10/29/14.
 */
(function () {
    "use strict";
    configAppControllers.controller('navigationController', ["$scope", "$location", "$timeout", "$state", "$rootScope", "Restangular", "programAttributesService",
  function ($scope, $location, $timeout, $state, $rootScope, Restangular, programAttributesService) {

      var navigation = this,
          showOrgSideArrow;
      // search btn on sidebar
      showOrgSideArrow = function () {
          //If user type is "association" then we show arrow
          if (navigation.userType.toLowerCase() == "association user") {
              navigation.showArrow = true;
          } else if (navigation.userType.toLowerCase() == "admissions user") {
              //If user type is "admissions" then we dont show arrow
              navigation.showArrow = false;
          }
      };
      $scope.url = 'programMaterials/' + $scope.parent_program_id + '/evaluations';
      var serverNavigation;
      var userObject;
      if (local_environment) {
          serverNavigation = Restangular.all('app').all('data');
          userObject = Restangular.all('app').all('data');
      } else {
          serverNavigation = Restangular.all('configuration');
          userObject = Restangular.all('configuration');
      }
      navigation.getheaderOrgData = function (url) {
          //making server side request to get headerDATA
          serverNavigation.get(url).then(function (data) {
              navigation.headerOrgdata = data;
              //calling function to show/Hide arrow depending on userType
          });
      };
      navigation.getUserData = function(url){
          userObject.get(url).then(function (data) {
              navigation.userType = data.userType;
              showOrgSideArrow(data);
          });
      };
      navigation.get_org_header = function (url) {
          //function to call nameInfoOrg for header info
          if (local_environment) {
              navigation.getUserData('userObject.json');
              //navigation.getheaderOrgData('nameInfoOrg.json');
          } else {
              navigation.getUserData('getUserType');
              //navigation.getheaderOrgData('nameInfoForOrg');
          }
      };

            //Calling function to get header data
            navigation.get_org_header();
            navigation.isLogoVisible = true;
            navigation.showCasLabel = false;
            navigation.showApplicationLabel = false;
            navigation.showOrganizationLabel = false;
            navigation.showSearch = false;
            navigation.currentList = "";
            navigation.casNameSelected = "";
            navigation.appNameSelected = "";
            navigation.selectedCASItem = "";
            navigation.selectedAppItem = "";
            navigation.selectedOrgItem = "";


            navigation.toggleSearch = function () {
                navigation.showSearch = !navigation.showSearch;
                if (navigation.showSearch) {
                    $timeout(function () {
                        $("#txtsearch").focus();
                    }, 5);
                }
            };

            var Local_casListUrl = "/new-nav-casList.json",
                Local_appListUrl = "/new-nav-appList.json",
                Local_orgListUrl = "/new-nav-orgList.json";


            navigation.getCAS = function (casListUrl) {
                serverNavigation.all(casListUrl).getList().then(function (casData) {
                    $('#cas_navigation').css("display", "none");
                    navigation.currentList = "casList";
                    navigation.casList = casData;
                    $('#cas_navigation').fadeIn(2000);
                    navigation.showCasLabel = true;
                    navigation.showApplicationLabel = false;
                    navigation.showOrganizationLabel = false;
                });
            };
            navigation.getApplication = function (appListUrl) {
                navigation.isLogoVisible = false;
                serverNavigation.all(appListUrl).getList().then(function (appData) {
                    $('#app_navigation').css("display", "none");
                    navigation.currentList = "appList";
                    navigation.appList = appData;
                    $('#app_navigation').fadeIn(2000);
                    navigation.showCasLabel = false;
                    navigation.showApplicationLabel = true;
                    navigation.showOrganizationLabel = false;
                });
            };
            navigation.getOrganization = function (orgListUrl) {
                serverNavigation.all(orgListUrl).getList().then(function (orgData) {
                    $('#org_navigation').css("display", "none");
                    navigation.currentList = "orgList";
                    navigation.orgList = orgData;
                    $('#org_navigation').fadeIn(2000);
                    navigation.showCasLabel = false;
                    navigation.showApplicationLabel = false;
                    navigation.showOrganizationLabel = true;
                    if(navigation.orgListLoaded){
                        navigation.orgListLoaded();
                    }
                    programAttributesService.setProgramAttributes(navigation.userType);
                });
            };

            navigation.getCAS((local_environment ? Local_casListUrl : "casList"));

            navigation.selectedItem = function (Item, key, value) {

                jQuery("#item_" + Item.id).parent("div").append("<p class='activated_p'>" + value + "</p>");

                if (jQuery(".activated_p").length) {
                    var dis = jQuery(".activated_p").offset().top;
                    dis = 0 - dis - 0;
                } else {
                    dis = 0;
                }

                jQuery(".activated_p").animate({
                    "margin-top": dis,
                    "opacity": ".7"
                        // "transition": "opacity 2s linear"
                }, 'slow', function () {
                    jQuery('.topLinkStyle span').each(function (i, ele) {
                        if (this.id == key) {
                            $(this).removeClass('animated bounceIn');
                            $(this).addClass('animated bounceIn');
                        }
                    });
                    jQuery(".activated_p").remove();
                    //Switch Start

                    switch (key) {
                    case "casName":
                        navigation.selectedCASItem = Item;
                        navigation.casNameSelected = value;
                        navigation.casList = null;
                        navigation.getApplication((local_environment ? Local_appListUrl : "applicationForms/" + Item.id));
                        break;
                    case "appName":
                        navigation.selectedAppItem = Item;
                        navigation.appNameSelected = value;
                        navigation.appList = null;
                        navigation.getOrganization((local_environment ? Local_orgListUrl : "organizations/" + Item.id));
                        $rootScope.applicationId = Item.id;
                        break;
                    case "orgName":
                        navigation.selectedOrgItem = Item;
                        navigation.currentList = "program";
                        break;
                    }
                    //Switch Ends
                });

                if (key == "orgName") {
                    navigation.selectedOrgItem = Item;
                    navigation.currentList = "program";
                }
            };

            navigation.goBack = function () {
                switch ($state.$current.toString()) {
                case "cas":
                    break;
                case "app":
                    navigation.selectedCASItem = null;
                    navigation.casNameSelected = null;
                    navigation.appNameSelected = "";
                    navigation.appList = null;
                    navigation.isLogoVisible = true;
                    $state.go('cas');
                    navigation.getCAS((local_environment ? Local_casListUrl : "casList"));
                    break;
                case "org":
                    navigation.orgList = null;
                    navigation.isLogoVisible = false;
                    navigation.selectedAppItem = null;
                    navigation.appNameSelected = null;
                    $state.go('app', {
                        casId: navigation.selectedCASItem.id
                    });
                    navigation.getApplication((local_environment ? Local_appListUrl : "applicationForms/" + navigation.selectedCASItem.id));
                    break;
                default:
                    navigation.orgList = null;
                    navigation.isLogoVisible = false;
                    $state.go('app', {
                        casId: navigation.selectedCASItem.id
                    });
                    navigation.selectedAppItem = null;
                    navigation.appNameSelected = null;
                    // alert(JSON.stringify(navigation.selectedCASItem));
                    navigation.getApplication((local_environment ? Local_appListUrl : "applicationForms/" + navigation.selectedCASItem.id));
                }
            };
            navigation.openAppView = function () {
                // Code to send to organization view
                alert("Show Application View");
            };

            navigation.navigateToOrg = function (app, orgId){
                navigation.selectedItem(app,'appName',app.instanceName);
                //navigationCtrl.selectedItem(orgItem,'orgName',orgItem.organizationName);
                navigation.orgListLoaded = function(){
                    var org = _.findWhere(navigation.orgList,{"id":orgId});
                    navigation.selectedItem(org,'orgName',org.organizationName);
                };
            };

            $rootScope.$on('navigateToOrg',function(event, data){
                navigation.navigateToOrg(data.app, data.orgId);
            });
  }]); // end navigationController
}());