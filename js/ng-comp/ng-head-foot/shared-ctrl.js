BulbApp.factory("RequestsService", function () {

    let innerPlans = presenceCodes;
    let innerTimes = times;
    let innerYou = currentUserSP;
    let innerStatuses = statuses;
    let editedRequest = null;

    let innerGuziki = (function (cc) {

        let tmp = [];

        for (let i = 0; i < cc.length; i++) {
            if (cc[i].Quick == "Yes") {
                tmp.push(cc[i].Description);
            }
        }

        return tmp;
    })(presenceCodes);


    // console.log(innerGuziki);
    
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    // logika na potrzeby modal from calendar
    // ModalFromCalendarCtrl
    var strDate = DateParser.generateYYYYMMDD( (new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate() );


	function getStrD() {
		return strDate;
	}
	
	function setStrD(newStrDate) {
		strDate = newStrDate;
	}
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
	
	
	

    return {
        getArr: function () {
            return requests;
        },
        getPlansArr: function () {
            return innerPlans;
        },
        getTimesArr: function () {
            return innerTimes;
        },
        getYouObj: function () {
            return innerYou;
        },
        getButtonNames: function () {
            return innerGuziki;
        },
        getStatuses: function () {
            return innerStatuses;
        },
        setEditedRequest: function (item) {
            editedRequest = item;
        },
        getEditedRequest: function () {
            return editedRequest;
        },
        getStrDate: getStrD,
        setStrDate: setStrD
    }
});




BulbApp.controller("HelpCtrl", function ($scope) {

    $scope.h = {};
    $scope.h.title = "Pomoc techniczna";

    $scope.h.itGuys = [];


    let mm = {
        name: "Mateusz Milewski",
        mail: "mateusz.milewski@opel.com",
        phone: "+48 32 508 2737",
        mobile: "+48 666 825 581",
        Entité: "OV/MFG/SCN/SCO/SOP/SOPD"
    };
    let mp = {
        name: "Marcin Plisz",
        mail: "marcin.plisz@opel.com",
        phone: "+48 32 302 4023",
        mobile: "+48 721 121 961",
        Entité: "OV/HRM/PS/SSC"
    };

    $scope.h.itGuys.push(mm);
    // $scope.h.itGuys.push(mp);


});
