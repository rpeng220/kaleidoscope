// import trytype from main

// // Changes text value if element exists. Else, does nothing.
// function trytype(query, text) {
//     if (existsquery(query)) {
//         document.querySelector(query).value = text;
//     } 
// }
function greenhouseSelect() {
    var testevent = new Event("mousedown");
    var a1 = document.getElementsByClassName("select2-choice select2-default")[0];
    a1.dispatchEvent(testevent);
    
    var a2 = document.querySelector("#select2-drop > div > input")
    a2.value = "University of California - Berkeley";
    var testevent2 = new Event("keyup-change");
    var a3 = document.querySelector("#select2-drop > div > input")
    a3.dispatchEvent(testevent2);
     setTimeout(function(){  
        var ul = document.getElementsByClassName("select2-results");

        const childern = ul[2].childNodes;

        // iterate over all child nodes
        var testevent4 = new Event("mousedown", {
                                bubbles: true,
                                cancelable: true,
                            });
        childern[0].dispatchEvent(testevent4);
        
        var testevent5 = new Event("mouseup", {
                                bubbles: true,
                                cancelable: true,
                            });
        childern[0].dispatchEvent(testevent5);
        },    
        1000
    );
}




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
        var a1 = document.getElementsByClassName("select2-choice select2-default")[1];
        a1.dispatchEvent(testevent);
        var a2 = document.querySelector("#select2-drop > div > input")
                a2.value = "Bachelor's Degree";
        var testevent2 = new Event("keyup-change");
        var a3 = document.querySelector("#select2-drop > div > input")
            a3.dispatchEvent(testevent2);
         setTimeout(function(){ 
                     
                     
            var ul = document.getElementsByClassName("select2-results");

            const childern = ul[2].childNodes;

            // iterate over all child nodes
            var testevent4 = new Event("mousedown", {
                                    bubbles: true,
                                    cancelable: true,
                                });
            childern[0].dispatchEvent(testevent4);
            
            var testevent5 = new Event("mouseup", {
                                    bubbles: true,
                                    cancelable: true,
                                });
            childern[0].dispatchEvent(testevent5);
            },    
            3000
        );
        // var testevent = new Event("mousedown");
        // document.getElementsByClassName("select2-choice select2-default")[0].dispatchEvent(testevent);
        // console.log("success4");
        // function testo() { 
        //     document.querySelector("#select2-drop > div > input").value = "University of California - Berkeley";
        //     console.log("success5");
        //     var testevent2 = new Event("keyup-change");
        //     document.querySelector("#select2-drop > div > input").dispatchEvent(testevent2);
        // }
        // waitForElement("#select2-drop > div > input").then(testo());
        // var testevent3 = new Event("mouseup");
        // document.querySelector("#select2-drop").dispatchEvent(testevent3);

        // document.getElementsByClassName("select2-result-label")[0].click();
        // var testevent4 = new Event("keyup", {"keyCode": 13});
        // setTimeout(function() {
        //     document.getElementsByClassName("select2-focusser select2-offscreen")[0].dispatchEvent(testevent4);
        // }, 500);
    }, 1000);
}