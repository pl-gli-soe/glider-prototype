BulbApp.controller("SummaryCtrl", function ($scope) {

    $scope.s = {};
    $scope.s.title = "Podsumowanie";

    $scope.rep = {};
    $scope.rep.currentMonthOvertime = 0;
    $scope.rep.currentOkresOvertime = 0;
    $scope.rep.currentOvertime = 0;
    $scope.rep.currentHomeOffice = 0;
    $scope.rep.holidays = 0;
    $scope.rep.currMonthHolidays = 0;
    
    $scope.rep.currentPreMonthOvertime = 0;
    $scope.rep.currentPreOkresOvertime = 0;
    $scope.rep.currentPreOvertime = 0;
    $scope.rep.currentPreHomeOffice = 0;
    $scope.rep.preHolidays = 0;
    $scope.rep.currPreMonthHolidays = 0;
    
    
    $scope.rep.opiekaH = 0;
    $scope.rep.opiekaD = 0;


    $scope.rep.rr = $scope.requests;
    $scope.rep.pc = presenceCodes;

    $scope.covertCodeToSAPCode = function (code) {
        let t = "";

        for (let i = 0; i < $scope.rep.pc.length; i++) {

            let item = $scope.rep.pc[i];

            //console.log(item.plan + " =? " + code); // now it is OK
            if (item.ID == code) {
                t = item.Title;
                break;
            }
        }
        return t;
    };

    $scope.covertCodeToDescription = function (code) {
        let desc = "";

        for (let i = 0; i < $scope.rep.pc.length; i++) {

            let item = $scope.rep.pc[i];

            //console.log(item.plan + " =? " + code); // now it is OK
            if (item.ID == code) {
                desc = item.Description;
                break;
            }
        }
        return desc;
    };


    let ovtArr = $scope.overtimeCodes;
    let homeOfficeCode = $scope.hoCode;
    let opiekaHCode = $scope.opieka[0];
    let opiekaDCode = $scope.opieka[1];
    let urlopikode = $scope.urlopCode;




    let d = new Date();
    let currMonth = d.getMonth(); // counted from zero
    let currYear = d.getFullYear(); // real year
    let currDate = d.getDate(); // real day

    let strCurrMonth = ((currMonth + 1) < 10) ? "0" + (currMonth + 1) : "" + (currMonth + 1);
    let strCurrDate = ((currDate) < 10) ? "0" + (currDate) : "" + (currDate);


    let arrOkresRozliczeniowy = DateParser.okresRozliczeniowy("" + currYear + "-" + strCurrMonth + "-" + strCurrDate)
    

    let ovtSummary = [0, 0];
    let ovtCurrOkresSummary = [0, 0];
    let ovtCurrMonthSummary = [0, 0];

    $scope.rep.rr.forEach(function (el, i, arr) {
        //console.log(el.StartDate);
        
        if (calcStatuses.indexOf(parseInt(el.Status)) >= 0) {
        
        
        	if ( homeOfficeCode  == el.RequestCodeSAP ) {
        	
	        	if (DateParser.sprawdzCzyCurrMonth(d.getMonth(), el.StartDate, el.EndDate)) {
	        	
	        		// HO counter
	        		// ta funkcja zwraca tablice [dni, godziny, minuty]
	        		let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
	        		
	        		// zakladam, ze jesli roznicy w dacie nie ma to znaczy ze HO jest na jeden dzien tylko
	        		// inaczej zakladam ze to jest +1
	        		$scope.rep.currentHomeOffice += (diffArr[0] + 1);
				}
        	}
        	
        	if ( urlopikode  == el.RequestCodeSAP ) {
        	
        		let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
        		$scope.rep.holidays += (diffArr[0] + 1);
        	
	        	if (DateParser.sprawdzCzyCurrMonth(d.getMonth(), el.StartDate, el.EndDate)) {
	        		$scope.rep.currMonthHolidays += (diffArr[0] + 1);
				}
        	}


	        if (ovtArr.toString().indexOf(el.RequestCodeSAP) >= 0) {
	            //console.log(ovtArr.toString().indexOf(el.RequestCodeSAP));
	            // console.log(el.RequestCodeSAP); // OK!
	            //console.log(ovtArr.toString());
	            //console.log(el);
	
	            // tutaj w tym body od if znajduja sie tylko te requesty ktore moga brac udzial z zabawie przeliczania overtime'u do wybrania
	            // ---------------------------------------------------------------------------------------------------------------------------
	            //console.log(el.RequestCodeSAP + " " + $scope.covertCodeToSAPCode(el.RequestCodeSAP) + " " + el.ID);
	            //console.log(el.StartDate + " " + el.EndDate);
	            let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
	            // console.log(diffArr);
	
	
	            // 115 -> A520
	            if (el.RequestCodeSAP == 115) {
	            	ovtSummary[0] -= 24 * diffArr[0];
	                ovtSummary[0] -= diffArr[1];
	                ovtSummary[1] -= diffArr[2];
	            } else {
	            	ovtSummary[0] += 24 * diffArr[0];
	                ovtSummary[0] += diffArr[1];
	                ovtSummary[1] += diffArr[2];
	            }
	
	
	
	            if (DateParser.sprawdzCzyCurrMonth(d.getMonth(), el.StartDate, el.EndDate)) {
	
	                // A520
	                if (el.RequestCodeSAP == 115) {
	                	ovtCurrMonthSummary[0] -= 24 * diffArr[0];
	                    ovtCurrMonthSummary[0] -= diffArr[1];
	                    ovtCurrMonthSummary[1] -= diffArr[2];
	                } else {
	                	ovtCurrMonthSummary[0] += 24 * diffArr[0];
	                    ovtCurrMonthSummary[0] += diffArr[1];
	                    ovtCurrMonthSummary[1] += diffArr[2];
	                }
	
	            }
	
	
	            if (DateParser.sprawdzCzyCurrOkres(arrOkresRozliczeniowy, el.StartDate, el.EndDate)) {
	
	                // A520
	                if (el.RequestCodeSAP == 115) {
	                	ovtCurrOkresSummary[0] -= 24 * diffArr[0];
	                    ovtCurrOkresSummary[0] -= diffArr[1];
	                    ovtCurrOkresSummary[1] -= diffArr[2];
	                } else {
	                	ovtCurrOkresSummary[0] += 24 * diffArr[0];
	                    ovtCurrOkresSummary[0] += diffArr[1];
	                    ovtCurrOkresSummary[1] += diffArr[2];
	                }
	
	            }
	
	            // ---------------------------------------------------------------------------------------------------------------------------
	        }
        }
    });


    while (ovtSummary[1] >= 60) {
        ovtSummary[1] -= 60;
        ovtSummary[0]++;
    }

    while (ovtCurrMonthSummary[1] >= 60) {
        ovtCurrMonthSummary[1] -= 60;
        ovtCurrMonthSummary[0]++;
    }

    while (ovtCurrOkresSummary[1] >= 60) {
        ovtCurrOkresSummary[1] -= 60;
        ovtCurrOkresSummary[0]++;
    }

    // console.log(ovtCurrMonthSummary);


    $scope.rep.currentMonthOvertime = "" + ovtCurrMonthSummary[0] + ":" + ovtCurrMonthSummary[1] + "";
    $scope.rep.currentOkresOvertime = "" + ovtCurrOkresSummary[0] + ":" + ovtCurrOkresSummary[1] + "";
    $scope.rep.currentOvertime = "" + ovtSummary[0] + ":" + ovtSummary[1] + "";
    // HO jest podliczane od razu w petli
    // nie uwzgledniamy opieki (liczymy tylko wszystko niezaleznie od approvalu)
    
    
    
	let ovtPreSummary = [0, 0];
    let ovtPreCurrOkresSummary = [0, 0];
    let ovtPreCurrMonthSummary = [0, 0];
    let tempOpiekaH = [0,0];

    $scope.rep.rr.forEach(function (el, i, arr) {
        //console.log(el.StartDate);
        
        if ((calcStatuses.indexOf(parseInt(el.Status)) >= 0) || (preStatuses.indexOf(parseInt(el.Status)) >= 0)) {
        
        
        
        	if ( homeOfficeCode  == el.RequestCodeSAP ) {
        	
        	
        		if (DateParser.sprawdzCzyCurrMonth(d.getMonth(), el.StartDate, el.EndDate)) {
	        		// HO counter
	        		// ta funkcja zwraca tablice [dni, godziny, minuty]
	        		let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
	        		
	        		// zakladam, ze jesli roznicy w dacie nie ma to znaczy ze HO jest na jeden dzien tylko
	        		// inaczej zakladam ze to jest +1
	        		$scope.rep.currentPreHomeOffice += (diffArr[0] + 1);
	        	}

        	}
        	
        	
        	if ( urlopikode  == el.RequestCodeSAP ) {
        	
        		let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
        		$scope.rep.preHolidays += (diffArr[0] + 1);
        	
	        	if (DateParser.sprawdzCzyCurrMonth(d.getMonth(), el.StartDate, el.EndDate)) {
	        		$scope.rep.currPreMonthHolidays += (diffArr[0] + 1);
				}
        	}
        	
			if ( opiekaHCode  == el.RequestCodeSAP ) {
        	
        		let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
        		//$scope.rep.opiekaH += (diffArr[1]); // nie jest dokladne
                tempOpiekaH[0] += diffArr[1];
                tempOpiekaH[1] += diffArr[2];

        	}
        	
			if ( opiekaDCode  == el.RequestCodeSAP ) {
        	
        		let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
        		$scope.rep.opiekaD += (diffArr[0] + 1);
        	}





	        if (ovtArr.toString().indexOf(el.RequestCodeSAP) >= 0) {
	            //console.log(ovtArr.toString().indexOf(el.RequestCodeSAP));
	            // console.log(el.RequestCodeSAP); // OK!
	            //console.log(ovtArr.toString());
	            //console.log(el);
	
	            // tutaj w tym body od if znajduja sie tylko te requesty ktore moga brac udzial z zabawie przeliczania overtime'u do wybrania
	            // ---------------------------------------------------------------------------------------------------------------------------
	            //console.log(el.RequestCodeSAP + " " + $scope.covertCodeToSAPCode(el.RequestCodeSAP) + " " + el.ID);
	            //console.log(el.StartDate + " " + el.EndDate);
	            let diffArr = DateParser.differenceBetweenDatesWithTZFormat(el.StartDate, el.EndDate);
	            //console.log(diffArr);
	
	
	            // 115 -> A520
	            if (el.RequestCodeSAP == 115) {
	            	ovtPreSummary[0] -= 24 * diffArr[0];
	                ovtPreSummary[0] -= diffArr[1];
	                ovtPreSummary[1] -= diffArr[2];
	            } else {
	            	ovtPreSummary[0] += 24 * diffArr[0];
	                ovtPreSummary[0] += diffArr[1];
	                ovtPreSummary[1] += diffArr[2];
	            }
	
	
	
	            if (DateParser.sprawdzCzyCurrMonth(d.getMonth(), el.StartDate, el.EndDate)) {
	
	                // A520
	                if (el.RequestCodeSAP == 115) {
	                	ovtPreCurrMonthSummary[0] -= 24 * diffArr[0];
	                    ovtPreCurrMonthSummary[0] -= diffArr[1];
	                    ovtPreCurrMonthSummary[1] -= diffArr[2];
	                } else {
	                	ovtPreCurrMonthSummary[0] += 24 * diffArr[0];
	                    ovtPreCurrMonthSummary[0] += diffArr[1];
	                    ovtPreCurrMonthSummary[1] += diffArr[2];
	                }
	
	            }
	
	
	            if (DateParser.sprawdzCzyCurrOkres(arrOkresRozliczeniowy, el.StartDate, el.EndDate)) {
	
	                // A520
	                if (el.RequestCodeSAP == 115) {
	                	ovtPreCurrOkresSummary[0] -= 24 * diffArr[0];
	                    ovtPreCurrOkresSummary[0] -= diffArr[1];
	                    ovtPreCurrOkresSummary[1] -= diffArr[2];
	                } else {
	                	ovtPreCurrOkresSummary[0] += 24 * diffArr[0];
	                    ovtPreCurrOkresSummary[0] += diffArr[1];
	                    ovtPreCurrOkresSummary[1] += diffArr[2];
	                }
	
	            }
	
	            // ---------------------------------------------------------------------------------------------------------------------------
	        }
        }
    });


    while (ovtPreSummary[1] >= 60) {
        ovtPreSummary[1] -= 60;
        ovtPreSummary[0]++;
    }

    while (ovtPreCurrMonthSummary[1] >= 60) {
        ovtPreCurrMonthSummary[1] -= 60;
        ovtPreCurrMonthSummary[0]++;
    }

    while (ovtPreCurrOkresSummary[1] >= 60) {
        ovtPreCurrOkresSummary[1] -= 60;
        ovtPreCurrOkresSummary[0]++;
    }

    // console.log(ovtCurrMonthSummary);


    $scope.rep.currentPreMonthOvertime = "" + ovtPreCurrMonthSummary[0] + ":" + ovtPreCurrMonthSummary[1] + "";
    $scope.rep.currentPreOkresOvertime = "" + ovtPreCurrOkresSummary[0] + ":" + ovtPreCurrOkresSummary[1] + "";
    $scope.rep.currentPreOvertime = "" + ovtPreSummary[0] + ":" + ovtPreSummary[1] + "";
    // HO jest podliczane od razu w petli
	$scope.rep.opiekaH = "" + tempOpiekaH[0] + ":" + tempOpiekaH[1] + "";
    
    

});
