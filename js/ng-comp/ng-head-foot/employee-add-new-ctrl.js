BulbApp.controller("AddNewRequestCtrl", function ($scope, RequestsService) {


	// console.log("Ctrl AddNewRequestCtrl.");
	
	
	
	
	$scope.$watch( function() {
		return RequestsService.getStrDate();
	}, function(value) {
		
		
		// OK!
		console.log( "Ctrl AddNewRequestCtrl. date: " + value);
		globalDateFromCalendar = value;
		
	});

	

    $scope.nr = {};
    $scope.nr.title = "Dodaj nowy wniosek";
    $scope.nr.body = "Uzupełnij poniższy formularz w prawidłowy sposób, następnie wyślij wniosek do swojego przełożonego do zaakceptowania.";

    $scope.nr.requests = $scope.requests;
    $scope.nr.you = RequestsService.getYouObj();
    
    
    $scope.nr.howManyHoursToChange = 1.0;
    $scope.setToOneAgain = function() {
    	$scope.nr.howManyHoursToChange = 1.0;    	
    	dopasujNoweGodzinyStartKoniec(false);
    }
    
    $scope.nr.howManyDaysToChange = 0.0;
    $scope.setToOneDayAgain = function() {
    	$scope.nr.howManyDaysToChange = 0.0;
    	dopasujNoweGodzinyStartKoniec(true);
    }

    
    // domyslnie: 2 dla std liczenia po czasie pracy (druga data)
    // opcja: 1 dla liczenia od pierwszej daty zaczynamy prace przed harmonogramem lub wybieramy nadgodziny z rana
    $scope.nr.czyOdCzyDo = 2;
    $scope.nr.koniecCzyPoczatekCzasuPracy = "Zmień godzinę końca czasu pracy";
    // a to jest handler do tej zmiennej powyzej
    $scope.switchControlsOnDates = function() {
    	// console.log("rfsh how many hours!");
    	if( $scope.nr.czyOdCzyDo == 2 ) {
    		$scope.nr.czyOdCzyDo = 1;
    		$scope.nr.koniecCzyPoczatekCzasuPracy = "Zmień godzinę początku czasu pracy";
    	} else {
    		$scope.nr.czyOdCzyDo = 2;
    		$scope.nr.koniecCzyPoczatekCzasuPracy = "Zmień godzinę końca czasu pracy";
    	}
    	
    	dopasujNoweGodzinyStartKoniec(false);
    }
    


    $scope.nr.times = times;
    $scope.nr.guziki = RequestsService.getButtonNames();
    
    
    let mm = $scope.strDateFromCalendar.substr(5,2);
    let dGetDate = $scope.strDateFromCalendar.substr(8,2);
    let yyyy = $scope.strDateFromCalendar.substr(0,4);
    
    
    
    // ta sekcja jest bardzo bardzo zagadkowa, bo wg ostatnich testow nie dziala w ogole...
    // ???? NOK ????
    if( globalDateFromCalendar != "" ) {
    
    
    	$scope.strDateFromCalendar = globalDateFromCalendar;
    
		mm = globalDateFromCalendar.substr(5,2);
    	dGetDate = globalDateFromCalendar.substr(8,2);
    	yyyy = globalDateFromCalendar.substr(0,4);
    	
    	
    	console.log("if globalDateFromCalendar is not empty: " + globalDateFromCalendar );

    }
    
    
    // scheudle start and end
    // --------------------------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------------------------
    
    // undef!!!
    //console.log("$scope.nr.you");
    ///console.log($scope.nr.you);
    // id: 16 stands for 7:25 - 15:35 - this index can be taken from nr.you later on
    // so here is NOK because index of array is not id as property in element.

    function ktoreID(iy, im, id) {
    
    
    	// console.log(iy,im,id);
    	
    	let numYYYY = parseInt(iy);
    	let numMM = parseInt(im) - 1;
    	let numDGetDate = parseInt(id);
    
        let d = new Date(numYYYY, numMM, numDGetDate).getDay();
        //console.log($scope.strDateFromCalendar);
        //console.log(d);

        let ktoreProperty = "";
        // console.log("D: " + d); // Ok
        switch (d) {
            case 1:
                ktoreProperty = "MondayScheduleID";
                break;
            case 2:
                ktoreProperty = "TuesdayScheduleID";
                break;
            case 3:
                ktoreProperty = "WednesdayScheduleID";
                break;
            case 4:
                ktoreProperty = "ThursdayScheduleID";
                break;
            case 5:
                ktoreProperty = "FridayScheduleID";
                break;
            default:
                ktoreProperty = "defaultScheduleID";
                break;
        }


        let tmp = 0;

        for (let i = 0; i < times.length; i++) {

            if ("" + times[i].ID == "" + $scope.nr.you[ktoreProperty]) {
                //console.log("scope nr you sched id prop: " + $scope.nr.you[ktoreProperty]); // OK
                return [times[i].Start, times[i].End];
            }
        }



    }

    $scope.nr.scheduleStart = ktoreID(yyyy,mm,dGetDate)[0];
    $scope.nr.scheduleEnd = ktoreID(yyyy,mm,dGetDate)[1];

    // --------------------------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------------------------

    
    
    
    // initial timings
    // --------------------------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------------------------
    
    //console.log( "Jestem chwile przed nadaniem zmiennych pod date time pickery: " + addHours("" + yyyy,"" + mm,"" + dGetDate, $scope.nr.scheduleStart, 0) );
    //console.log( "Jestem chwile przed nadaniem zmiennych pod date time pickery: " + addHours("" + yyyy,"" + mm,"" + dGetDate, $scope.nr.scheduleEnd, 0) );
    $scope.dtp1 = "" + addHours("" + yyyy,"" + mm,"" + dGetDate, $scope.nr.scheduleStart, 0);
	$scope.dtp2 = "" + addHours("" + yyyy,"" + mm,"" + dGetDate, $scope.nr.scheduleEnd, 0);

    //document.getElementById("datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
    //document.getElementById("datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
	

    // --------------------------------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------------------------------------



	$scope.updateDateTimePickers = function() {
	
	
		console.log( "updateDateTimePickers: " + $scope.strDateFromCalendar + " or " + globalDateFromCalendar );
	
		let imm = globalDateFromCalendar.substr(5,2);
		let idGetDate = globalDateFromCalendar.substr(8,2);
		let iyyyy = globalDateFromCalendar.substr(0,4);

	
		$scope.nr.scheduleStart = ktoreID(iyyyy, imm, idGetDate)[0];
    	$scope.nr.scheduleEnd = ktoreID(iyyyy, imm, idGetDate)[1];
		
		$scope.dtp1 = "" + addHours("" + iyyyy,"" + imm,"" + idGetDate, $scope.nr.scheduleStart, 0);
		$scope.dtp2 = "" + addHours("" + iyyyy,"" + imm,"" + idGetDate, $scope.nr.scheduleEnd, 0);
		
		//document.getElementById("datetimepicker1").value = "" + addHours(iyyyy, imm, idGetDate, $scope.nr.scheduleStart, 0);
		//document.getElementById("datetimepicker2").value = "" + addHours(iyyyy, imm, idGetDate, $scope.nr.scheduleEnd, 0);



	}
	
	
	
	// to nie jest wykrozystane narazie - jak podlaczyc do input podczas jego zmiany?
	$scope.inputForDateChange = function() {
		console.log("my input for the dates was changed!");
		
		// pattern: 2018-06-27 07:25:00
        let dtp1v = document.getElementById("input-datetimepicker1").value;
        let dtp2v = document.getElementById("input-datetimepicker2").value;
        
        
        console.log( dtp1v, dtp2v );

	}

    


    // SEND!
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.wyslijWniosekDoAkceptacji = function () {

        //console.log("wyslijWniosekDoAkceptacji");

        //console.log(document.getElementById("datetimepicker1").value + ", " + document.getElementById("datetimepicker1").value + ", " + document.getElementById("select-request-type").value);


        // pattern: 2018-06-27 07:25:00
        let dtp1v = document.getElementById("input-datetimepicker1").value;
        let dtp2v = document.getElementById("input-datetimepicker2").value;
        

        let sapId = document.getElementById("select-request-type").value;

        let reqReason = document.getElementById("new-request-textarea-reason").value
        // alert(reqReason);



        if (preValidation(dtp1v, dtp2v, sapId, reqReason)) {


            /* example of Lean object */
            /*
            var testEl = {
            "StartDate": "2018-07-10T00:00:00Z",
            "EndDate": "2018-07-12T00:00:00Z",
            requestName: "Urlop",
            Reason: "some txt to be considered as a request reason"
            }
            */

            // console.log(DateParser.dopasujFormatDoTandZFromYYYYMMDD(dtp1v));
            // addHours(d.getFullYear(), mm, dGetDate, $scope.nr.scheduleStart, G_HOW_MANY_HOURS_NEED_TO_BE_ADDED_TO_BE_INLINE_WITH_SP);
            var tmpLeanObject = {};
            tmpLeanObject.StartDate = DateParser.dateFromYYYYMMDD_TTMM(dtp1v);
            tmpLeanObject.EndDate = DateParser.dateFromYYYYMMDD_TTMM(dtp2v);
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



            tmpLeanObject.requestID = parseInt(sapId);

            if (reqReason == "") {
                tmpLeanObject.Reason = "NEW REQUEST";
            } else {
                tmpLeanObject.Reason = reqReason;
            }



            // now everything is ready to go, but before that it's good to make some extra validation for user if user put proper data
            // but currently this foo is doing by default transparent true - to be implemented later on.
            if (finalFormValidation(tmpLeanObject)) {




                // foo from addItemToSharePoint.js
                // main logic for adding data into the list on SP!
                // -----------------------------------------------------------
                // -----------------------------------------------------------
                let fullObj = outerAddItem(tmpLeanObject);
                // -----------------------------------------------------------
                // -----------------------------------------------------------


                console.log("try to push full Obj: ");
                console.log(fullObj);


                // some moving hours between backend and frontend (new!)
                fullObj = adjustThisFullObjectToBeInlineWithInterface(fullObj);
                //console.log(fullObj);

                $scope.requests.push(fullObj);
                $scope.nr.requests = $scope.requests;
                // $scope.$apply();

                setTimeout(function () {
                    // let d2 = new Date();
                    // console.log(fullObj.StartDate);                    
                    let d2 = DateParser.dateFromTZ(fullObj.StartDate);
                    // console.log(d2);
                    requests = $scope.requests;
                    datePickerHandler.fillWithRequests("myDatePicker", "" + d2.getFullYear(), "" + (d2.getMonth() + 1));
                }, 500);


            } else {
                alert("Wrong data! Please fill your form with proper data");
            }
        } else {
            alert("pre-validation failure! Please fill your form with proper data");
        }

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    let tmp = presenceCodes.filter(function (el) {
        return (el.List == "Yes");
    });

    // console.log(tmp);

    $scope.nr.plans = tmp;
    // jako 120 czyli C891 statycznie - super zle!
    $scope.valformsel = presenceCodes[118];
    $scope.nr.arr = $scope.requests;
    // RequestsService.getArr();
    // $scope.nr.rawString = JSON.stringify(RequestsService.getArr());





    // console.log($scope.nr.plans); // OK


    $scope.isvalid = false;
    
    $scope.dtp1;
    $scope.dtp2;


	// not active currently!
	/*
    $scope.quickButtonClicked = function (arg) {
        //console.log(arg);
        //console.log($scope.nr.plans)



        for (let i = 0; i < $scope.nr.plans.length; i++) {
            if ($scope.nr.plans[i].Description == arg) {

                // console.log($scope.nr.plans[i].ID);
				//$scope.valformsel = $scope.nr.plans[i];
                
                $scope.valformsel = $scope.nr.plans[i];
                console.log($scope.valformsel);
                // document.getElementById("select-request-type").value = parseInt($scope.valformsel.ID);
				//$scope.$apply();
				
				// dalej to nie dziala....
				$("#select-request-type").val(parseInt($scope.valformsel.ID));


				if( globalDateFromCalendar != "" ) {
					$scope.strDateFromCalendar = globalDateFromCalendar;
				}


                
                let mm = $scope.strDateFromCalendar.substr(5,2);
                let dGetDate = $scope.strDateFromCalendar.substr(8,2);
                let yyyy = $scope.strDateFromCalendar.substr(0,4);


                //console.log($scope.nr.scheduleStart);// OK
				//console.log($scope.nr.scheduleEnd);// OK
				
				
				if($scope.nr.czyOdCzyDo == 2) {

	                if ($scope.nr.plans[i].Title == "A100") {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0 * $scope.nr.howManyHoursToChange);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0 * $scope.nr.howManyHoursToChange);
	                } else if ($scope.nr.plans[i].Title == "C891") {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 1 * $scope.nr.howManyHoursToChange);
	                } else if ($scope.nr.plans[i].Title == "A520") {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, (-1) * $scope.nr.howManyHoursToChange);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
	                } else {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
	                }
                
                } else {

	                if ($scope.nr.plans[i].Title == "A100") {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0 );
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0 );
	                } else if ($scope.nr.plans[i].Title == "C891") {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, (-1) * $scope.nr.howManyHoursToChange);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
	                } else if ($scope.nr.plans[i].Title == "A520") {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, (1) * $scope.nr.howManyHoursToChange);
	                } else {
	                    document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
	                    document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
	                }

                }
                
            }
        }
    }
    */
    
    
    $scope.addNewSelectClicked = function() {
    	dopasujNoweGodzinyStartKoniec(false);
    }

    
    // liczenie dla godzin:
    $scope.quickButtonClickedAddHalf1 = function() {
    	console.log("add 0,5h for date 1");
    	
    	$scope.nr.howManyHoursToChange += 0.5;
    	dopasujNoweGodzinyStartKoniec(false);
    }
    
    $scope.quickButtonClickedRemoveHalf1 = function() {
    	console.log("remove 0,5h for date 1");
    	
    	$scope.nr.howManyHoursToChange -= 0.5;
    	
    	if( $scope.nr.howManyHoursToChange <= 0 ) {
    		alert("To nie ma sensu, nie mozna wybrac badz przepracowac ujemnej wartosci!");
    		$scope.nr.howManyHoursToChange = 1.0;
    	}
    	
    	dopasujNoweGodzinyStartKoniec(false);
    }

        
    $scope.quickButtonClickedAdd1 = function() {
    	console.log("add 1h for date 1");
    	
    	$scope.nr.howManyHoursToChange += 1.0;
    	dopasujNoweGodzinyStartKoniec(false);
    }
    
    $scope.quickButtonClickedRemove1 = function() {
    	console.log("remove 1h for date 1");
    	
    	$scope.nr.howManyHoursToChange -= 1.0;
    	
    	if( $scope.nr.howManyHoursToChange <= 0 ) {
    		alert("To nie ma sensu, nie mozna wybrac badz przepracowac ujemnej wartosci!");
    		$scope.nr.howManyHoursToChange = 1.0;
    	}
    	
    	dopasujNoweGodzinyStartKoniec(false);    	
    }
    
    
    // liczenie dla dni:
    $scope.quickButtonClickedAddDay = function() {
    	console.log("add day");
    	
    	$scope.nr.howManyDaysToChange += 1.0;
    	dopasujNoweGodzinyStartKoniec(true);
    }
    
    $scope.quickButtonClickedRemoveDay = function() {
    	console.log("remove day");
    	
    	$scope.nr.howManyDaysToChange -= 1.0;
    	
    	if( $scope.nr.howManyDaysToChange < 0 ) {
    		alert("To nie ma sensu, nie mozna wybrac badz przepracowac ujemnej wartosci!");
    		$scope.nr.howManyDaysToChange = 0.0;
    	}
    	dopasujNoweGodzinyStartKoniec(true);
    }

        
    $scope.quickButtonClickedAddSeven = function() {
    	console.log("add week");
    	
    	$scope.nr.howManyDaysToChange += 7.0;
    	dopasujNoweGodzinyStartKoniec(true);
    }
    
    $scope.quickButtonClickedRemoveSeven = function() {
    	console.log("remove week");
    	
    	$scope.nr.howManyDaysToChange -= 7.0;
    	
    	if( $scope.nr.howManyDaysToChange < 0 ) {
    		alert("To nie ma sensu, nie mozna wybrac badz przepracowac ujemnej wartosci!");
    		$scope.nr.howManyDaysToChange = 0.0;
    	}
    	dopasujNoweGodzinyStartKoniec(true);    	
    }

    
    
    /*
    $scope.quickButtonClickedAddHalf2 = function() {
    	console.log("add 0,5h for date 2");
    	
    	$scope.nr.howManyHoursToChange += 0.5;
    }
    
    $scope.quickButtonClickedRemoveHalf2 = function() {
    	console.log("remove 0,5h for date 2");
    	
    	$scope.nr.howManyHoursToChange -= 0.5;
    }


    
    $scope.quickButtonClickedAdd2 = function() {
    	console.log("add 1h for date 2");
    	
    	$scope.nr.howManyHoursToChange += 1.0;
    }
    
    $scope.quickButtonClickedRemove2 = function() {
    	console.log("remove 1h for date 2");
    	
    	$scope.nr.howManyHoursToChange -= 1.0;
    }
    */
    
    
    
    var dopasujNoweGodzinyStartKoniec = function(b) {
    
    
    	if( b == false ) {
    
			let coWybralemSelectem = presenceCodes.find( function(el) {
	    		if( parseInt(el.ID) == parseInt($scope.valformsel) ) {
	    			return el;
	    		}
	    		
	    	});
	    	
	    	console.log( coWybralemSelectem );
	    	
	    	if( coWybralemSelectem.Title != "undefined" ) {
	    	
		    	if( globalDateFromCalendar != "" ) {
					$scope.strDateFromCalendar = globalDateFromCalendar;
				}
		
		
		        
		        let mm = $scope.strDateFromCalendar.substr(5,2);
		        let dGetDate = $scope.strDateFromCalendar.substr(8,2);
		        let yyyy = $scope.strDateFromCalendar.substr(0,4);		
				
				if($scope.nr.czyOdCzyDo == 2) {
		
			        if (coWybralemSelectem.Title == "A100") {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			        } else if (coWybralemSelectem.Title == "C891") {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 1 * $scope.nr.howManyHoursToChange);
			        } else if (coWybralemSelectem.Title == "A520") {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, (-1) * $scope.nr.howManyHoursToChange);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			        } else {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			        }
				} else {
				
			        if (coWybralemSelectem.Title == "A100") {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			        } else if (coWybralemSelectem.Title == "C891") {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, (-1) * $scope.nr.howManyHoursToChange);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
			        } else if (coWybralemSelectem.Title == "A520") {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, (1) * $scope.nr.howManyHoursToChange);
			        } else {
			            document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
			            document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			        }
		
				}
			}
		} else {
		
		

			let coWybralemSelectem = presenceCodes.find( function(el) {
	    		if( parseInt(el.ID) == parseInt($scope.valformsel) ) {
	    			return el;
	    		}
	    		
	    	});
	    	
	    	console.log( coWybralemSelectem );
	    	
	    	if( coWybralemSelectem.Title != "undefined" ) {
	    	
		    	if( globalDateFromCalendar != "" ) {
					$scope.strDateFromCalendar = globalDateFromCalendar;
				}
		
		
		        
		        let mm = $scope.strDateFromCalendar.substr(5,2);
		        let dGetDate = $scope.strDateFromCalendar.substr(8,2);
		        let yyyy = $scope.strDateFromCalendar.substr(0,4);		
				
				if($scope.nr.czyOdCzyDo == 2) {
			        document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 0);
			        document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleEnd, 24.0 * $scope.nr.howManyDaysToChange);
				} else {
			        document.getElementById("input-datetimepicker1").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, (-1) * 24.0 * $scope.nr.howManyDaysToChange);
			        document.getElementById("input-datetimepicker2").value = "" + addHours(yyyy, mm, dGetDate, $scope.nr.scheduleStart, 0);
				}
			}
		}
    }


    var adjustThisFullObjectToBeInlineWithInterface = function (fullObject) {



        if ((typeof fullObject.StartDate) == "object") {
            // console.log(fullObject.StartDate.getFullYear()); // oK!
            // NOK
            // sd = addHours(sd.getFullYear(), sd.getMonth() + 1, sd.getDate(), sd.getHours() + ":" + sd.getMinutes(), -2);

            let sd = new Date();

            sd.setFullYear(fullObject.StartDate.getFullYear());
            sd.setMonth(fullObject.StartDate.getMonth());
            sd.setDate(fullObject.StartDate.getDate());
            sd.setHours(fullObject.StartDate.getHours() - G_HOW_MANY_HOURS_NEED_TO_BE_ADDED_TO_BE_INLINE_WITH_SP);
            sd.setMinutes(fullObject.StartDate.getMinutes());

            let rawMonth = sd.getMonth() + 1;
            let rawHH = sd.getHours();
            let rawMin = sd.getMinutes();
            let rawDD = sd.getDate();

            let mm = (rawMonth < 10) ? ("0" + rawMonth) : ("" + rawMonth);
            let hh = (rawHH < 10) ? ("0" + rawHH) : ("" + rawHH);
            let min = (rawMin < 10) ? ("0" + rawMin) : ("" + rawMin);
            let dd = (rawDD < 10) ? ("0" + rawDD) : ("" + rawDD);


            // 
            fullObject.StartDate = "" + sd.getFullYear() + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00Z";

            //console.log( arr[i].StartDate );


            // let ed = fullObject.EndDate;
            // ed = addHours(ed.getFullYear(), ed.getMonth() + 1, ed.getDate(), ed.getHours() + ":" + ed.getMinutes(), -2);
            let ed = new Date();

            ed.setFullYear(fullObject.EndDate.getFullYear());
            ed.setMonth(fullObject.EndDate.getMonth());
            ed.setDate(fullObject.EndDate.getDate());
            // super wazne skuli zmian czasowych pomiedzy frontem a sp gdzie inna strefa czasowa!?
            ed.setHours(fullObject.EndDate.getHours() - 2);
            ed.setMinutes(fullObject.EndDate.getMinutes());


            rawMonth = ed.getMonth() + 1;
            rawHH = ed.getHours();
            rawMin = ed.getMinutes();
            rawDD = ed.getDate();

            mm = (rawMonth < 10) ? ("0" + rawMonth) : ("" + rawMonth);
            hh = (rawHH < 10) ? ("0" + rawHH) : ("" + rawHH);
            min = (rawMin < 10) ? ("0" + rawMin) : ("" + rawMin);
            dd = (rawDD < 10) ? ("0" + rawDD) : ("" + rawDD);


            // 
            fullObject.EndDate = "" + ed.getFullYear() + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00Z";

            //console.log( arr[i].EndDate);

        }

        return fullObject;


    }



    // tlo - temp lean object
    var preValidation = function (dtp1v, dtp2v, sapId, reqReason) {


        //console.log(dtp1v);    
        //console.log(dtp2v);
        //console.log(sapId); // ? undefined:undefined ? (if empty)


        let undefPtrn = /undefined/
        let b = undefPtrn.test(sapId);
        b = !b;

        //console.log(typeof dtp1v); // this is string // 2018-09-17 07:25
        //console.log(typeof dtp2v); // this is string
        //console.log(typeof sapId); // this is string // 81 (for example)

        let d1bool = DateParser.checkIfThisDateIsYYYYMMDDspaceHHMM(dtp1v);
        let d2bool = DateParser.checkIfThisDateIsYYYYMMDDspaceHHMM(dtp2v);


        let datesMatchBool = false;
        
        
        
        
        let ovtArr = $scope.overtimeCodes;
        console.log(ovtArr, sapId);
        if (ovtArr.toString().indexOf(sapId) >= 0) {
        	// jesli to ovt to musimy sprawdzic czy przypadkiem nadgodziny diff between
        }
        

        
        

        if (d1bool && d2bool) {
            datesMatchBool = DateParser.checkIfThose2DatesAreInOrder(dtp1v, dtp2v);
        }

        return b && d1bool && d2bool && datesMatchBool;
    }

    var finalFormValidation = function (tlo) {

        // temp always OK
        return true;
    }

});
