var BulbApp = angular.module("BulbApp", ["ngRoute", "ngAnimate"]);


BulbApp.run(function ($rootScope) {



    $rootScope.requests = requests;
    $rootScope.specialRequests = specialRequests;


    $rootScope.visibleStatuses = visibleStatuses;
    $rootScope.preStatuses = preStatuses;
    $rootScope.calcStatuses = calcStatuses;
    $rootScope.planStatuses = planStatuses;
    $rootScope.redStatuses = redStatuses;

    $rootScope.editedRequest = editedRequest;

    $rootScope.overtimeCodes = overtimeCodes;
    $rootScope.hoCode = homeofficeCode;
    $rootScope.urlopCode = urlopCode;
    $rootScope.opieka = opiekaCodes;
    
    
    $rootScope.strDateFromCalendar = DateParser.generateYYYYMMDD( (new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate() );
	
});





BulbApp.controller("CalendarCtrl", function ($scope, RequestsService) {

    $scope.c = {};
    $scope.c.title = "Kalendarz";

    $scope.aa = {};
    $scope.aa.arr = $scope.requests;

    // console.log($scope.aa.arr[0]); // OK
    $scope.arrForModel = $scope.aa.arr;


    $scope.goBack = function () {
        navigationFn.goToSection("#home");
    }


});


BulbApp.controller("ListCtrl", function ($scope, RequestsService) {


    $scope.ll = {};

    $scope.ll.leanArr = [];
    $scope.ll.leanArrForEmployee = [];
    $scope.ll.leanArrForSupervisor = [];
    $scope.ll.leanArrForTA = [];
    $scope.ll.howManyVisible = 5;
    
    $scope.ll.ss = statuses;
    $scope.ll.pp = presenceCodes;

    
    // to easy!
    //$scope.ll.leanArr = $scope.requests.slice(-1 * $scope.ll.howManyVisible);

    let iterator = 0;
    for (let i = ($scope.requests.length - 1); i > -1; i--) {
    
    	let el = $scope.requests[i];
    	if (visibleStatuses.indexOf(parseInt(el.Status)) >= 0) {
	        $scope.ll.leanArr.push($scope.requests[i]);
	        iterator++;
		}

        if (iterator == $scope.ll.howManyVisible) {
            i = -1;
        }
    }



    $scope.ll.title = "Lista Twoich wniosków";
    $scope.ll.titleTA = "Wnioski pracowników, którzy są przypisani do Twojego TA kodu";
    $scope.ll.titleSupervisor = "Wnioski pracowników, które możesz akceptować";


    $scope.ll.leanArrForEmployee = $scope.ll.leanArr;
    $scope.ll.visibleOnlyLeanArr = [];


    //console.log($scope.requests);
    //console.log($scope.ll.leanArr);

    $scope.ll.wybraneWnioski = {
        toApprove: [],
        toDecline: []
    };


    //$scope.ll.arr = RequestsService.getArr();
    $scope.ll.arr = $scope.requests;
    $scope.ll.visibleOnlyLeanArr = [];

    iterator = 0;
    $scope.requests.forEach(function (el, i) {
        if ($scope.visibleStatuses.indexOf(parseInt(el.Status)) >= 0) {

            if (iterator < $scope.ll.howManyVisible) {
                $scope.ll.visibleOnlyLeanArr.push(el);
                iterator++;
            }
        }

    });


    iterator = 0;
    $scope.requests.forEach(function (el, i) {
        if ($scope.preStatuses.indexOf(parseInt(el.Status)) >= 0) {

            if (iterator < $scope.ll.howManyVisible) {
                $scope.ll.leanArrForSupervisor.push(el);
                iterator++;
            }
        }

    });


    iterator = 0;
    $scope.requests.forEach(function (el, i) {
        if ($scope.calcStatuses.indexOf(parseInt(el.Status)) >= 0) {

            if (iterator < $scope.ll.howManyVisible) {
                $scope.ll.leanArrForTA.push(el);
                iterator++;
            }
        }

    });




    $scope.approve = function (itemid) {
        // alert(itemid);


        let liElement = document.querySelector("#list-a-" + itemid).parentElement.parentElement;
        // console.log(liElement);

        liElement.classList.toggle("li-green");

        if (liElement.classList.contains("li-red")) {
            liElement.classList.remove("li-red");
            let indx = $scope.ll.wybraneWnioski.toDecline.indexOf(itemid);
            if (indx > -1) {
                $scope.ll.wybraneWnioski.toDecline.splice(indx, 1);
            }

        } else {

        }

        if (liElement.classList.contains("li-green")) {
            $scope.ll.wybraneWnioski.toApprove.push(itemid);
        } else {
            let indx = $scope.ll.wybraneWnioski.toApprove.indexOf(itemid);
            if (indx > -1) {
                $scope.ll.wybraneWnioski.toApprove.splice(indx, 1);
            }
        }
    }

    $scope.decline = function (itemid) {
        // alert(itemid);

        let liElement = document.querySelector("#list-d-" + itemid).parentElement.parentElement;
        // console.log(liElement);

        liElement.classList.toggle("li-red");

        if (liElement.classList.contains("li-green")) {

            liElement.classList.remove("li-green");
            let indx = $scope.ll.wybraneWnioski.toApprove.indexOf(itemid);
            if (indx > -1) {
                $scope.ll.wybraneWnioski.toApprove.splice(indx, 1);
            }
        } else {

        }

        if (liElement.classList.contains("li-red")) {
            $scope.ll.wybraneWnioski.toDecline.push(itemid);
        } else {
            let indx = $scope.ll.wybraneWnioski.toDecline.indexOf(itemid);
            if (indx > -1) {
                $scope.ll.wybraneWnioski.toDecline.splice(indx, 1);
            }
        }
    }


    $scope.sendDecision = function () {
        //console.log($scope.ll.wybraneWnioski);
        //alert("APPROVED: " + $scope.ll.wybraneWnioski.toApprove.toString() + ", DECLINED: " + $scope.ll.wybraneWnioski.toDecline.toString());


        let ileWnioskowDoAkceptacji = parseInt($scope.ll.wybraneWnioski.toApprove.length) + parseInt($scope.ll.wybraneWnioski.toDecline.length);

        if (ileWnioskowDoAkceptacji > 0) {
            // OK
            // logika zmiany statusow wnioskow!
            // --------------------------------------------------------------------------------------------------------------------------------
			// console.log($scope.ll.wybraneWnioski); // OK!
			
			
			if($scope.ll.wybraneWnioski.toApprove.length > 0) {
				// for each some approval
				// ----------------------------------------------------------
				$scope.ll.wybraneWnioski.toApprove.forEach(function(item, indx) {
					// now we can go with every element of the array (item is exactly the id of the request
					updateStatusForThisRequest("Accepted", item);
				});				
				// ----------------------------------------------------------
			}
			
			if($scope.ll.wybraneWnioski.toDecline.length > 0) {
				// for each some decline
				// ----------------------------------------------------------
				$scope.ll.wybraneWnioski.toDecline.forEach(function(item, indx) {
					// now we can go with every element of the array (item is exactly the id of the request
					updateStatusForThisRequest("Declined", item);
				});				
				// ----------------------------------------------------------
			}
			
			

            // --------------------------------------------------------------------------------------------------------------------------------
        } else {
            alert("Nie ma czego akceptować!");
        }
        
        
        alert("Decyzja została wysłana!");
    }

    $scope.showMore = function () {

        $scope.ll.leanArr = $scope.requests;
        $scope.ll.leanArrForEmployee = [];
        $scope.ll.leanArrForSupervisor = [];

        $scope.ll.leanArr.forEach(function (el, i) {
            if ($scope.visibleStatuses.indexOf(parseInt(el.Status)) >= 0) {
                $scope.ll.visibleOnlyLeanArr.push(el);
            }
            
            if ($scope.preStatuses.indexOf(parseInt(el.Status)) >= 0) {
                $scope.ll.leanArrForSupervisor.push(el);
            }
            
            if ($scope.visibleStatuses.indexOf(parseInt(el.Status)) >= 0) {
                 $scope.ll.leanArrForEmployee.push(el);
            }

            if ($scope.calcStatuses.indexOf(parseInt(el.Status)) >= 0) {
                 $scope.ll.leanArrForTA.push(el);
            }

        });        
    };

    $scope.covertCodeToDescription = function (code) {
        let desc = "";

        for (let i = 0; i < $scope.ll.pp.length; i++) {

            let item = $scope.ll.pp[i];

            //console.log(item.plan + " =? " + code); // now it is OK
            if (item.ID == code) {
                desc = item.Description;
                break;
            }
        }
        return desc;
    }

    $scope.covertCodeToSAPCode = function (code) {
        let t = "";

        for (let i = 0; i < $scope.ll.pp.length; i++) {

            let item = $scope.ll.pp[i];

            //console.log(item.plan + " =? " + code); // now it is OK
            if (item.ID == code) {
                t = item.Title;
                break;
            }
        }
        return t;
    }

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
});



BulbApp.controller("ThisWeekScheduleCtrl", function ($scope) {


    $scope.wksch = {};

    $scope.wksch.title = "This week schedule";
    $scope.wksch.rs = $scope.requests;

    //console.log($scope.requests.length); // sometimes ok? :/



    var curr = new Date;
    var fst = curr.getDate() - curr.getDay();
    var fst = fst + 1;
    var last = fst + 6;
    $scope.wksch.monday = new Date(curr.setDate(fst));
    $scope.wksch.sunday = new Date(curr.setDate(last));
    //console.log($scope.wksch.monday);
    //console.log("date yyyy-mm-dd: " + DateParser.generateYYYYMMDD($scope.wksch.monday.getFullYear(), ($scope.wksch.monday.getMonth() + 1), $scope.wksch.monday.getDate()));
    //console.log( $scope.wksch.monday + " " +  $scope.wksch.monday.getFullYear() + " " + ($scope.wksch.monday.getMonth() + 1) + " " + $scope.wksch.monday.getDate() );
    $scope.wksch.fromDate = DateParser.generateYYYYMMDD($scope.wksch.monday.getFullYear(), ($scope.wksch.monday.getMonth() + 1), $scope.wksch.monday.getDate());
    $scope.wksch.toDate = DateParser.generateYYYYMMDD($scope.wksch.sunday.getFullYear(), ($scope.wksch.sunday.getMonth() + 1), $scope.wksch.sunday.getDate());

    $scope.wksch.users = fillWithNames();
    $scope.wksch.matrix = fillMatrix();

    // console.log($scope.wksch.matrix);

    /*
        example of object for cell in this week schedule to maintain...
        [
            {
                "Title":
                    {
                        "ID":115,"Title":"A520","Description":"Odebranie nadgodzin","List":"Yes","Quick":"Yes","ID_SAP":null
                    },
                "Request":
                    {
                        "ID":106,"CreatedBy":247,"EditedBy":247,"CreatedByName":"Mateusz Milewski",
                        "EditedByName":"Mateusz Milewski","RequestCodeSAP":"115",
                        "StartDate":"2018-10-09T07:25:00Z","EndDate":"2018-10-09T08:25:00Z",
                        "Status":"1","InternalID":null,"Reason":"odebranie jednoczesnie",
                        "WorkScheduleID":"16","ApprovalDate":null,"OvertimeNo":0,"HolidaysNo":0,"ChildrenCareHours":0
                    }
            }    
        ]	
    */

    $scope.wksch.parseObjectForInnerHTML = function (obj) {
        return "" + obj.Title.Title;
    }


    $scope.wksch.parseObjectForStatus = function (obj) {
        return "" + obj.Request.Status;
    }

    $scope.wksch.parseObjectForID = function (obj) {
        return "" + obj.Request.ID;
    }

    $scope.wksch.onClick = function (obj) {
        alert(obj.Request.ID);
    }


    $scope.wksch.getYYYYMMDDDate = function (which) {

        //console.log($scope.wksch.monday);
        //console.log(typeof $scope.wksch.monday);

        var innerCurr = new Date($scope.wksch.monday.getFullYear(), $scope.wksch.monday.getMonth(), $scope.wksch.monday.getDate());
        // var d = innerCurr.getDate() - innerCurr.getDay();
        //console.log(innerCurr);
        var dd = innerCurr.getDate() - 1 + parseInt(which);
        // 		console.log("dd: " + dd); // dzien
        innerCurr.setDate(dd);
        // console.log(innerCurr);

        return DateParser.generateYYYYMMDD(innerCurr.getFullYear(), (innerCurr.getMonth() + 1), innerCurr.getDate());

    }




    $scope.wksch.getPrevWeek = function () {
        $scope.wksch.monday.setDate($scope.wksch.monday.getDate() - 7);
        $scope.wksch.sunday.setDate($scope.wksch.sunday.getDate() - 7);

        $scope.wksch.fromDate = DateParser.generateYYYYMMDD($scope.wksch.monday.getFullYear(), ($scope.wksch.monday.getMonth() + 1), $scope.wksch.monday.getDate());
        $scope.wksch.toDate = DateParser.generateYYYYMMDD($scope.wksch.sunday.getFullYear(), ($scope.wksch.sunday.getMonth() + 1), $scope.wksch.sunday.getDate());

        $scope.wksch.users = fillWithNames();
        $scope.wksch.matrix = fillMatrix();


    }

    $scope.wksch.getNextWeek = function () {
        $scope.wksch.monday.setDate($scope.wksch.monday.getDate() + 7);
        $scope.wksch.sunday.setDate($scope.wksch.sunday.getDate() + 7);

        $scope.wksch.fromDate = DateParser.generateYYYYMMDD($scope.wksch.monday.getFullYear(), ($scope.wksch.monday.getMonth() + 1), $scope.wksch.monday.getDate());
        $scope.wksch.toDate = DateParser.generateYYYYMMDD($scope.wksch.sunday.getFullYear(), ($scope.wksch.sunday.getMonth() + 1), $scope.wksch.sunday.getDate());

        $scope.wksch.users = fillWithNames();
        $scope.wksch.matrix = fillMatrix();

    }



    function fillWithNames() {

        let tmpArray = [];
        $scope.requests.forEach(function (item, indx) {

            if (tmpArray.indexOf(item.CreatedByName) === -1) {
                tmpArray.push(item.CreatedByName)
            }
        });
        return tmpArray;
    }

    function fillMatrix() {

        let tmpObj = {};
        let dateHandler = new Date($scope.wksch.monday.getFullYear(), $scope.wksch.monday.getMonth(), $scope.wksch.monday.getDate());
        // console.log($scope.wksch.monday);
        let keyDateHandler = "";

        $scope.wksch.users.forEach(function (e) {
            tmpObj[e] = (() => {
                // fill by dates from this week
                let objOfDates = {};
                objOfDates[$scope.wksch.fromDate] = [];
                for (let x = 1; x < 7; x++) {
                    dateHandler.setDate($scope.wksch.monday.getDate() + x); // ?
                    //console.log(dateHandler);
                    keyDateHandler = DateParser.generateYYYYMMDD(dateHandler.getFullYear(), (dateHandler.getMonth() + 1), dateHandler.getDate());
                    objOfDates[keyDateHandler] = [];
                }
                return objOfDates;
            })();
        });

        let isd = "";
        let ied = "";
        $scope.requests.forEach(function (item, indx) {

            if (($scope.preStatuses.indexOf(parseInt(item.Status)) >= 0) || ($scope.calcStatuses.indexOf(parseInt(item.Status)) >= 0)) {

                isd = item.StartDate.replace("T", " ").replace("Z", "");
                ied = item.EndDate.replace("T", " ").replace("Z", "");
                // console.log(isd);
                // console.log( DateParser.dateFromYYYYMMDD_TTMM(isd) );
                let d1 = DateParser.dateFromYYYYMMDD_TTMM(isd);
                let d2 = DateParser.dateFromYYYYMMDD_TTMM(ied);

                isd = DateParser.generateYYYYMMDD(d1.getFullYear(), (d1.getMonth() + 1), d1.getDate());
                ied = DateParser.generateYYYYMMDD(d2.getFullYear(), (d2.getMonth() + 1), d2.getDate());


                //console.log( isd + "     d    " +  ied );


                if (isd === ied) {

                    if (("" + tmpObj[item.CreatedByName][isd]) == 'undefined') {
                        tmpObj[item.CreatedByName][isd] = [];
                    }

                    let tmp1 = ((function (ajdi) {
                        return presenceCodes.filter(function (v) {
                            //console.log(parseInt(ajdi),  parseInt(v.ID));
                            if (parseInt(ajdi) === parseInt(v.ID)) {
                                //console.log(v.Description);
                                // Title
                                // Description
                                return v;
                            }
                        });
                    })(item.RequestCodeSAP));

                    tmpObj[item.CreatedByName][isd].push({
                        Title: tmp1[0],
                        Request: item
                    });

                } else {
                    // big request a couple of days
                    // request is between dates

                    // console.log("else", d1, d2);

                    let tempDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
                    let bBig = false;
                    let strDateArray = [];
                    // ta petla jest odpowiedzialna za kolekcje wszystkich dat w jakich miesci sie dany request
                    // calosc jest bardzo sprytna poniewaz bez wzgledu na dopasowanie tworzy w jsonie sie nowe obiekty na bazie dat yyyy-mm-dd
                    // i wten sposob nastepuje wpis silowy, do ktorego moze sie odniesc html z ng
                    do {
                        //console.log("in loop 1", tempDate);

                        strDateArray.push(DateParser.generateYYYYMMDD(tempDate.getFullYear(), (tempDate.getMonth() + 1), tempDate.getDate()));

                        tempDate.setDate(tempDate.getDate() + 1);

                        let bYear = (tempDate.getFullYear() <= d2.getFullYear());
                        let bMonth = (tempDate.getMonth() <= d2.getMonth());
                        let bDate = (tempDate.getDate() <= d2.getDate());
                        //console.log("B", bYear, bMonth, bDate );
                        bBig = bYear && bMonth && bDate;
                    } while (bBig);


                    // console.log( strDateArray ); // OK

                    strDateArray.forEach(function (isd, indx) {

                        if (("" + tmpObj[item.CreatedByName][isd]) == 'undefined') {
                            tmpObj[item.CreatedByName][isd] = [];
                        }

                        let tmp1 = ((function (ajdi) {
                            return presenceCodes.filter(function (v) {
                                //console.log(parseInt(ajdi),  parseInt(v.ID));
                                if (parseInt(ajdi) === parseInt(v.ID)) {
                                    //console.log(v.Description);
                                    // Title
                                    // Description
                                    return v;
                                }
                            });
                        })(item.RequestCodeSAP));


                        tmpObj[item.CreatedByName][isd].push({
                            Title: tmp1[0],
                            Request: item
                        });
                    });
                }
            }

        });

        // console.log(tmpObj);
        return tmpObj;
    }


});





BulbApp.controller("ConfigRequestCtrl", function ($scope, RequestsService) {

    // zmienna v odpowiada za visible dolnej czesci forma, gdzie mozna modyfikowac harmonogram czasu pracy z perspektywy kolejnych dni
    $scope.v = false;

    $scope.changeSchedule = function () {

        $scope.v = !$scope.v;
        console.log($scope.v);
    };

    $scope.submitNewSchedule = function () {
        // alert("to be implemented");

        // console.log(document.querySelector("#select-time-def").value);
        console.log($scope.cr.getFromTimes(document.querySelector("#select-time-def").value));
        console.log($scope.cr.getFromTimes(document.querySelector("#select-time-mon").value));
        console.log($scope.cr.getFromTimes(document.querySelector("#select-time-tue").value));
        console.log($scope.cr.getFromTimes(document.querySelector("#select-time-wed").value));
        console.log($scope.cr.getFromTimes(document.querySelector("#select-time-thu").value));
        console.log($scope.cr.getFromTimes(document.querySelector("#select-time-fri").value));


        let defAjdi = -1;
        let monAjdi = -1;
        let tueAjdi = -1;
        let wedAjdi = -1;
        let thuAjdi = -1;
        let friAjdi = -1;

        if ($scope.cr.getFromTimes(document.querySelector("#select-time-def").value) != "undef") {
            defAjdi = parseInt(document.querySelector("#select-time-def").value);
        }

        if ($scope.cr.getFromTimes(document.querySelector("#select-time-mon").value) != "undef") {
            monAjdi = parseInt(document.querySelector("#select-time-mon").value);
        }

        if ($scope.cr.getFromTimes(document.querySelector("#select-time-tue").value) != "undef") {
            tueAjdi = parseInt(document.querySelector("#select-time-tue").value);
        }

        if ($scope.cr.getFromTimes(document.querySelector("#select-time-wed").value) != "undef") {
            wedAjdi = parseInt(document.querySelector("#select-time-wed").value);
        }

        if ($scope.cr.getFromTimes(document.querySelector("#select-time-thu").value) != "undef") {
            thuAjdi = parseInt(document.querySelector("#select-time-thu").value);
        }

        if ($scope.cr.getFromTimes(document.querySelector("#select-time-fri").value) != "undef") {
            friAjdi = parseInt(document.querySelector("#select-time-fri").value);
        }


        let arr = [
            defAjdi,
            monAjdi,
            tueAjdi,
            wedAjdi,
            thuAjdi,
            friAjdi
        ];

        console.log(arr);
        alert(arr.toString());

    }

    $scope.cr = {};
    $scope.cr.title = "Konfiguruj swoje ustawienia.";

    /*
    <li class="defualt-schedule">{{cr.defSchedule}}</li>
    <li class="mon-schedule">{{cr.monSchedule}}</li>
    <li class="tue-schedule">{{cr.tueSchedule}}</li>
    <li class="wed-schedule">{{cr.wedSchedule}}</li>
    <li class="thu-schedule">{{cr.thuSchedule}}</li>
    <li class="fri-schedule">{{cr.friSchedule}}</li>
    */

    $scope.cr.defSchedule = currentUserSP.defaultScheduleID;

    $scope.cr.monSchedule = currentUserSP.MondayScheduleID;
    $scope.cr.tueSchedule = currentUserSP.TuesdayScheduleID;
    $scope.cr.wedSchedule = currentUserSP.WednesdayScheduleID;
    $scope.cr.thuSchedule = currentUserSP.ThursdayScheduleID;
    $scope.cr.friSchedule = currentUserSP.FridayScheduleID;

    $scope.cr.approver = currentUserSP.ApproverID;

    $scope.cr.tt = times;

    $scope.cr.getFromTimes = function (ajdi) {


        let h = "undef";

        //console.log(times[0]);
        times.forEach(function (el, i) {
            if (ajdi == el.ID) {
                // console.log(el);
                // console.log(el.Start + " - " + el.End);

                h = (el.Start + " - " + el.End);
            }
        });


        return h;
    };

});




BulbApp.controller("AddTicketRequestCtrl", function ($scope, RequestsService) {
    $scope.tr = {};
    $scope.tr.title = "Dodaj nowy wniosek";
    $scope.tr.body = "Wystaw ticket do administratora.";

    $scope.tr.rr = $scope.requests;
    $scope.tr.times = times;
    $scope.tr.you = RequestsService.getYouObj();
    
    // special request
    
    $scope.tr.srr = [];
    $scope.tr.rr.forEach( function(item) {
    	$scope.tr.srr.push({
    		ID: item.ID,
    		d1: ("" + item.StartDate).replace("T", " ").replace(":00Z", ""),
    		d2: ("" + item.EndDate).replace("T", " ").replace(":00Z", ""),
    		nm: "" + findSapDescFromId(parseInt(item.RequestCodeSAP))[0].Description
    	});
    	
    	
    	// console.log( findSapDescFromId(parseInt(item.RequestCodeSAP)) ); // [{}] ?
    });
    
    /*
    $scope.tr.rr.forEach( function(item) {
    	$scope.tr.srr.push({
    		'ID': item.ID,
    		'text': "ID: " + item.ID + 
    		", status: " + item.Status + ", " + 
    		("" + item.StartDate).replace("T", " ").replace(":00Z", "") + 
    		" - " + ("" + item.EndDate)..replace("T", " ").replace(":00Z", "")
    	});
    } );
    */
    
    // console.log($scope.tr.srr);

    $scope.wyslijTicket = function () {
        let obj = {};
        obj.Title = "TR";
        obj.Description = "ID: " + $scope.TicketRequest + ", ";
        obj.Description += $scope.TicketText;
        let zero = outerAddSpecialRequest(obj);
    };
});

BulbApp.controller("AddSpecialRequestCtrl", function ($scope, RequestsService) {
    $scope.sr = {};
    $scope.sr.title = "Dodaj nowy wniosek";
    $scope.sr.body = "Wystaw wniosek specjalny (niestandardowa usługa) do administratora.";

    //$scope.sr.requests = $scope.requests;
    //$scope.sr.times = RequestsService.getTimesArr();
    //$scope.sr.you = RequestsService.getYouObj();

    $scope.wyslijSpecialWniosekDoAkceptacji = function () {
        // alert("special request");
        // let desc = document.getElementById("new-request-textarea-reason");
        let obj = {};
        //obj.Description = desc.value; // nok
        //console.log(obj);
        //console.log($scope.SRText);
        obj.Title = "SR";
        obj.Description = $scope.SRText;
        let zero = outerAddSpecialRequest(obj);
    };
});






BulbApp.controller("ModalFromCalendarCtrl", function ($scope, RequestsService) {

    $scope.mfc = {};
    $scope.mfc.title = "Wnioski";
    $scope.mfc.body = "";
    $scope.mfc.pp = presenceCodes;
    $scope.mfc.ss = statuses;

    // $scope.mfc.arr = RequestsService.getArr();
    // $scope.mfc.arr = $scope.requests;
    
    
    $scope.getDateFromThisModal = function() {
    
    	/*
    		ta funkcja jest odpowiedzialna za przeslanie daty wybranej z kalendarza
    		do tego modalu oraz do przeslania jej dalej do innego kontrolera tj.
    		tak, aby mozna bylo wystawic nowy wniosek bez koniecznosci kolejny raz 
    		wpisywania tej daty w modalu finalnym
    		po krotce - przekazywanie daty pomiedzy kolejnymi modalami...
    	*/
    
    	let strd = document.getElementsByClassName("list-for-modal-from-caledar-day")[0];
    	let innerNext =  strd.getElementsByTagName("b")[0];
    	let rawStr = innerNext.innerHTML;
    	let prsdDate = rawStr.split(": ")[1];
    	
    	console.log("passed date: " + prsdDate);
    	// console.log( $scope.strDateFromCalendar ); // OK
    	$scope.strDateFromCalendar = prsdDate; 
    	globalDateFromCalendar = prsdDate;
    	//console.log( " $scope.strDateFromCalendar: " , $scope.strDateFromCalendar ); // OK
    	// $scope.apply(); // NOK
    	
    	// !!!
    	// http://jsfiddle.net/YFbC2/
    	// global vendor var
    	/*
		$scope.$watch(
			function(){ 
				return Service.getNumber();
			}, 
			function (value) {
		        $scope.number = value;
		    }
		);
		
		function ControllerOne($scope, Service) {
		    $scope.setNumber = Service.setNumber;
		}
		
    	*/
    	
    	// ale ostateczenie z perspektywy tego modala sytuacja jest skrajnie prosta
    	// wystarczy przekazac zmienna do posrednika factory tj. RequestsService
    	console.log("data przekazywana z modalu posredniego, z kalendarza: " + prsdDate);
    	RequestsService.setStrDate(prsdDate);
    	
    	
    	
    }


    $scope.setEditedRequest = function () {

        let $radia = $(".list-for-modal-from-caledar-day").find("input");
        for (let i = 0; i < $radia.length; i++) {
            // console.log($radia[i].checked + " " + $radia[i].value);

            if ($radia[i].checked) {
                $scope.editedRequest = getRequestById($radia[i].value);
                break;
            }
        }

        if ($scope.editedRequest == null) {
            alert("You can not edit this request!");

            $("#input-edatetimepicker1").val("");
            $("#input-edatetimepicker2").val("");

            $("#edit-req-ctrl-label").html("Nie ma czego edytować!");
        } else {


            // console.log($scope.editedRequest); // OK!
            let arg = $scope.editedRequest;
            let rid = arg.ID
            let status = arg.Status;
            let code = arg.RequestCodeSAP;
            let start = arg.StartDate;
            let koniec = arg.EndDate;
            
            
            //console.log("jestem przed przypisaniem danych do final edit form");
            //console.log(typeof start); // string
            //console.log(start); // 
            //console.log(typeof koniec);
            //console.log(koniec);
            /*
			jestem przed przypisaniem danych do final edit form
			app.js:866 string
			app.js:867 2018-11-06T06:25:00Z
			app.js:868 string
			app.js:869 2018-11-06T14:35:00Z

            */
            // hint:
            // let mm = $scope.strDateFromCalendar.substr(5,2);
            // let dGetDate = $scope.strDateFromCalendar.substr(8,2);
            // let yyyy = $scope.strDateFromCalendar.substr(0,4);
            
            let start_yyyy = start.substr(0,4);
            let start_m = start.substr(5,2);
            let start_d = start.substr(8,2);
            let start_h = start.substr(11,2);
            let start_min = start.substr(14,2);
            
            let koniec_yyyy = koniec.substr(0,4);
            let koniec_m = koniec.substr(5,2);
            let koniec_d = koniec.substr(8,2);
            let koniec_h = koniec.substr(11,2);
            let koniec_min = koniec.substr(14,2);


            

            $("#input-edatetimepicker1").val(start.replace("T", " ").replace(":00Z", ""));
            $("#input-edatetimepicker2").val(koniec.replace("T", " ").replace(":00Z", ""));

            let codeID = function (c) {
                for (let i = 0; i < $scope.mfc.pp.length; i++) {

                    // console.log(c + " " + $scope.aa.pp[i].ID);
                    if (c == $scope.mfc.pp[i].ID) {
                        return ($scope.mfc.pp[i].Description);
                    }
                }
            }(code);

            let strStatus = function (st) {
                for (let i = 0; i < $scope.mfc.ss.length; i++) {
                    if (st == $scope.mfc.ss[i].ID) {
                        return ($scope.mfc.ss[i].Status);
                    }
                }
            }(status);

            // console.log(codeID);
            //$("#e-select-request-type").val(codeID);
            // $scope.forSelected = codeID;

            $("#edit-req-ctrl-label").html("Wniosek #: " + rid + ", " + codeID + ", status: " + strStatus);
        }




    }


    getRequestById = function (ajdi) {

        let r = null;

        $scope.requests.forEach(function (el) {
            if (el.ID == ajdi) {
                r = el;
            }
        });

        return r;
    }
});