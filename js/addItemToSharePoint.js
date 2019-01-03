// test objects
/*
var fullObject = {
    "ChildrenCareHours": 0,
    "EndDate": "2018-06-21T14:00:00Z",
    "HolidaysNo": 2,
    "OvertimeNo": 0,
    "Reason": "UŻ",
    "RequestCodeSAP": 81,
    "StartDate": "2018-06-21T08:00:00Z",
    "Status": "4",
    "WorkScheduleID": "38",
    "IdTimeAdmin": "9455",
    "ApproverID": "9455",
    "ID": 48,
}
var object2 = {
    "ChildrenCareHours": 0,
    "EndDate": "2018-06-21T14:00:00Z",
    "HolidaysNo": 2,
    "OvertimeNo": 0,
    "Reason": "UŻ",
    "RequestCodeSAP": 81,
    "StartDate": "2018-06-21T08:00:00Z",
    "Status": "1",
    "WorkScheduleID": "38",
    "IdTimeAdmin": "9455",
    "ApproverID": "9455",
    "ID": 60,
    "InternalID": "2345235634635"
}
*/

//pola IdTimeAdmin i Approver Time admin z obviektu user
/* example of Lean object */
/*
var testEl = {
    "StartDate": "2018-07-10T00:00:00Z",
    "EndDate": "2018-07-12T00:00:00Z",
    requestName: "Urlop",
    Reason: "some txt to be considered as a request reason"
}
*/


function getCurrentWorkSchedule(currUser) {
    return currUser.defaultScheduleID;
}

function calcHolidaysNo(leanObj) {
    return 0;
}

function calcOvertime(leanObj) {
    return 0;
}

function calcHolidaysNo(leanObj) {
    // obsolete - now it diff format
    // let tmp = DateParser.differenceBetweenDatesWithTZFormat(leanObj.StartDate, leanObj.EndDate)
    return 0;
}

// do not need - we will have id directly
function calcSAPCode(leanObj) {
    let nm = leanObj.requestName;
    // console.log(nm);
    /*
    cos to nie dziala jak nalezy
    return presenceCodes.find(function (element) {

        if (nm == element.Description) {
            return element.ID;
        }
    });
    */
    for (let i = 0; i < presenceCodes.length; i++) {
        if (nm == presenceCodes[i].Description) {
            return presenceCodes[i].ID;
        }
    }
}

/*



exampleOfLeanObj : this is proper example of arg for outerAddItem
let exampleOfLeanObj = {
    "StartDate": "2018-07-10T00:00:00Z",
    "EndDate": "2018-07-12T00:00:00Z",
    requestName: "Urlop",
    Reason: "some txt to be considered as a request reason"
}
*/


function outerEditItem(leanObj, currRequestFromRequests) {

    let fullObject = {
        "ChildrenCareHours": 0,
        "EndDate": leanObj.EndDate,
        "HolidaysNo": parseInt(calcHolidaysNo(leanObj)),
        "ID": currRequestFromRequests.ID,
        "InternalID": currRequestFromRequests.InternalID,
        "OvertimeNo": parseInt(calcOvertime(leanObj)),
        "Reason": leanObj.Reason,
        "RequestCodeSAP": parseInt(currRequestFromRequests.RequestCodeSAP), // calcSAPCode(leanObj),
        "StartDate": leanObj.StartDate,
        "Status": currRequestFromRequests.Status,
        "WorkScheduleID": parseInt(getCurrentWorkSchedule(currentUserSP)),
        "IdTimeAdmin": parseInt(currentUserSP.TimeAdminID),
        "ApproverID": parseInt(currentUserSP.ApproverID)
    };


    handlerCRUD(fullObject, "Update");


    return fullObject;
}
/*

function: outerAddItem will be proper anchor for all buttons which should be connected with adding logic

*/
function outerAddItem(leanObj) {

    // if adding it will be always submitted status so == 1

    let fullObject = {
        "ChildrenCareHours": 0,
        "EndDate": leanObj.EndDate,
        "HolidaysNo": parseInt(calcHolidaysNo(leanObj)),
        "InternalID": 0,
        "OvertimeNo": parseInt(calcOvertime(leanObj)),
        "Reason": leanObj.Reason,
        "RequestCodeSAP": parseInt(leanObj.requestID), // calcSAPCode(leanObj),
        "StartDate": leanObj.StartDate,
        "Status": 1,
        "WorkScheduleID": parseInt(getCurrentWorkSchedule(currentUserSP)),
        "IdTimeAdmin": parseInt(currentUserSP.TimeAdminID),
        "ApproverID": parseInt(currentUserSP.ApproverID)
    };


    console.log(fullObject);
	handlerCRUD(fullObject, "Create");
	
    return fullObject;


}

