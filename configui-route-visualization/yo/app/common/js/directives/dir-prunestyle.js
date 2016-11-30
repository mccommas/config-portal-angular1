configAppDirective.directive('pruneStyle', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                $(element).children().each(function () {
                    $(this).removeAttr("style")
                });
            }
        };
    }]);