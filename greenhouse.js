// import trytype from main

// // Changes text value if element exists. Else, does nothing.
// function trytype(query, text) {
//     if (existsquery(query)) {
//         document.querySelector(query).value = text;
//     } 
// }


function greenhouse() {
    setTimeout(function() {
        trytype("input[id='first_name']", PROFILE.first_name)
        trytype("input[id='last_name']", PROFILE.last_name)
        trytype("input[id='email']", PROFILE.email)
        trytype("input[id='phone']", PROFILE.phone)
        trytype("input[aria-label='Education Start Month']", PROFILE.uni_start_month)
        trytype("input[aria-label='Education Start Year']", PROFILE.uni_start_year)
        trytype("input[aria-label='Education End Month']", PROFILE.grad_month)
        trytype("input[aria-label='Education End Year']", PROFILE.grad_year)
        var testevent = new Event("mousedown");
        document.getElementsByClassName("select2-choice select2-default")[0].dispatchEvent(testevent);
        // document.querySelector("#select2-drop > div > input").value = "University of California - Berkeley";
        // var testevent2 = new Event("keyup-change");
        // document.querySelector("#select2-drop > div > input").dispatchEvent(testevent2);
        // var testevent3 = new Event("mouseup");
        // document.querySelector("#select2-drop").dispatchEvent(testevent3);

        // document.getElementsByClassName("select2-result-label")[0].click();
        // var testevent4 = new Event("keyup", {"keyCode": 13});
        // setTimeout(function() {
        //     document.getElementsByClassName("select2-focusser select2-offscreen")[0].dispatchEvent(testevent4);
        // }, 500);
    }, 1000);
}