function outerAddSpecialRequest(obj) {


    //console.log(obj.Description);

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "SpecialRequests",
        valuepairs: [["Title", obj.Title], ["Description", obj.Description]],
        completefunc: function (xData, Status) {
            console.log("Request Sent for Approval!" + " " + Status);
        }
    });

    return 0;
}

function outerDeleteItem(leanObj) {

    // if adding it will be always submitted status so == 1

    // status == 8 stands for deleted

    let fullObject = {
        "ID": leanObj.ID,
        "StartDate": leanObj.StartDate,
        "EndDate": leanObj.EndDate,
        "Status": 8
    };


    // console.log(fullObject);

    // old implementation
    //addListItem(fullObject);
    //globalRefresh();

    handlerCRUD(fullObject, "Delete");


    return fullObject;


}




function editListItem(object) {
    $.when(createNewChildItem(object)).done(function (data) {
        editRootItem(object);
    });
}



function addListItem(object) {
    //funckja dodajaca - do htmla musi być dodana:
    // a) dbRest.js
    // b) sp services - <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>   
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "Requests",
        valuepairs: [["Title", object.RequestCodeSAP],
            			 ["Date", new Date(object.StartDate).toISOString()],
            			 ["Status", object.Status],
            			 ["Approver", object.ApproverID],
            			 ["Reason", object.Reason],
            			 ["WorkSchedule", object.WorkScheduleID],
            			 ["OvertimeNo", object.OvertimeNo],
            			 ["HolidaysNo", object.HolidaysNo],
            			 ["End_x0020_Date", new Date(object.EndDate).toISOString()],
            			 ["ChildrenCareHours", object.ChildrenCareHours],
            			 ["TimeAdmin", object.IdTimeAdmin]
            			],
        completefunc: function (xData, Status) {
            console.log("Request Sent for Approval!" + " " + Status);
        }
    });

}

/*
function addListItem(object) {
    //funckja dodajaca - do htmla musi być dodana:
    // a) dbRest.js
    // b) sp services - <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices-2014.02.min.js"></script>   
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "Requests",
        valuepairs: [["Title", object.RequestCodeSAP],
            			 ["Date", object.StartDate],
            			 ["Status", object.Status],
            			 ["Approver", object.ApproverID],
            			 ["Reason", object.Reason],
            			 ["WorkSchedule", object.WorkScheduleID],
            			 ["OvertimeNo", object.OvertimeNo],
            			 ["HolidaysNo", object.HolidaysNo],
            			 ["End_x0020_Date", object.EndDate],
            			 ["ChildrenCareHours", object.ChildrenCareHours],
            			 ["TimeAdmin", object.IdTimeAdmin]
            			],
        completefunc: function (xData, Status) {
            console.log("Request Sent for Approval!" + " " + Status);
        }
    });

}
*/

