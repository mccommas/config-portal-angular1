/**
 * Created by pchabrolu on 1/12/2016.
 */
configAppService.factory('DataService', ['$q', function SomeVariableService ($q){
    var object = {};
    return {
        set : function(key,data){
            if(key){
                object[key] = data;
            }
        },
        get : function(key){
            if(key && _.has(object, key)){
                return object[key];
            }else{
                return null;
            }
        }
    };
}]);