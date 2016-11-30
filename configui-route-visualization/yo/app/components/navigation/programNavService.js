/**
 * Created by pchabrolu on 3/15/2016.
 */
(function () {
    "use strict";
    configAppService.service('programNavService', [
        function(){
            this.programParentState = null;
            this.getParent = function(){
                return this.programParentState;
            };
            this.setParent = function(state){
                this.programParentState = state;
            };
        }
    ]);

}());