function createNewChildItem(object) {
    //set internalID of the new child item to object ID (if it's edited for the first time) or to object internal ID (if it's edited for more than one time)
    var internalID = determineAboutInternalID(object.ID, object.InternalID);
    var newStatus = findIDStatus("Changed");

    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: "Requests",
        valuepairs: [["Title", object.RequestCodeSAP],
            			 ["Date", new Date(object.StartDate).toISOString()],
            			 ["Status", newStatus],
            			 ["Approver", object.ApproverID],
            			 ["Reason", object.Reason],
            			 ["WorkSchedule", object.WorkScheduleID],
            			 ["OvertimeNo", object.OvertimeNo],
            			 ["HolidaysNo", object.HolidaysNo],
            			 ["End_x0020_Date", new Date(object.EndDate).toISOString()],
            			 ["ChildrenCareHours", object.ChildrenCareHours],
            			 ["TimeAdmin", object.IdTimeAdmin],
            			 ["InternalID", internalID]
            			],
        completefunc: function (xData, Status) {
            console.log("Data Saved!" + " " + Status);
        }
    });
};




function editRootItem(object) {
    //determine if internal ID should be changed or not
    var internalID = determineAboutInternalID(object.ID, object.InternalID);
    //choose the status of changed regardless of its ID
    var newStatus = findIDStatus("History");
    console.log(newStatus);
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: "Requests",
        ID: object.ID,
        valuepairs: [
                         ["InternalID", internalID],
                         ["Status", newStatus]
            			],
        completefunc: function (xData, Status) {
            console.log("Data Change Done!" + " " + Status);
        }
    });
};



function deleteStatusRootItem(ID, status) {
    var newStatus;
    // to be done
    if (status == findIDStatus("Submitted") || status == findIDStatus("Changed") || status == findIDStatus("Expired") || status == findIDStatus("Declined")) {
        newStatus = findIDStatus("Deleted");
    } else if (status == findIDStatus("Completed")) {
        newStatus = findIDStatus("Removing Completed");
    } else if (status == findIDStatus("Accepted")) {
        newStatus = findIDStatus("Removing Accepted");
    }
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: "Requests",
        ID: ID,
        valuepairs: [
                         ["Status", newStatus]
            			],
        completefunc: function (xData, Status) {
            console.log("Data Change Done!");
        }
    });
};

function findIDStatus(valueNeeded) {
    var newStatus;
    statuses.forEach(function (currentValue) {
        if (currentValue.Status == valueNeeded) {
            newStatus = currentValue.ID;
        };
    });
    return newStatus.toString();
}

function determineAboutInternalID(idPassed, internalIDPassed) {
    var internalID;
    if (internalIDPassed) {
        internalID = internalIDPassed;
    } else {
        internalID = idPassed;
    };
    return internalID.toString();
}





    
function updateStatusForThisRequest(typeString, ajdi) {


	if(typeString == "Accepted" || typeString == "Declined") {

	
		console.log("updateStatusForThisRequest for " + ajdi + " status: " + typeString);
		
		let fullObject = {};
		fullObject.ID = parseInt(ajdi);
		handlerCRUD(fullObject, typeString);
	
	} else {
		console.log("You're not allowed to do such things!");
	}
}





