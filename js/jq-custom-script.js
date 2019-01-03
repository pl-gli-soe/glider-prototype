var navigationFn = {
    goToSection: function (id) {
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 100);
    }
}


var globalRefresh = function () {

    // console.log("global refresh!");

    //requests = loadRequests("Author", currentUserSP.ID);
    location.reload(false);
    //window.location = window.location;
    //requests = loadRequests("Supervisor", currentUserSP.ID); 
    //requests = loadRequests("TimeAdmin", currentUserSP.ID); 

    /*
    setTimeout(function () {
        console.log(requests);
    }, 1000);
    */


}


var addTempClassToDisplayNone = function (bool) {

    var myElements = [
        "header",
        "navbar",
        "calendar",
        "timeline",
        "list",
        "this-week-schedule",
        "summary",
        "help",
        "header-info-small",
        "container"
    ];


    for (let i = 0; i < myElements.length; i++) {
        var el = document.getElementsByClassName(myElements[i]);


        for (let j = 0; j < el.length; j++) {


            if (bool) {
                el[j].addClass("extra-display-none");
            } else {
                el[j].classList.remove("extra-display-none");
            }

        }


    }

}





var DateParser = {


    sprawdzCzyCurrMonth: function (currMonth, startDate, endDate) {

        //console.log(startDate + " " + endDate);
        //console.log(currMonth); // month starts from zero.


        let strYMDSD = ("" + startDate).split("T")[0];
        let strYMDED = ("" + endDate).split("T")[0];


        //console.log("" + strYMDSD + " " + strYMDED);

        cm = parseInt(currMonth) + 1;

        let y = "" + (new Date()).getFullYear();

        if (strYMDSD == strYMDED) {
            if (y == strYMDSD.substr(0, 4)) {

                // console.log(parseInt(strYMDSD.substr(5, 2)));
                if (parseInt(cm) == parseInt(strYMDSD.substr(5, 2))) {

                    return true;
                }
            }

        } else {
        
        
        	// no... nie wiem :(
            if (parseInt(cm) == parseInt(strYMDSD.substr(5, 2))) {

                return true;
            }

            if (parseInt(cm) == parseInt(strYMDED.substr(5, 2))) {

                return true;
            }

        	
        }

        return false;
    },

    sprawdzCzyCurrOkres: function (arrOkres, startDate, endDate) {


        let strYMDSD = ("" + startDate).split("T")[0];
        let strYMDED = ("" + endDate).split("T")[0];


        //console.log(strYMDSD.substr(0, 4) + " " + strYMDSD.substr(5, 2) + " " + strYMDSD.substr(8, 2));
        //console.log(arrOkres);
        let sd = new Date(strYMDSD.substr(0, 4), parseInt(strYMDSD.substr(5, 2)) - 1, strYMDSD.substr(8, 2));
        let ed = new Date(strYMDED.substr(0, 4), parseInt(strYMDED.substr(5, 2)) - 1, strYMDED.substr(8, 2));


        let okres1 = new Date(arrOkres[0].substr(0, 4), parseInt(arrOkres[0].substr(5, 2)) - 1, arrOkres[0].substr(8, 2));
        let okres2 = new Date(arrOkres[1].substr(0, 4), parseInt(arrOkres[1].substr(5, 2)) - 1, arrOkres[1].substr(8, 2));

        /*
        console.log(sd);
        console.log(ed);
        console.log(okres1);
        console.log(okres2);
        */


        if (okres1 <= sd && okres1 <= ed) {
            if (okres2 >= sd && okres2 >= ed) {
                return true;
            }
        }

        return false;
    },



    dateFromYYYYMMDD_TTMM: function (d) {

        var arr = ("" + d).split(" ");
        var strDate = arr[0];
        var strTime = arr[1];

        var strHour = arr[1].substr(0, 2);
        var strMin = arr[1].substr(3, 4);

        // console.log(strHour + " : " + strMin);

        var re2 = /-\d\d-/;
        var reYear = /^\d{4}/;
        var reDay = /\d{2}$/;
        var currentMonth = parseInt(strDate.match(re2)[0].replace("-", "").replace("-", ""));
        currentMonth--;
        var currentYearNum = parseInt(strDate.match(reYear));
        var currentDay = parseInt(strDate.match(reDay));





        var d = new Date(parseInt(currentYearNum), parseInt(currentMonth), parseInt(currentDay), parseInt(strHour), parseInt(strMin), 0);

        return d;

    },
    
    dateFromTZ: function (d) {

        var arr = ("" + d).split("T");
        var strDate = arr[0];
        var strTime = ("" + arr[1]).replace("Z","");

        var strHour = strTime.substr(0, 2);
        var strMin = strTime.substr(3, 2);

        // console.log(strHour + " : " + strMin);

        var re2 = /-\d\d-/;
        var reYear = /^\d{4}/;
        var reDay = /\d{2}$/;
        var currentMonth = parseInt(strDate.match(re2)[0].replace("-", "").replace("-", ""));
        currentMonth--;
        var currentYearNum = parseInt(strDate.match(reYear));
        var currentDay = parseInt(strDate.match(reDay));





        var d = new Date(parseInt(currentYearNum), parseInt(currentMonth), parseInt(currentDay), parseInt(strHour), parseInt(strMin), 0);

        return d;

    },



    dopasujFormatDoTandZFromYYYYMMDD: function (d) {

        var newDate = "";

        if (DateParser.checkIfThisDateIsYYYYMMDD(d)) {


            let arr = d.split(" ");

            return "" + arr[0] + "T" + arr[1] + ":00Z";

        } else {

            let d = new Date();
            return d.toISOString();
        }


        return null;
    },

    generateThisWithTandZ: function (y, month, d, h, mmin) {
        // "2018-06-27T00:00:00Z" <- goal (example)
        var newDate = "";


        let yyyy = (y.length == 4) ? "" + y : "" + (new Date).getFullYear();
        // te sprwadzenie to w sumie tak dla picu...
        let mm = (parseInt(month) > 0 && parseInt(month) < 13) ? "" + month : "" + ((new Date).getMonth() + 1);
        mm = (mm.length == 2) ? mm : "0" + mm;
        let dd = (d.length == 2) ? "" + d : "0" + d;
        let hh = (h.length == 2) ? "" + h : "0" + h;
        let min = (mmin.length == 2) ? "" + mmin : "0" + mmin;

        newDate = "" + yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":00Z";



        return newDate;
    },

    generateYYYYMMDD: function (y, month, day) {
        var newDate = "";

        let yyyy = (y.length == 4) ? "" + y : "" + (new Date).getFullYear();
        // te sprwadzenie to w sumie tak dla picu...
        let mm = (parseInt(month) > 0 && parseInt(month) < 13) ? "" + month : "" + ((new Date).getMonth() + 1);
        // mm = (mm.length == 2) ? mm : "0" + mm;
        //let dd = (day.length == 2) ? "" + day : "0" + day;
        if(("" + mm).length == 1) {
        	mm = "0" + mm;	
        }

        let dd = day;
        if (("" + day).length == 1) {
            dd = "0" + day;
        }

        newDate = "" + yyyy + "-" + mm + "-" + dd;


        return newDate;


    },


    checkIfThisDateIsWithTAndZ: function (strDate) {


        // matching directly only patterns such as: "2018-06-27T00:00:00Z"

        var returnedBool = false;

        var re = /\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ/;
        returnedBool = re.test("" + strDate);
        return returnedBool;
    },

    checkIfThisDateIsYYYYMMDD: function (strDate) {

        var re = /\d{4}-\d{2}-\d{2}/;
        var b = re.test("" + strDate);
        return b;
    },

    checkIfThisDateIsYYYYMMDDspaceHHMM: function (strDate) {
        var re = /\d{4}-\d{2}-\d{2} \d\d:\d\d/;
        var b = re.test("" + strDate);
        return b;
    },


    checkIfThose2DatesAreInOrder: function (strD1, strD2) {


        // wczesniej wykorzystany byl warunek powwyzej wiec wiemy napewno ze format w argumentcie jest poprawny
        // format arg yyyy-mm-dd hh:mm - jednyny poprawny

        var d1 = DateParser.dateFromYYYYMMDD_TTMM(strD1);
        var d2 = DateParser.dateFromYYYYMMDD_TTMM(strD2);

        if (d1 < d2) {
            return true;
        } else {
            return false;
        }
    },




    // miejsce dla wyliczen okresu rozliczeniowego 
    /*
        foo przyjmuje argument jako date, a zwraca tablice dwoch elementow w postaci poczatku i konca okresu datami meh!
    */

    okresRozliczeniowy: function (strDate) {

        let tmp = [2, 6, 10];

        var re = /\d{4}-\d{2}-\d{2}/;
        var b = re.test("" + strDate);


        if (!b) {
            let d = new Date();
            strDate = "" + d.getFullYear() + "-" + ((d.getMonth() < 9) ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate());
        }

        // console.log(strDate); // OK
        var re2 = /-\d\d-/;
        var reYear = /^\d{4}/;
        var currentMonth = parseInt(strDate.match(re2)[0].replace("-", "").replace("-", ""));
        var currentYearNum = parseInt(strDate.match(reYear));
        //console.log(currentYearNum);


        var poczatek = "";
        var koniec = "";


        for (let i = 0; i < tmp.length; i++) {

            if (currentMonth <= tmp[i]) {

                // teraz trick co by sie nie musiec rozmkniac czy ostatni to 29, 28 luty
                // tworze pierwszy marca i odejmuje jeden
                let tmpDate = new Date(currentYearNum, parseInt(tmp[i]), 0); // liczymy miesiace od zera // ale dni juz normlanie zatem pobierajac zero cofam sie o jeden dzien

                if (i == 0) {
                    poczatek = "" + (currentYearNum - 1) + "-" + tmp[2] + "-01";
                } else {
                    poczatek = "" + (currentYearNum) + "-" + ((tmp[i - 1] < 10) ? "0" + (tmp[i - 1] + 1) : "" + (tmp[i - 1]) + 1) + "-01";
                }

                koniec = "" + (currentYearNum) + "-" + ((tmp[i] < 10) ? "0" + tmp[i] : "" + tmp[i]) + "-" + tmpDate.getDate();

                return [poczatek, koniec];
            } else if (currentMonth > tmp[2]) {
                // okres rozliczeniowy juz na nastepy rok od 1 listopada
                poczatek = "" + currentYearNum + "-11-01";
                let tmpDate = new Date(currentYearNum + 1, parseInt(tmp[0]), 0);
                koniec = "" + (currentYearNum + 1) + "-0" + tmp[0] + "-" + tmpDate.getDate();

                return [poczatek, koniec];
            }
        }

        return -1;

    },


    rokPoszerzonyOkresamiRozliczeniowymi: function (rok) {
        var poczatek = "";
        var koniec = ""

        var rokNum = parseInt(rok);

        poczatek = "" + (rokNum - 1) + "-11-01";
        let tmpDate = new Date(rokNum + 1, 2, 0);
        koniec = "" + (rokNum + 1) + "-02-" + tmpDate.getDate();

        return [poczatek, koniec];
    },

    wszystkieOkresyRozliczeniowe: function (rok) {


        var okresy = []

        // heurystycznie dobrane daty
        var dd = [rok + "-01-01", rok + "-04-01", rok + "-07-01", rok + "-12-01"];

        // console.log(dd); // OK

        for (let i = 0; i < dd.length; i++) {
            okresy.push(DateParser.okresRozliczeniowy(dd[i]));
        }


        return okresy;



    },


    generateDateDDMMYYYY: function (d) {

        let y = d.getFullYear();
        let m = "" + (d.getMonth() + 1);
        let dz = d.getDate();


        // m = "" + ((m < 10) ? "0" + m : m);
        if (m.length == 1) {
            m = "0" + m;
        }

        return "" + dz + "-" + m + "-" + y;
    },

    generateDateMMDDYYYY: function (d) {

        let y = d.getFullYear();
        let m = "" + (d.getMonth() + 1);
        let dz = d.getDate();


        // m = "" + ((m < 10) ? "0" + m : m);
        if (m.length == 1) {
            m = "0" + m;
        }

        return "" + m + "-" + dz + "-" + y;
    },


    differenceBetweenYYYYMMDD: function (ymd1, ymd2) {


        arrD1 = ymd1.split("-");
        arrD2 = ymd2.split("-");

        y1 = parseInt(arrD1[0]);
        y2 = parseInt(arrD2[0]);

        m1 = parseInt(arrD1[1]);
        m2 = parseInt(arrD2[1]);

        d1 = parseInt(arrD1[2]);
        d2 = parseInt(arrD2[2]);



        let newD1 = new Date(y1, m1 - 1, d1);
        let newD2 = new Date(y2, m2 - 1, d2);


		/*
        console.log(newD1);
        console.log(newD2);
		*/

        let diff = parseInt(newD2.getTime() - newD1.getTime());
        
        //console.log(diff);
        
        diff = diff / (1000 * 3600 * 24);
        
        //console.log(diff);

        return diff;


        // return [yyyy2 - yyyy1, m2 - m1, d2 - d1]; // not always ok

    },

    differenceBetweenTimeInMinutes: function (t1, t2) {


        arrT1 = t1.split(":");
        arrT2 = t2.split(":");

        //console.log(t1 + " " + t2);


        diffH = parseInt(arrT2[0]) - parseInt(arrT1[0]);
        diffMin = parseInt(arrT2[1]) - parseInt(arrT1[1]);

        //console.log(diffH + " " + diffMin);


        diffMin = diffMin + (diffH * 60);

        //console.log(diffMin);

        let diff = diffMin;
        return diff;
    },

    differenceBetweenDatesWithTZFormat: function (d1, d2) {
        // d1 and d2 is in "2018-06-20T00:00:00Z" format


        // assuming that d1 stands for d1 -> StartDate
        // and d2 as EndDate
        //console.log(d1); // jako data wychodzi
        //console.log(d2);

        //let diff = d1 - d2;
        //console.log(diff); // NaN

        // console.log(d1.getFullYear());
        let strD1 = "" + d1;
        let strD2 = "" + d2;


        let arrD1 = strD1.split("T");
        let arrD2 = strD2.split("T");

        let strYMD1 = arrD1[0];
        let strYMD2 = arrD2[0];

        let strTime1 = arrD1[1].replace("Z", "");
        let strTime2 = arrD2[1].replace("Z", "");

        // console.log(d1 + " " + d2);


        // console.log(DateParser.differenceBetweenYYYYMMDD(strYMD1, strYMD2));
        // console.log(DateParser.differenceBetweenTimeInMinutes(strTime1, strTime2));

        let days = DateParser.differenceBetweenYYYYMMDD(strYMD1, strYMD2);
        let hours = 0;
        let minutes = DateParser.differenceBetweenTimeInMinutes(strTime1, strTime2);

        while (minutes >= 60) {
            hours++;
            minutes = minutes - 60;
        }

        let toReturn = [days, hours, minutes];
        // console.log(toReturn); // OK!
        return toReturn;
    }
}

