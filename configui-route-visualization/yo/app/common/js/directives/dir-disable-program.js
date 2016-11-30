configAppDirective.directive('isdisabledProgram', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var dateToday = new Date();
                var startDate = new Date(scope.program.startDate);
                var deadline = new Date(scope.program.deadline);
                startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);
                deadline = new Date(deadline.getTime() + deadline.getTimezoneOffset() * 60000);

                var status = scope.program.status;
                $timeout(function () {
                    if (scope.headerOrgdata.userType.toLowerCase() == "admissions user") {
                        if (status) {
                            if (status.toLowerCase() == 'active' && (dateToday >= startDate && dateToday <= deadline || dateToday >= deadline)) {
                                //disable code goes here
                                element.css({
                                    color: '#D2D2D2',
                                    cursor: "default"
                                    //background: "grey"
                                });
                                element.unbind('mouseover');
                                $(element).children("td:last").css("pointer-events", "none");
                                scope.program.popovertext = "This program is active and cannot be edited. Contact Liaison Support if you would like to request changes.";
                            } else {
                                scope.program.popovertext = scope.program.programName;
                                element.bind("click", function () {
                                    //scope.viewProgramDetails(scope.program);
                                });
                            }
                        }
                    } else {
                        scope.program.popovertext = scope.program.programName;
                        element.bind("click", function () {
                            //  scope.viewProgramDetails(scope.program);
                        });
                    }
                }, 1000);
            }
        };
    }]);