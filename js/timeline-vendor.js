var timesArray = [

    "07:00",
    "08:00"
];



var sortujPoStarcie = function (tmpArr) {



    // console.log(tmpArr);

    var sortedArr = [];
    j = 0

    while (tmpArr.length > 0) {


        ktory = 0;
        arr2 = tmpArr[0].StartDate.split("T")
        d = arr2[0];
        t = arr2[1];
        darr = d.split("-");
        tarr = t.split(":");

        tarr[2] = tarr[2].replace("Z", "");

        //console.log(darr);
        //console.log(tarr);

        compDate = new Date(
            parseInt(darr[0]),
            parseInt(darr[1]),
            parseInt(darr[2]),
            parseInt(tarr[0]),
            parseInt(tarr[1]),
            0
        );

        for (var i = 0; i < tmpArr.length; i++) {

            arr2 = tmpArr[i].StartDate.split("T")
            d = arr2[0];
            t = arr2[1];
            darr = d.split("-");
            tarr = t.split(":");
            tarr[2] = tarr[2].replace("Z", "");

            //console.log(darr);
            //console.log(tarr);

            tmpDate = new Date(
                parseInt(darr[0]),
                parseInt(darr[1]),
                parseInt(darr[2]),
                parseInt(tarr[0]),
                parseInt(tarr[1]),
                0
            );


            //console.log(tmpDate.getTime() + " " + tmpDate.toLocaleDateString());

            if (tmpDate.getTime() < compDate.getTime()) {
                ktory = i;
            }
        }

        //console.log(tmpArr[ktory]);

        sortedArr[j++] = tmpArr[ktory];

        tmpArr.splice(ktory, 1);

    }


    // OK!
    //console.log(tmpArr);
    //console.log(sortedArr);
    tmpArr = sortedArr;



    return tmpArr;
}
