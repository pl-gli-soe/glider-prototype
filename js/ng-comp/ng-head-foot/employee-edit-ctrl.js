BulbApp.controller("EditRequestCtrl", function ($scope, RequestsService) {


	//console.log("Ctrl EditRequestCtrl.");

	// przyklad z http://jsfiddle.net/YFbC2/
	// w ctrl ModalFromCalendarCtrl wsadzona zostala data poprzez RequestsService
	// teraz jak jestesmy tutaj tj w finalnym modalu chcemy pobrac ta date
	// i skorzystac z niej
	/*
	function ControllerTwo($scope, Service) {
	    $scope.$watch(function () { return Service.getNumber();         }, function (value) {
	        $scope.number = value;
	    });
	}
	*/
	
	
	// $watch dziala poprawnie - data zostaje przekazana dokladnie taka jak zostala wybrana w kalendarzu
	// co ciekawe funkcja ta uruchamia sie tylko w tym konrektnym przypadku (bardzo dobrze!).
	
	$scope.$watch( function() {
		return RequestsService.getStrDate();
	}, function(value) {
		
		
		// OK!
		console.log( "Ctrl EditRequestCtrl. date: " + value);
		globalDateFromCalendar = value;
	});




    $scope.er = {};
    $scope.er.title = "Edytuj wniosek";

    $scope.er.requests = $scope.requests;


    // $scope..editRequestBody = RequestsService.getEditedRequest();
    $scope.editRequestBody = $scope.editedRequest;

    $scope.er.times = times;

    $scope.er.you = RequestsService.getYouObj();
    $scope.er.plans = RequestsService.getPlansArr();

    $scope.isvalid = false;
    $scope.valformsel;
    $scope.edtp1;
    $scope.edtp2;


    $scope.editThisRequest = function () {
        //alert(document.getElementById("datetimepicker1").value + ", " + document.getElementById("datetimepicker1").value + ", " + document.getElementById("select-request-type").value);
        // alert($("#input-edit-request").val());
        // $scope.editRequestBody = $("#edit-req-ctrl-label").html();
        $scope.editRequestBody = $("#edit-req-ctrl-label").html();
        $scope.editRequestReason = $("#edit-request-textarea-reason").html();
        
        
        
        // ?? what is this ??
        let newReason = "" + $scope.ertr;
        
        /*
        console.log("-------------------------");
        console.log($scope.editRequestBody);
        console.log("-------------------------");
        console.log($scope.editRequestReason);
        console.log("-------------------------");
		*/

        let re = /Nie ma czego/;

        if (re.test("" + $scope.editRequestBody)) {
            alert("Ta opcja w tym przypadku nie jest dostępna!");
        } else {


            let tmpAjdi = ("" + $scope.editRequestBody).split(",");
            tmpAjdi = tmpAjdi[0].split(" #: ");

            console.log("-------------------------");
            console.log(tmpAjdi[1]); // OK!
            console.log("-------------------------");


            let dtp1v = document.getElementById("input-edatetimepicker1").value;
            let dtp2v = document.getElementById("input-edatetimepicker2").value;

            let requestDoAktualizacji = $scope.requests.filter(function (item) {
                if (parseInt(item.ID) == parseInt(tmpAjdi[1])) {
                    return item;
                }
            })[0];

            /*
            {
                ...
                ApprovalDate: null
                ChildrenCareHours: 0
                CreatedBy: 247
                CreatedByName: "..."
                EditedBy: 247
                EditedByName: "..."
                EndDate: "2018-10-05T16:35:00Z"
                HolidaysNo: 0
                ID: 103
                InternalID: null
                OvertimeNo: 0
                Reason: "."
                RequestCodeSAP: "120"
                StartDate: "2018-10-05T15:35:00Z"
                Status: "1"
                WorkScheduleID: "16"
                __proto__: Object
            }
            */
            // console.log(requestDoAktualizacji);


            var tmpLeanObject = {};
            tmpLeanObject.StartDate = DateParser.dateFromYYYYMMDD_TTMM(dtp1v);
            tmpLeanObject.EndDate = DateParser.dateFromYYYYMMDD_TTMM(dtp2v);
            tmpLeanObject.Reason = requestDoAktualizacji.Reason;
            // tmpLeanObject.requestName = "";


            // OK - tmpLeanObject.StartDate those var as proper date type
            //console.log(tmpLeanObject.StartDate.getFullYear());
            //console.log(tmpLeanObject.StartDate.getMonth() + 1);
            // OK addHours putting now string which need to be parsed once again as date - but now i have parser! :D
            tmpLeanObject.StartDate = DateParser.dateFromYYYYMMDD_TTMM(addHours(tmpLeanObject.StartDate.getFullYear(),
                tmpLeanObject.StartDate.getMonth() + 1,
                tmpLeanObject.StartDate.getDate(),
                tmpLeanObject.StartDate.getHours() + ":" + tmpLeanObject.StartDate.getMinutes(),
                G_HOW_MANY_HOURS_NEED_TO_BE_ADDED_TO_BE_INLINE_WITH_SP));

            tmpLeanObject.EndDate = DateParser.dateFromYYYYMMDD_TTMM(addHours(tmpLeanObject.EndDate.getFullYear(),
                tmpLeanObject.EndDate.getMonth() + 1,
                tmpLeanObject.EndDate.getDate(),
                tmpLeanObject.EndDate.getHours() + ":" + tmpLeanObject.EndDate.getMinutes(),
                G_HOW_MANY_HOURS_NEED_TO_BE_ADDED_TO_BE_INLINE_WITH_SP));



            //console.log("co jest w scope ", newReason); // OK ???????????????????
            tmpLeanObject.Reason += "; " + newReason;


            // foo from addItemToSharePoint.js
            // main logic for adding data into the list on SP!
            // -----------------------------------------------------------
            // -----------------------------------------------------------
            let fullObj = outerEditItem(tmpLeanObject, requestDoAktualizacji);
            // -----------------------------------------------------------
            // -----------------------------------------------------------
            
            
            console.log("EDITED: ");
            console.log(fullObj);
            
            // by hard - 6 nie z bazy ale z reki wiec tutaj uwazaj!
            // uwaga! 6: changed
            requestDoAktualizacji.ID = undefined;
            requestDoAktualizacji.Status = 6;
            
            setTimeout(function () {
                let d2 = new Date();
                requests = $scope.requests;
                datePickerHandler.fillWithRequests("myDatePicker", "" + d2.getFullYear(), "" + (d2.getMonth() + 1));

				// $scope.$apply();
            }, 400);


        }

    }


    $scope.deleteThisRequest = function () {
        $scope.editRequestBody = $("#edit-req-ctrl-label").html();
        $scope.editRequestReason = $("#edit-request-textarea-reason").html();
        console.log("-------------------------");
        console.log($scope.editRequestBody);
        console.log("-------------------------");
        console.log($scope.editRequestReason);
        console.log("-------------------------");



        let re = /Nie ma czego/;

        if (re.test("" + $scope.editRequestBody)) {
            alert("Ta opcja w tym przypadku nie jest dostępna!");
        } else {




            let tmpAjdi = ("" + $scope.editRequestBody).split(",");
            tmpAjdi = tmpAjdi[0].split(" #: ");

            console.log("-------------------------");
            console.log(tmpAjdi[1]); // OK!
            console.log("-------------------------");



            let dtp1v = document.getElementById("input-edatetimepicker1").value;
            let dtp2v = document.getElementById("input-edatetimepicker2").value;


            let tmpLeanObject = {};
            tmpLeanObject.ID = parseInt(tmpAjdi[1]);
            tmpLeanObject.StartDate = DateParser.dateFromYYYYMMDD_TTMM(dtp1v);
            tmpLeanObject.EndDate = DateParser.dateFromYYYYMMDD_TTMM(dtp2v);

            let fakeFullObj = outerDeleteItem(tmpLeanObject);


            // 8 stands for delete
            // 7 removing accepted
            // 11 removing completed!

            //tmpLeanObject.ID
            // usage of arrow function :)
            let catchedReq = ((ajdi) => {

                // just deletion, so any other data stays the same!

                $scope.requests.forEach(function (item, i) {

                    if (parseInt(item.ID) == parseInt(ajdi)) {
                        // so we have proper request now to be updated!
                        // --------------------------------------------------
                        console.log("item to del: ");
                        console.log(item);

                        if (item.Status == 1) {
                            item.Status = 8;
                        }
                        if (item.Status == 2) {
                            item.Status = 7;
                        }
                        if (item.Status == 3) {
                            item.Status = 8;
                        }
                        if (item.Status == 4) {
                            item.Status = 11;
                        }
                        if (item.Status == 6) {
                            item.Status = 8;
                        }


                        // --------------------------------------------------
                    }
                });

            })(tmpLeanObject.ID);


            setTimeout(function () {
                let d2 = new Date();
                requests = $scope.requests;
                datePickerHandler.fillWithRequests("myDatePicker", "" + d2.getFullYear(), "" + (d2.getMonth() + 1));

                //$scope.$apply();
            }, 400);
        }
    }
});
