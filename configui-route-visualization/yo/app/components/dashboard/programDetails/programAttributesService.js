/**
 * Created by pchabrolu on 3/28/2016.
 * ProgramAttributesService is to define the fields and  properties of each field (disable, required, dropdown or text field) in Program Edit form and Program Add form
 * This will eliminate of the necessity of hardcoded templates based on CAS and CAS Form in future
 * setProgramAttributes() method is called when the application cycle is selected(CAS Form) from the left navigation, takes the userType as input parameter
 * getProgramAttributes() method returns the Object with standard fields and additional fields along with properties, takes the userType as input parameter
 */
(function () {
    "use strict";
    configAppService.service('programAttributesService', ["$q","Restangular",
        function ($q,Restangular) {
            var serverProgram;
            var attributesConfig = null;
            if (local_environment) {
                serverProgram = Restangular.all('app').all('data');
            } else {
                serverProgram = Restangular.all('configuration');
            }
            //Additional Fields set order
            var addtional_fields_order = {
                "programLevel":1,
                "programType":2,
                "campus":3,
                "department":4,
                "track":5,
                "concentration":6,
                "delivery":7,
                "applicationType":8
            }
            var set_program_attributes = function(attrs, states, userType){
                var fields = angular.copy(_Program_Attributes);
                fields.state.lookUp =  states;
                fields.startTerm.lookUp =  _Program_startTerms;
                if(attrs && attrs.length >0){
                    fields._defaul_config = false;
                    fields.addition_information = [];
                    _.forEach(attrs, function(attr){
                        switch (attr.programModelName){
                            case "casName" :
                            case "applicationName" :
                            case "organizationName" :
                            case "id" :
                            case "status" :
                            case "programCode" :
                            case "programName" :
                            case "waDisplayName":
                            case "city" :
                            case "state" :
                            case "zipCode" :
                            case "startDate" :
                            case "deadline" :
                            case "deadlineDisplay" :
                            case "startTerm" :
                            case "academicYear" :
                            case "fee" :
                                fields[attr.programModelName] = {
                                    id:attr.id,
                                    programModelName:attr.programModelName,
                                    displayName:attr.displayName,
                                    sortIndex:attr.sortIndex,
                                    editable:userType.toLowerCase() === "association user" ? true : attr.editable,
                                    required:attr.required,
                                    lookUp:attr.lookUp,
                                    show:true
                                };
                                break;
                            default : fields.addition_information.push({
                                id:attr.id,
                                programModelName:attr.programModelName,
                                displayName:attr.displayName,
                                sortIndex:attr.sortIndex,
                                editable:userType.toLowerCase() === "association user" ? true : attr.editable,
                                required:attr.required,
                                lookUp:attr.lookUp
                            });
                            break;
                        }
                    });
                    //The following code is to sort the additional information array with custom order, the order is defined in addtional_fields_order object
                    if(fields.addition_information){
                        /*console.log("Before sorting fields.addition_information: ",fields.addition_information);*/
                        angular.forEach(fields.addition_information,function(field, index){
                            fields.addition_information[index].customSortIndex = addtional_fields_order[field.programModelName];
                        });
                        /*console.log("After custom indexing fields.addition_information ",fields.addition_information);*/
                        fields.addition_information = _.sortBy(fields.addition_information, 'customSortIndex');
                        /*console.log("After sorting fields.addition_information: ",fields.addition_information);*/
                    }
                }else{
                    fields._defaul_config = true;
                }

                attributesConfig = fields;
            };
            this.getProgramAttributes = function (userType) {
            	var deferred = $q.defer();
                if(attributesConfig){
                	deferred.resolve(attributesConfig);
                }else{
                	this.setProgramAttributes(userType).then(function(){
                		deferred.resolve(attributesConfig);
                	},function(){
                		deferred.reject("Program Attributes setting failed");
                	});
                }
                return deferred.promise;
            };
            this.setProgramAttributes = function(userType){
            	var deferred = $q.defer();
                var url, states_url;
                if (local_environment) {
                    url = 'program_attributes.json';
                    states_url = 'states.json';
                } else {
                    url = 'programAttributes';
                    states_url = 'findlookupby/LK_States/ASC';
                }

                serverProgram.get(states_url).then(function(data){
                    var states = [];
                    _.forEach(data, function(state,index){
                        states.push({
                            "id":state.id,
                            "value":state.valueId,
                            "displayName":state.valueString,
                            "sortIndex":state.sortIdx,
                            "valueAbbr":state.valueAbbr
                        });
                    })
                    serverProgram.get(url).then(function (data) {
                    	deferred.resolve(set_program_attributes(data,states,userType));
                    },function(data){
                    	deferred.resolve(set_program_attributes([],states,userType));
                    });
                });
                return deferred.promise;
            };
        }]);
}());