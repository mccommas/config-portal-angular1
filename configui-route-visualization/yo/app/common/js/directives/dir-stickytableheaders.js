configAppDirective.directive('fixedTableHeaders', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $timeout(function () {

                     container = element.parentsUntil(attrs.fixedTableHeaders);
                     element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });

                }, 0);

                $(window).resize(function () {

                    container = element.parentsUntil(attrs.fixedTableHeaders);
                    element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });
                });
            }

        };
    }]);