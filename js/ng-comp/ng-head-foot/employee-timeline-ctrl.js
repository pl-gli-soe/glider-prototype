BulbApp.controller("TimelineCtrl", function ($scope, RequestsService) {



    // console.log(statuses);



    $scope.someAction = function () {
        // alert("test");
        $scope.$apply(); // looks good
    };


    $scope.t = {};
    $scope.t.title = "Twoja oś czasu";

    $scope.aa = {};
    $scope.aa.arr = $scope.requests;

    $scope.aa.szerokosc = function (i) {

        //console.log(i.StartDate + " " + i.EndDate);

        arrsd = i.StartDate.split("T");
        arred = i.EndDate.split("T");



        if (arrsd[0] == arred[0]) {
            return 1;
        } else {
            return 2;
        }

    };


    $scope.aa.howMany = 5;
    $scope.showMore = function () {
        console.log("show more in timeline!");
        $scope.aa.howMany += 5;
    }

    $scope.sorted = function nameForRecur(arr, newArr) {
        let a = [];
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                // console.log($scope.visibleStatuses);
                // console.log(arr[i].Status);
                if ($scope.visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
                    // console.log(arr[i].Status);
                    a.push(arr[i]);
                }
            }
        }
        if (a.length > 0) {
            let el = a[0];
            let j = 0;
            for (let i = 0; i < a.length; i++) {
                if (el.StartDate > a[i].StartDate) {
                    el = a[i];
                    j = i;
                }
            }

            newArr.push(el);
            a.splice(j, 1);


            return nameForRecur(a, newArr);

        } else {
            //console.log(a);
            //console.log(newArr);
            return newArr;
        }
        return a;
    };

    $scope.takeLastData = function getLastFrom(marr, qty) {

        let a = [];
        let helper = 0;

        if (marr.length > 0) {


            if ((marr.length - qty) > 0) {
                for (let i = (marr.length - qty); i < marr.length; i++) {


                    a.push(marr[i]);
                }
            } else {
                for (let i = 0; i < marr.length; i++) {
                    a.push(marr[i]);
                }
            }
        }
        return a;
    };



    //console.log(JSON.stringify($scope.aa.arr[0]));

    $scope.aa.ss = statuses;
    $scope.aa.pp = presenceCodes;

    $scope.requestDoEdycji;

    $scope.forSelected;

    $scope.goBack = function () {
        navigationFn.goToSection("#home");
    };


    $scope.strStatus = function (statusIndx) {


        // return statusIndx;


        let tempStrStatus = "";
        // console.log(statuses);

        for (let i = 0; i < statuses.length; i++) {
            // console.log(statuses[i].ID + "  " + statusIndx);
            if (parseInt(statuses[i].ID) == parseInt(statusIndx)) {
                tempStrStatus = statuses[i].Status;
            }
        }

        return tempStrStatus;
    };

    $scope.gs = function (si) {

        // return si;

        for (let x = 0; x < statuses.length; x++) {

            console.log("" + statuses[x].ID + " " + si);
            if (statuses[x].ID = si) {
                return graphStatuses[x];
            }
        }

        return graphStatuses[9];
    }


    $scope.covertCodeToDescription = function (code) {
        let desc = "";

        for (let i = 0; i < $scope.aa.pp.length; i++) {

            let item = $scope.aa.pp[i];

            //console.log(item.plan + " =? " + code); // now it is OK
            if (item.ID == code) {
                desc = item.Description;
                break;
            }
        }
        return desc;
    };

    $scope.covertCodeToSAPCode = function (code) {
        let t = "";

        for (let i = 0; i < $scope.aa.pp.length; i++) {

            let item = $scope.aa.pp[i];

            //console.log(item.plan + " =? " + code); // now it is OK
            if (item.ID == code) {
                t = item.Title;
                break;
            }
        }
        return t;
    };




    $scope.addRequestFromTimeline = function () {
        //alert("dodaj wniosek!");
    };


    $scope.timelineLi = function (arg) {
        // console.log(arg);
        //$scope.requestDoEdycji = searchForRequest(arg.id);
        //console.log($scope.requestDoEdycji);
        //$scope.requestDoEdycji = arg;
        //RequestsService.setEditedRequest(arg);
        // jquery insertion
        //$("#edited-request").html(JSON.stringify(arg));

        //let tmp = JSON.stringify(arg);
        //$("#modal-edit-request .modal-body p").html(JSON.stringify(arg));
        // $("#input-edit-request").val(arg.id);

        let rid = arg.ID
        let status = arg.Status;
        let code = arg.RequestCodeSAP;
        let start = arg.StartDate;
        let koniec = arg.EndDate;

        $("#modal-edit-request").modal('show');

        $("#edatetimepicker1").val(start.replace("T", " ").replace(":00Z", ""));
        $("#edatetimepicker2").val(koniec.replace("T", " ").replace(":00Z", ""));

        let codeID = function (c) {
            for (let i = 0; i < $scope.aa.pp.length; i++) {

                // console.log(c + " " + $scope.aa.pp[i].ID);
                if (c == $scope.aa.pp[i].ID) {
                    return ($scope.aa.pp[i].Description);
                }
            }
        }(code);

        let strStatus = function (st) {
            for (let i = 0; i < $scope.aa.ss.length; i++) {
                if (st == $scope.aa.ss[i].ID) {
                    return ($scope.aa.ss[i].Status);
                }
            }
        }(status);

        //console.log(codeID);
        //$("#e-select-request-type").val(codeID);
        $scope.forSelected = codeID;

        $("#edit-req-ctrl-label").html("Wniosek #: " + rid + ", o : " + $scope.forSelected + ", status: " + strStatus);

        //RequestsService.setEditedRequest(arg);
        //$("#modal-edit-request").modal('show');
    }


    var searchForRequest = function (id) {
        for (let i = 0; i < $scope.aa.arr.length; i++) {

            if (id == $scope.aa.arr[i].id) {
                return $scope.aa.arr[i];
            }
        }
    }
});

