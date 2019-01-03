$(function () {
	
	/*
    var state = history.state || {};
    var reloadCount = state.reloadCount || 0;
    if (performance.navigation.type === 1) { // Reload
        state.reloadCount = ++reloadCount;
        history.replaceState(state, null, document.URL);
    } else if (reloadCount) {
        delete state.reloadCount;
        reloadCount = 0;
        history.replaceState(state, null, document.URL);
    }

    console.log("reload count: " + reloadCount);


    



    if (reloadCount < 2) {
        setTimeout(globalRefresh, 600);
    } else {
        $("#loader1").hide();
        document.getElementsByTagName("html")[0].style.visibility = "visible";    
    }
    */


    $("#loader1").hide();
    document.getElementsByTagName("html")[0].style.visibility = "visible";  



    // $("#modal-startup").modal('show');



    /* for modal for new request */
    $("#datetimepicker1").datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });
    $("#datetimepicker2").datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });


    /* for moedal for edit request */
    $("#edatetimepicker1").datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });
    $("#edatetimepicker2").datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });

    let d = new Date();
    datePickerHandler.generateDatePicker("myDatePicker", "" + d.getFullYear(), "" + (d.getMonth() + 1));

    setTimeout(function () {
        let d2 = new Date();
        datePickerHandler.fillWithRequests("myDatePicker", "" + d2.getFullYear(), "" + (d2.getMonth() + 1));
    }, 400);



    //setTimeout(checkerForRefresh, 600);

	$("#loader1").hide();


});



function checkerForRefresh() {

    let elTitle = document.getElementById("h1-app-title");
    console.log(elTitle.innerHTML.substr(0, 6));
    if (elTitle.innerHTML.substr(0, 6) != 'Glider') {
        // alert("test"); // looks like it works! :)
        globalRefresh();

    }
}
