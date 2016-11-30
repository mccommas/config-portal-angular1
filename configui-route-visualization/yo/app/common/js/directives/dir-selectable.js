/**
 * Created by jmccommas on 1/3/15.
 */
(function () {
    "use strict";
    configAppDirective.directive('selectable',['$animate', function ($animate) {
        return function(scope,element,attrs){
            element.on('click', function(){
                if(element.hasClass('selected')){
                    $animate.removeClass(element,'selected');
                    // adds removes icon
                    scope.application.selected = false;
                } else {
                    $animate.addClass(element,'selected').then(function(){
                        scope.$apply(function(){
                            scope.application.selected = true;
                        })
                    })

                } scope.$digest();
            })
        }
    }]);
}());
// http://www.pluralsight.com/courses/angular-1-3
// sample css

//.selectable-table {
//    cursor: pointer
//}
//
//.selectable-table tr.selected {
//    background-color: #333;
//}
//.selectable-table tr.selected-add, .selectable-table tr.selected-remove {
//    transitions: all 1s linear;
//}

// html sample table
// <table class = "table selectable-table">
// <tr ng-repeat="class in classes"></td>
//<td>{{class.className}}</td>
//<td><i ng-show="class.selected" class="glyphicons"></i>