function findSapDescFromSapCode(code) {
    let desc = presenceCodes.filter(function (v) {
        if (code == v.Title) { return v.Description; }
    });
    
    
    return desc;
}

function findSapDescFromId(code) {
    let desc = presenceCodes.filter(function (v) {
    	// console.log( code + " " + v.ID + " " + v.Description );
        if (code == v.ID) { 
        	// console.log("udalo sie!"); // OK~!
        	return v.Description; 
        }
    });
    
    return desc;
}

function findSapCodeFromId(code) {
    let title = presenceCodes.filter(function (v) {
        if (code == v.ID) { return v.Title; }
    });
    
    return title;
}

function findIdFromSapCodes(code) {
    let ajdi = presenceCodes.filter(function (v) {
        if (code == v.Title) {
            return v.ID;
        }
    });
    
    return ajdi;
}



var addHours = function (y, m, d, h, i) {
    // console.log("pacz tu     " + y + " " + m + " " + d + " " + h + " " + i);

    intY = parseInt(y);
    intM = parseInt(m) - 1;
    intD = parseInt(d);

    intHH = 0;
    intMM = 0;

    let arr = h.split(":");

    /*
    if(h.length == 5) {
        intHH = parseInt(h.substr(0, 2));
    } else if(h.length == 1) {
        intHH = parseInt(h);
    } else {
        intHH = 0;
    }

    if(h.length == 5) {
        intMM = parseInt(h.substr(3, 2));
    }
    */


    if (arr.length == 2 || arr.length == 3) {

        intHH = parseInt(arr[0]);
        intMM = parseInt(arr[1]);
    } else {
        intHH = 0;
        intMM = 0;
    }

    let tmpD1 = new Date(intY, intM, intD, intHH, intMM);
    
    // !!!
    // NOK
    /*
    if( i >= 1 && i <= -1 ) {
    	tmpD1.setHours(tmpD1.getHours() + parseInt(i));
    }  else {
    	tmpD1.setHours(tmpD1.getHours() + parseFloat(i));
    }
    */
    // tmpD1.setHours(tmpD1.getHours() + parseFloat(i)); // tez nok :/
    
    // to jest OK - pomimo przekroczenia wartosci 60 minut poprawnie przeskakuje na godziny
    // zatem bez problemu obsluguje wartosci takie jak 1,5, 2,5 etc...
    tmpD1.setMinutes(tmpD1.getMinutes() + (parseFloat(i) * 60.0));
    



    // NOK
    //let mmTmpD1 = "" + ((tmpD1.getMonth() + 1) < 10) ? "0" + (tmpD1.getMonth() + 1) : "" + (tmpD1.getMonth() + 1);

    let tmpM = 0 + parseInt(tmpD1.getMonth() + 1);
    let mmTmpD1 = "";

    if (tmpM < 10) {
        mmTmpD1 = "0" + (tmpD1.getMonth() + 1);
    } else {
        mmTmpD1 = "" + (tmpD1.getMonth() + 1);
    }

    //console.log(("" + tmpD1.getDate()).length);
    //console.log(tmpD1.getDate());
    //console.log((0 + tmpD1.getDate()) < 10);

    // NOK
    //let ddTmpD1 = "" + ((tmpD1.getDate()) < 10) ? "0" + (tmpD1.getDate()) : "" + (tmpD1.getDate());
    let tmpD = 0 + parseInt(tmpD1.getDate());
    let ddTmpD1 = "";

    if (tmpD < 10) {
        ddTmpD1 = "0" + tmpD1.getDate();
    } else {
        ddTmpD1 = "" + tmpD1.getDate();
    }

    //console.log("test: ");
    //console.log(tmpD1.getHours());        
    //console.log(typeof tmpD1.getHours());

    let tmpHH = 0 + parseInt(tmpD1.getHours());
    let hhTmpD1 = "";

    if (tmpHH < 10) {
        hhTmpD1 = "0" + tmpD1.getHours();
    } else {
        hhTmpD1 = "" + tmpD1.getHours();
    }

    // sth NOK!
    // let hhTmpD1 = "" + ((tmpHH) < 10) ? "0" + (tmpD1.getHours()) : "" + (tmpD1.getHours());
    //console.log("A: " + hhTmpD1);
    // let minTmpD1 = "" + ((parseInt(tmpD1.getMinutes())) < 10) ? "0" + (tmpD1.getMinutes()) : "" + (tmpD1.getMinutes());
    //let minTmpD1 = "" + tmpD1.getMinutes();


    let tmpMin = 0 + parseInt(tmpD1.getMinutes());
    let minTmpD1 = ""

    if (tmpMin < 10) {
        minTmpD1 = "0" + tmpD1.getMinutes();
    } else {
        minTmpD1 = "" + tmpD1.getMinutes();
    }

    return "" + tmpD1.getFullYear() + "-" + mmTmpD1 + "-" + ddTmpD1 + " " + hhTmpD1 + ":" + minTmpD1;
}
