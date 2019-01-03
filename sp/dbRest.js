var site = "https://share.opel.com/sites/ovso2/SOE_Gliwice/Support/wbnch";


function loadUserById(ajdi) {
    let userFromId = null;
    $.when(loadGroupsFrom(site)).done(function (data) {
        // console.log(data.d); 

        data.d.results.forEach(
            function (item, indx) {
                if (item.Title == G_USERS) {
                    // console.log( item ); // OK


                    $.when(simplifiedGetItems(item.Users.__deferred.uri)).done(function (data) {

                        // console.log(data.d); // OK

                        data.d.results.forEach(function (item, indx) {

                            if (parseInt(item.Id) == parseInt(ajdi)) {
                                //console.log(item);  
                                userFromId = item;
                            }
                        });
                    });
                }
            });
    });
    return userFromId;
}




function loadUser() {
    var currentUserSP = {};
    $.when(loadUserDetails(site)).done(function (data) {
        //currentUserSP.Mail = data.d.Email;
        //currentUserSP.Name = data.d.Title;
        //currentUserSP.Login = data.d.LoginName;
        currentUserSP.ID = data.d.Id;

        $.when(getAllListItemsWithFilters(site, 'Emplyoee Details', "&$filter=Employee eq " + currentUserSP.ID + "&$select=MonthlyHO,Holiday,OvertimeLimit,OvertimeDaily,OvertimeMax,ChildrenCareHours,m0cy,MondayScheduleID,TuesdayScheduleID,WednesdayScheduleID,ThursdayScheduleID,FridayScheduleID,vxsy/Id,TimeAdmin/Id&$expand=vxsy/Id&$expand=TimeAdmin/Id")).done(function (data) {
            data.d.results.forEach(function (item) {
                currentUserSP.LimitMonthylHO = item.MonthlyHO;
                currentUserSP.HolidayLimit = item.Holiday;
                currentUserSP.OvertimeLimitYearlyHours = item.OvertimeLimit;
                currentUserSP.OvertimeLimitDailyHours = item.OvertimeDaily;
                currentUserSP.OVertimeLimitMaxHours = item.OvertimeMax;
                currentUserSP.ChildrenCare = item.ChildrenCareHours;
                currentUserSP.defaultScheduleID = item.m0cy;
                currentUserSP.ApproverID = item.vxsy.Id;
                currentUserSP.TimeAdminID = item.TimeAdmin.Id;
                currentUserSP.MondayScheduleID = item.MondayScheduleID;
                currentUserSP.TuesdayScheduleID = item.TuesdayScheduleID;
                currentUserSP.WednesdayScheduleID = item.WednesdayScheduleID;
                currentUserSP.ThursdayScheduleID = item.ThursdayScheduleID;
                currentUserSP.FridayScheduleID = item.FridayScheduleID
            });
        });

    });
    return currentUserSP;
}

function loadStatuses() {
    var statusCodes = [];
    $.when(getAllListItems(site, 'Status')).done(function (data) {
        data.d.results.forEach(function (item) {
            statusCodes.push({
                "ID": item.ID,
                "Status": item.Title
            });
        });
    });
    return statusCodes;
}

function loadWorkingHours() {
    var workingHours = [];
    $.when(getAllListItems(site, 'Working Hours')).done(function (data) {
        data.d.results.forEach(function (item) {
            workingHours.push({
                "ID": item.ID,
                "Start": item.Start,
                "End": item.End
            });
        });
    });
    return workingHours;
}

function loadPresenceCodes() {
    var presenceCodes = [];
    $.when(getAllListItems(site, 'Presence Codes')).done(function (data) {
        data.d.results.forEach(function (item) {
            presenceCodes.push({
                "ID": item.ID,
                "Title": item.Title,
                "Description": item.Description,
                "List": item.List,
                "Quick": item.Quick,
                "ID_SAP": item.vwkw
            });
        });
    })
    return presenceCodes;
}

function loadNationalHolidays() {
    var nationalHolidays = [];
    $.when(getAllListItems(site, 'National Holidays')).done(function (data) {
        data.d.results.forEach(function (item) {
            nationalHolidays.push({
                "ID": item.ID,
                "Date": item.Title
            });
        });
    })
    return nationalHolidays;
}



