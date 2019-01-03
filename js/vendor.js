// this section of assigning was moved to index.html head
/*
var currentUserSP = loadUser();
var statuses = loadStatuses();
var times = loadWorkingHours();
var presenceCodes = loadPresenceCodes();
var nationalHolidays = loadNationalHolidays();
var requests = loadRequests("Author", "4", "05-28-2018", 9455);
*/

var currentUserSP;
var statuses;
var times;
var presenceCodes;
var nationalHolidays;
var requests;
var myUsers;

var specialRequests;



var graphStatuses = [
    "far fa-envelope",
    "fas fa-check",
    "fas fa-exclamation-triangle",
    "far fa-handshake",
    "far fa-frown",
    "fas fa-undo",
    "fas fa-times",
    "fas fa-times-circle",
    "fas fa-archive",
    "fas fa-times",
    "far fa-clock"
];



var G_HOW_MANY_HOURS_NEED_TO_BE_ADDED_TO_BE_INLINE_WITH_SP = 0 - parseInt((new Date()).getTimezoneOffset() / 60);


var visibleStatuses = [1, 2, 3, 4, 5, 6];
var preStatuses = [1, 6];
var calcStatuses = [2, 4];
var planStatuses = [1, 2, 4, 6];
var redStatuses = [3, 5];

var editedRequest = null;

var overtimeCodes = [120, 121, 115];
var homeofficeCode = 124;
var urlopCode = 81;
var opiekaCodes = [85, 86]; // h, days


var G_USERS = "SOEGliwiceBulb";

var globalDateFromCalendar = "";
