configAppControllers.controller('openDatePickerCtrl', ['$scope', '$timeout',
    function ($scope, $timeout) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
             //return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.openCalendar = function ($event, id) {
           $("ul[datepicker-popup-wrap]").css("width","325px");
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
            $timeout(function () {
                $("#" + id).focus();
            },3000);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 0
        };

        $scope.initDate = new Date('2012/03/21');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
        $scope.format = $scope.formats[4];
    }
]);