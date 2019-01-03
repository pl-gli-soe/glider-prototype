var datePickerHandler = {

    y: "",
    m: "",


    dayNamesMinArr: ['Nd', 'Pn', 'Wt', 'Sr', 'Cz', 'Pt', 'So'],
    monthNamesArr: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    monthNamesShortArr: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],


    generateDatePicker: function (datePickerId, yyyy, mm) {


        //console.log(yyyy);
        //console.log(mm);


        var newDate = "" + yyyy + "-" + mm + "-01";
        // console.log(newDate);


        $("#" + datePickerId).datepicker({
            firstDay: 1,
            dayNamesMin: datePickerHandler.dayNamesMinArr,
            monthNames: datePickerHandler.monthNamesArr,
            monthNamesShort: datePickerHandler.monthNamesArr,
            stepMonths: 0,
            duration: '',
            changeMonth: true,
            changeYear: true,
            showAnim: "slide",
            numberOfMonths: 1,
            defaultDate: "" + yyyy + "-" + mm + "-01",
            showAnim: "slide",
            dateFormat: "yy-mm-dd",
            onSelect: function (d4) {
                // var tmpTxt = "d_" + d4.replace("-", "").replace("-", "");
                // alert(tmpTxt);

                $("#modal-from-calendar").modal('show');

                let $list = $(".list-for-modal-from-caledar-day").first();

                //console.log($list.html());
                $list.html("<b>Lista wniosków z dnia: " + d4 + "</b>: <br><br>" + datePickerHandler.generujListeUlLi(d4));

                datePickerHandler.y = d4.substr(0, 4);
                datePickerHandler.m = d4.substr(5, 2);

                //alert(datePickerHandler.y + " " + datePickerHandler.m);
                setTimeout(datePickerHandler.f, 200);

            },
            onChangeMonthYear: function (ych, mch) {
                // console.log(ych + " " + mch);

                // let arr = JSON.parse(document.getElementById("requests").innerHTML);
                /*
                console.log(arr);
                for (let i = 0; i < arr.length; i++) {
                    console.log(arr[i]);
                }
                */
                //datePickerHandler.fillWithRequests("myDatePicker", "" + ych, "" + mch);

                /*
                    sprawdz run z obsuwa czasowa, moze kurla musi sie najpierw zaladowac do cholery nie wiem...
                */
                datePickerHandler.y = ych;
                datePickerHandler.m = mch;

                setTimeout(datePickerHandler.f, 200);


            }
        });


    },

    generujListeUlLi: function (d) {
        // alert(d);

        // return "<ul><li>Brak elementów do wyświetlenia...</li></ul>";

        let outputText = "";


        /*
        StartDate
        EndDate
        2018-06-13T13:35:00Z
        ID = 17
        InternalID - mniej interere narazie
        RequestCodeSAP - numerek - fajnie by bylo przerobic na nazwe
        */
        //console.log(requests[0]); 
        //console.log(d); // yyyy-mm-dd


        let visibleArrayFiltered = requests.filter(function (element) {
            let b = false;

            let strD1 = element.StartDate.substr(0, 10);
            let strD2 = element.EndDate.substr(0, 10);

            //console.log(strStartDateYYYYMMDD);
            //console.log(strEndDateYYYYMMDD);



            // mam watpliwosci co do tego....
            let currDate = new Date(d.substr(0, 4), d.substr(5, 2), d.substr(8, 2));
            let d1 = new Date(strD1.substr(0, 4), strD1.substr(5, 2), strD1.substr(8, 2));
            let d2 = new Date(strD2.substr(0, 4), strD2.substr(5, 2), strD2.substr(8, 2));


            //console.log(d.substr(0, 4)); // OK
            //console.log(d.substr(5, 2)); // OK
            //console.log(d.substr(8, 2)); // OK

            return (d1 <= currDate && d2 >= currDate);
        });


        // outputText = "" + visibleArrayFiltered.join();
        visibleArrayFiltered.forEach(function (el, i, arr) {
        
        	if (visibleStatuses.indexOf(parseInt(el.Status)) >= 0) {
        
	            outputText += "<div class=\"edit-item\"><input name=\"lista\" type=\"radio\" value=\"" + el.ID + "\" checked>" +
	                " >> ID: " + el.ID + ", " + datePickerHandler.ktoryToPresenceCode(el.RequestCodeSAP) +
	                ", status: " + statuses[datePickerHandler.getStatus(el.Status)].Status +
	                "</div><br>";
                
			}
        });



        outputText = "<form><fieldset>" + outputText + "</fieldset></form>";

        return outputText;
    },

    findArrOfHours: function (schedID) {

        //console.log(times[16]);

        for (let i = 0; i < times.length; i++) {

            if (schedID == times[i].ID) {
                return [times[i].Start, times[i].End];
            }
        }
    },

    getStatus: function (indxForStatus) {


        // return 9;


        var num = 9;

        for (let i = 0; i < statuses.length; i++) {



            if (indxForStatus == statuses[i].ID) {
                num = i;
                break;
            }
        }

        return num;

    },

    f: function () {
        datePickerHandler.fillWithRequests("myDatePicker", datePickerHandler.y, datePickerHandler.m);
    },

    fillWithRequests: function (datePickerId, yyyy, mm) {


        //console.log("filling this datepicker with requests for: year: " + yyyy + ", month: " + mm + "!");

        // console.log(presenceCodes); // OK!


        //let arr = JSON.parse(document.getElementById("requests").innerHTML);
        let arr = requests;
        // console.log(arr);
        //console.log(arr[0]);
        //alert("wait!");


        // try wydaje sie narazie zbedne
        //let trs = document.getElementById(datePickerId).getElementsByClassName("tr");
        let tds = document.getElementById(datePickerId).getElementsByTagName("td");
        let tdsCount = tds.length;

        //console.log(currentUserSP); // OK

        let monSched_ID = currentUserSP.MondayScheduleID;
        let tueSched_ID = currentUserSP.TuesdayScheduleID;
        let wedSched_ID = currentUserSP.WednesdayScheduleID;
        let thuSched_ID = currentUserSP.ThursdayScheduleID;
        let friSched_ID = currentUserSP.FridayScheduleID;

        let defSched_ID = currentUserSP.defaultScheduleID;

        //console.log(times);

        let planMon = datePickerHandler.findArrOfHours(monSched_ID);
        let planTue = datePickerHandler.findArrOfHours(tueSched_ID);
        let planWed = datePickerHandler.findArrOfHours(wedSched_ID);
        let planThu = datePickerHandler.findArrOfHours(thuSched_ID);
        let planFri = datePickerHandler.findArrOfHours(friSched_ID);

        let planDef = datePickerHandler.findArrOfHours(defSched_ID);
        //console.log(planMon); // OK


		// some check on national holidays from Sp list
		// console.log(nationalHolidays);
		
		let nationalHolidaysForThisMonth = datePickerHandler.getNationalHolidaysStringYYYYMMDDDateFor(yyyy,mm);
		//console.log( nationalHolidaysForThisMonth  ); // really OK!



        //console.log(tds); //niby OK
        for (let i = 0; i < tdsCount; i++) {

            let $a = $(tds.item(i).firstChild);
            // console.log($a.html()); // get inner HTML from anchor


			// this if statement give us an control on boxes without dates - no more strange graphs
			if(!isNaN($a.html())) {


	            let iter = 0;
	            for (let i = 0; i < arr.length; i++) {
	
	                if ((typeof arr[i].StartDate) == "object") {
	                    // console.log(arr[i].StartDate.getFullYear()); // oK!
	                    let rawMonth = arr[i].StartDate.getMonth() + 1;
	                    let rawHH = arr[i].StartDate.getHours();
	                    let rawMin = arr[i].StartDate.getMinutes();
	                    let rawDD = arr[i].StartDate.getDate();
	
	                    let mm = (rawMonth < 10) ? ("0" + rawMonth) : ("" + rawMonth);
	                    let hh = (rawHH < 10) ? ("0" + rawHH) : ("" + rawHH);
	                    let min = (rawMin < 10) ? ("0" + rawMin) : ("" + rawMin);
	                    let dd = (rawDD < 10) ? ("0" + rawDD) : ("" + rawDD);
	
	
	                    // 
	                    arr[i].StartDate = "" + arr[i].StartDate.getFullYear() + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00Z";
	
	                    //console.log( arr[i].StartDate );
	
	
	                    rawMonth = arr[i].EndDate.getMonth() + 1;
	                    rawHH = arr[i].EndDate.getHours();
	                    rawMin = arr[i].EndDate.getMinutes();
	                    rawDD = arr[i].EndDate.getDate();
	
	                    mm = (rawMonth < 10) ? ("0" + rawMonth) : ("" + rawMonth);
	                    hh = (rawHH < 10) ? ("0" + rawHH) : ("" + rawHH);
	                    min = (rawMin < 10) ? ("0" + rawMin) : ("" + rawMin);
	                    dd = (rawDD < 10) ? ("0" + rawDD) : ("" + rawDD);
	
	
	                    // 
	                    arr[i].EndDate = "" + arr[i].EndDate.getFullYear() + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00Z";
	
	                    //console.log( arr[i].EndDate);
	
	                }
	
	                fromRequestStart = ("" + arr[i].StartDate).substr(0, 10);
	                fromRequestEnd = ("" + arr[i].EndDate).substr(0, 10);
	
	                mm = (mm.length == 1) ? "0" + mm : "" + mm;
	
	                let dd = ($a.text().length == 1) ? "0" + $a.html() : $a.html();
	                fromAnchor = "" + yyyy + "-" + mm + "-" + dd;
	
	                let anchorDate = new Date(yyyy, mm - 1, dd);
	                let dzienTygodniaAnchora = anchorDate.getDay()
	
	                let currentDefaultSchedule = (function (ad, wd, y, m, d, nationalHolidaysForThisMonth) {
	
	                    // body of the anonymous function //
	                    let tmpTxt = "";
	                    
	                    //console.log(ad);
	                    //console.log(wd);
	                    
	                    // console.log("" + y + "  " + m + "  " + d); // OK
	                                        
	                    // wd - 1 monday - 2 - tuesday - 3 - wednesday - 4 - thu - 5 - fri
	
	                    switch (wd) {
	                        case 1:
	                            tmpTxt = planMon[0].substr(0, 5) + "-" + planMon[1].substr(0, 5);
	                            break;
	                        case 2:
	                            tmpTxt = planTue[0].substr(0, 5) + "-" + planTue[1].substr(0, 5);
	                            break;
	                        case 3:
	                            tmpTxt = planWed[0].substr(0, 5) + "-" + planWed[1].substr(0, 5);
	                            break;
	                        case 4:
	                            tmpTxt = planThu[0].substr(0, 5) + "-" + planThu[1].substr(0, 5);
	                            break;
	                        case 5:
	                            tmpTxt = planFri[0].substr(0, 5) + "-" + planFri[1].substr(0, 5);
	                            break;
	                        default:
	                            tmpTxt = "WOLNE";
	                            break;
	                    }
	                    
	                    //console.log( nationalHolidaysForThisMonth );
	                    if( nationalHolidaysForThisMonth ) {
	                    if( nationalHolidaysForThisMonth.length > 0 ) {
	                    	// there is some holidays please check it
	                    	// and it means that tmpTxt possibly will have diff value
	                    	// -----------------------------------------------------------------------
	                    	nationalHolidaysForThisMonth.forEach( function( item, indx ) {
	                    		
	                    		if( parseInt(item.substr(0,4)) == parseInt(y) ) {
	                    			if(parseInt(item.substr(5,2)) == parseInt(m) ) {
		                    			if(parseInt(item.substr(8,2)) == parseInt(d) ) {
		                    				tmpTxt = "WOLNE";
		                    			}
	                    			}
	                    		}
	                    		
	                    	});
	                    	
	                    	
	                    	// -----------------------------------------------------------------------
	                    }}
	
	                    return "" + tmpTxt;
	                    
	                    
	                })(anchorDate, dzienTygodniaAnchora, yyyy, mm, dd, nationalHolidaysForThisMonth);
	                
	                
	
	                // sun == 0
	                // mon == 1
	                // ..
	                // sat == 6
	                //console.log(anchorDate + " " + dzienTygodniaAnchora); // OK
	                if ($a.html() != undefined) {
	                    // console.log($a.html());
	                    
	                    let $dtpzero = $a.parent().find(".dtp-zero");
						// console.log($dtpzero.size());
						if($dtpzero.size() == 0) {
		                    $("<p class=\"dtp-zero\">" + currentDefaultSchedule + "</p>").insertAfter($a);
		                } else {
		                	// console.log($dtpzero.get(0));
		                	$dtpzero.get(0).innerHTML = currentDefaultSchedule;
		                }
	                }
	
	                //console.log(fromAnchor + "-" + fromRequestStart);
	
	                if (fromRequestStart <= fromAnchor && fromRequestEnd >= fromAnchor) {
	                    //console.log(fromAnchor); // OK!
	                    
		            	if (visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
	                    
		                    if (iter < 2) {
		                        if (iter == 0) {
		                        	let $dtpfst = $a.parent().find(".dtp-first");
		                        	/*
		                        		#ff2200 -> .color-for-visible
		                        		if ($scope.visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                        	*/                        		                        	
		                        	if($dtpfst.size() == 0) {
		                        		if (redStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                                	$("<p class=\"dtp-first color-for-red\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);

		                        		} else if (calcStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                                	$("<p class=\"dtp-first color-for-calc\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);

		                        		} else if (visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                                	$("<p class=\"dtp-first color-for-visible\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);
		
		                        		} else {
		                                	$("<p class=\"dtp-first\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);
		    	                        }
		                            } else {
		                            
		                            	if (redStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                            		$dtpfst.get(0).classList.remove("color-for-visible");
		                            		$dtpfst.get(0).classList.remove("color-for-calc");
		                            		$dtpfst.get(0).classList.add("color-for-red");
		                            		
		                            	} else if (calcStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                            		$dtpfst.get(0).classList.add("color-for-calc");
		                            		$dtpfst.get(0).classList.remove("color-for-red");
		                            		$dtpfst.get(0).classList.remove("color-for-visible");

		
		                            	} else if (visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                            		$dtpfst.get(0).classList.add("color-for-visible");
		                            		$dtpfst.get(0).classList.remove("color-for-red");
		                            		$dtpfst.get(0).classList.remove("color-for-calc");
		
		                            	} else {
		                            		$dtpfst.get(0).classList.remove("color-for-visible");
		                            		$dtpfst.get(0).classList.remove("color-for-red");
		                            		$dtpfst.get(0).classList.remove("color-for-calc");
		                                }
		                                
		                                $dtpfst.get(0).innerHTML = "ID: " + arr[i].ID + ", " +
		                                	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		                                	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i>";
		                            }
		                        }
								
		                        if (iter == 1) {
		                        
		                        	let $dtpsec = $a.parent().find(".dtp-second");
		                        	/*
		                        		#ff2200 -> .color-for-visible
		                        		if ($scope.visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                        	*/                        		                        	
		                        	if($dtpsec.size() == 0) {
		                        		if (redStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                                	$("<p class=\"dtp-second color-for-red\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);
		    	                            	
		                        		} else if (calcStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                                	$("<p class=\"dtp-second color-for-calc\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);

		                        		} else if (visibleStatuses.indexOf(parseInt(arr[i].Status)) >= 0) {
		                                	$("<p class=\"dtp-second color-for-visible\">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);
				
		                        		} else {
		                                	$("<p class=\"dtp-second \">ID: " + arr[i].ID + ", " +
		    	                            	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		    	                            	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i></p>").insertAfter($a);
		    	                        }
		                            } else {
		                            	$dtpsec.get(0).innerHTML = "ID: " + arr[i].ID + ", " +
		                                	datePickerHandler.ktoryToPresenceCode(arr[i].RequestCodeSAP) +
		                                	" <i class='" + graphStatuses[datePickerHandler.getStatus(arr[i].Status)] + "'></i>";
		                            }
		                        }
		                    }                  
		                    
		                    iter++;
	                    
	                    }
	                }
	            }
            }
        }

    },


    ktoryToPresenceCode: function (code) {


        for (let i = 0; i < presenceCodes.length; i++) {
            if (code == presenceCodes[i].ID) {
                return presenceCodes[i].Description;
            }
        }
    },
    
    getNationalHolidaysStringYYYYMMDDDateFor: function(y,m) { 
    
    
    	//console.log(parseInt(y));
    	//console.log(parseInt(m));
    	
    	let arr = [];
    	
    	nationalHolidays.forEach( function(item, index) {
    	
    	
    		//console.log(("" + item.Date).substr(0,4) + "    " + ("" + item.Date).substr(5,2));
    	
    		if( parseInt(("" + item.Date).substr(0,4)) == parseInt(y) ) {
    			if( parseInt(("" + item.Date).substr(5,2)) == parseInt(m) ) {
					arr.push(item.Date);
    			}
    		}

    	});
    	
    	return arr; 
    }


}
