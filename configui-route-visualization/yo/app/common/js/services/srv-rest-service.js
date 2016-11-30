/**
 * Created by jmccommas on 12/21/14.
 */
configAppService.factory('SomeVariableService', ['Restangular', '$q', function SomeVariableService (Restangular, $q){
    return {
        getNewRes: function(someParameter){
            var newResDeferred = $q.defer();
            Restangular.one('someVariable').get({someParameter: someParameter})
                .then(function(result){
                    var newRes = result;
                    newRes.newlyCreatedProp = 'newlyCreatedProp';
                    newResDeferred.resolve(newRes);
                });
            return newResDeferred.promise;
        }
    };
}]);