// NEW on OCT 2018! - issue with 500 for std loadMyEmployees
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadMyEmployees(ajdi) {
    let myEmployeesArr = [];
    let supervisorFilter = "&$filter=(Approver eq " + parseInt(ajdi) + ")";
    // console.log( supervisorFilter );

    $.when(getAllListItemsWithFilters(site, "Emplyoee%20Details", supervisorFilter)).done(function (data) {

        // console.log(data.d);

        data.d.results.forEach(function (item) {
            // console.log(item.AuthorId);


            $.when(loadUserById(item.EmployeeId)).done(function (rawUser) {

                console.log(rawUser);

                /*
	    		myEmployeesArr.push({
	    			"ID": rawUser.Id,
	    			"Email": rawUser.Email,
	    			"UserName": rawUser.Title,
	    			"Login": rawUser.LoginName
	    		});
	    		*/
            });
        });
    });

    return myEmployeesArr;
}


// :(
function loadMyEmployeesBasedOnRequests(rs) {



    if (rs.length > 0) {
        console.log(rs);
    } else {
        alert("Sth went really wrong! rs.length == 0!");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadRequests(user, ID) {
    var requestsToBeDone = [];


    var userRole = determineUserRoleFilter(user);
    var timeQuery = determineTimeQuery();

    var filter = "&$filter=(" + userRole + " eq " + ID + ")" + timeQuery;
    
    if( userRole == "Admin" ) {
    	filter = "";
    }
    
    $.when(getAllListItemsWithFilters(site, 'Requests', filter)).done(function (data) {
        data.d.results.forEach(function (item) {

            requestsToBeDone.push({
                "ID": item.ID,
                "CreatedBy": item.AuthorId,
                "EditedBy": item.EditorId,
                "CreatedByName": loadUserById(item.AuthorId).Title,
                "EditedByName": loadUserById(item.EditorId).Title,
                "RequestCodeSAP": item.Title,
                "StartDate": item.Date,
                "EndDate": item.End_x0020_Date,
                "Status": item.Status,
                "InternalID": item.InternalID,
                "Reason": item.Reason,
                "WorkScheduleID": item.WorkSchedule,
                "ApprovalDate": item.ApprovalDate,
                "OvertimeNo": item.OvertimeNo,
                "HolidaysNo": item.HolidaysNo,
                "ChildrenCareHours": item.ChildrenCareHours
            });
        });
    });
    return requestsToBeDone;
}

function loadSpecialRequests(user, ID) {
    var rsr = [];

    if (user == "TimeAdmin" || user == "Admin") {

        let filter = "&$filter=(STATUS eq 'OPEN')";
        $.when(getAllListItemsWithFilters(site, 'SpecialRequests', filter)).done(function (data) {
            data.d.results.forEach(function (item) {

                rsr.push({
                    "ID": item.ID,
                    "Title": item.Title,
                    "Status": item.STATUS,
                    "CreatedBy": item.AuthorId,
                    "EditedBy": item.EditorId,
                    "CreatedByName": loadUserById(item.AuthorId).Title,
                    "EditedByName": loadUserById(item.EditorId).Title,
                    "Description": item.Description,
                });
            });
        });
    }

    return rsr;
}

function determineUserRoleFilter(user) {

    var fieldWithRoleToBeRetrieved;
    if (user == "Supervisor") {
        fieldWithRoleToBeRetrieved = "Approver";
    } else if (user == "TimeAdmin") {
        fieldWithRoleToBeRetrieved = "TimeAdmin";
    } else if (user == "Admin") {
        fieldWithRoleToBeRetrieved = "Admin";
    } else {
        fieldWithRoleToBeRetrieved = "Author";
    }
    
    return fieldWithRoleToBeRetrieved;
}

function determineTimeQuery() {
    var dateFilter;
    var currentYear = new Date().getFullYear();
    //var currentYear= new Date(2019, 11, 24, 10, 33, 30).getFullYear();
    var firstBoundaryDate = new Date(currentYear - 1, 10, 1);
    var secondBoundaryDate = new Date(currentYear + 1, 2, 1);

    //console.log(firstBoundaryDate);
    //console.log(secondBoundaryDate);

    return dateFilter = " and (Created ge '" + firstBoundaryDate.toISOString() + "') and (Created le '" + secondBoundaryDate.toISOString() + "')";

}
