/**
 * Created by jmccommas on 09/07/16.
 */
(function () {
    "use strict";
    configAppDirective.directive('setTarget', ['$timeout',
        function ($timeout) {
            return function (scope, element, attrs) {
                $timeout(function () {
                    var i, anchorElements = element[0].querySelectorAll('a');
                    if (anchorElements) {
                        for (i = 0; i < anchorElements.length; i++) {
                            anchorElements[i].setAttribute('target', '_blank');
                            //Uncomment below code if want to open ink in new small window
                            //anchorElements[i].onclick = function () {
                            //  window.open(this.href, 'ConfigUI:Target', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
                            //  return false;
                            //};
                        }
                    }
                });
            };
    }])
}());