//***********************************************************************************************************************************************************
//nowa implementacja - do przetestowania jeszcze
function handlerCRUD(fullObject, operationType) {


    //console.log(fullObject); // OK
    //console.log(operationType); // OK

    let helpers = {
        statusID: function (valueNeeded) {

            let newStatus;

            statuses.forEach(function (currentValue) {
                if (currentValue.Status == valueNeeded) {
                    newStatus = currentValue.ID;
                }
            });

            return newStatus.toString();
        },
        internalID: function (fullObjId, fullObjInternalId) {

            console.log(fullObjId, fullObjInternalId);

            if (fullObjInternalId == '0') {
                return fullObjId;
            } else {
                return fullObjInternalId;
            }
        }
    };


    if (operationType == "Update") {


	    let valuepairs = [
			["Title", fullObject.RequestCodeSAP],
			["Date", new Date(fullObject.StartDate).toISOString()],
			["Approver", fullObject.ApproverID],
			["Reason", fullObject.Reason],
			["WorkSchedule", fullObject.WorkScheduleID],
			["OvertimeNo", fullObject.OvertimeNo],
			["HolidaysNo", fullObject.HolidaysNo],
			["End_x0020_Date", new Date(fullObject.EndDate).toISOString()],
			["ChildrenCareHours", fullObject.ChildrenCareHours],
			["TimeAdmin", fullObject.IdTimeAdmin],
		];



        /* this operation make sens only if update */

        let statusChanged = helpers.statusID("Changed");
        let statusHistory = helpers.statusID("History");

        //console.log("statusy pierwszy changed: ", statusChanged, statusHistory);
        console.log("inside update");
        //console.log(fullObject);
        console.log(fullObject.ID, fullObject.InternalID);

        let internalID = "" + helpers.internalID(fullObject.ID, fullObject.InternalID);
        console.log("internal ID ", internalID);



        valuepairs.push(["InternalID", '' + internalID]);
        valuepairs.push(["Status", helpers.statusID("Changed")]);

        console.log(valuepairs);

        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "New",
            listName: "Requests",
            valuepairs: valuepairs,
            completefunc: function (xData, Status) {
                console.log("New Changed!" + " " + Status);
            }
        });



        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "Requests",
            ID: fullObject.ID,
            valuepairs: [
                ["InternalID", internalID],
                ["Status", statusHistory]
            ],
            completefunc: function (xData, Status) {
                console.log("History Request!" + " " + Status);
            }
        });

    } else if (operationType == "Accepted") {
    
        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "Requests",
            ID: fullObject.ID,
            valuepairs: [["Status", helpers.statusID(operationType)]],
            completefunc: function (xData, Status) {
                console.log("Request Approved!" + " " + Status);
            }
        });

    } else if (operationType == "Declined") {
    
        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "Requests",
            ID: fullObject.ID,
            valuepairs: [["Status", helpers.statusID(operationType)]],
            completefunc: function (xData, Status) {
                console.log("Request Declined!" + " " + Status);
            }
        });

    } else if (operationType == "Create") {
    
    
	    let valuepairs = [
			["Title", fullObject.RequestCodeSAP],
			["Date", new Date(fullObject.StartDate).toISOString()],
			["Approver", fullObject.ApproverID],
			["Reason", fullObject.Reason],
			["WorkSchedule", fullObject.WorkScheduleID],
			["OvertimeNo", fullObject.OvertimeNo],
			["HolidaysNo", fullObject.HolidaysNo],
			["End_x0020_Date", new Date(fullObject.EndDate).toISOString()],
			["ChildrenCareHours", fullObject.ChildrenCareHours],
			["TimeAdmin", fullObject.IdTimeAdmin],
		];

        valuepairs.push(["InternalID", '0']);
        valuepairs.push(["Status", helpers.statusID("Submitted")]);


        console.log(valuepairs);

        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "New",
            listName: "Requests",
            valuepairs: valuepairs,
            completefunc: function (xData, Status) {
                console.log("Request Sent for Approval!" + " " + Status);
                let tmpstr = xData.responseText;
                let arr = tmpstr.split(" ");
                // console.log(arr);
                let ktory = 29;                
                arr.forEach( function(item, indx) {
                	if(item.indexOf("ows_ID=") == 0 ) {
                		ktory = indx;
                		
                		console.log(item);
                	}
                });
                // always 29? - i masz odpowiedz, ze nie zawsze jest to 29!!!

                //console.log( arr[ktory].replace('"','').replace('"','').split("=")[1] );
                // return parseInt( arr[29].replace('"','').replace('"','').split("=")[1] );
                let newAjdi = arr[ktory].replace('"','').replace('"','').split("=")[1];
                fullObject.ID = newAjdi;
            }
        });
    } else {



        let statusDelete;
        if (fullObject.Status == helpers.statusID("Accepted")) {
            statusDelete = helpers.statusID("Removing Accepted");
        } else if (fullObject.Status == helpers.statusID("Completed")) {
            statusDelete = helpers.statusID("Removing Completed");
        } else {
            statusDelete = helpers.statusID("Deleted");
        }
        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "Requests",
            ID: fullObject.ID,
            valuepairs: [
				["Status", statusDelete]
			],
            completefunc: function (xData, Status) {
                console.log("Data Deletion Done!");
            }
        });
    }
    
    
}
