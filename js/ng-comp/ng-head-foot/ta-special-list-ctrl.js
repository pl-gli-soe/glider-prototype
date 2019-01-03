BulbApp.controller("SpecialListCtrl", function ($scope, RequestsService) {
    $scope.sl = {};

    $scope.sl.titleTA = "Wnioski specjalne";

    $scope.sl.sr = $scope.specialRequests;

    $scope.sl.howManyVisible = 10;

    $scope.sl.specialRequestsLean = [];

    let iterator = 0;
    for (let i = ($scope.sl.sr.length - 1); i > -1; i--) {
        $scope.sl.specialRequestsLean.push($scope.sl.sr[i]);
        iterator++;

        if (iterator == $scope.sl.howManyVisible) {
            i = -1;
        }
    }


    $scope.showMore = function () {}
});
