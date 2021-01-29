function selectItem(xpath, input) {
        var mousedown = new Event("mousedown");
        var a1 = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        a1.dispatchEvent(mousedown);
        var a2 = document.querySelector("#select2-drop > div > input");
        console.log(Date.now() + "  BB");
        console.log(a2);
        a2.value = input;
        var keyupchange = new Event("keyup-change");
        a2.dispatchEvent(keyupchange);         
        setTimeout(function(){        
            var objecttarget = document.evaluate("//*[contains(text(), '" + input + "')]/ancestor::li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
            console.log(objecttarget);

            console.log(Date.now() + "  CC");
            var mousedown = new Event("mousedown", {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                
            var mouseup = new Event("mouseup", {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                
            objecttarget.dispatchEvent(mousedown);
                           
            objecttarget.dispatchEvent(mouseup);
            }, 1500);
}


function simplexpathtrytype(xpath, input) {
    if (existsxpath(xpath)) {
        var target = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        target.value = input;
    }
}

function greenhouse() {
    setTimeout(function() {
        trytype("input[id='first_name']", PROFILE.first_name);
        trytype("input[id='last_name']", PROFILE.last_name);
        trytype("input[id='email']", PROFILE.email);
        trytype("input[id='phone']", PROFILE.phone);
        trytype("input[aria-label='Education Start Month']", PROFILE.uni_start_month);
        trytype("input[aria-label='Education Start Year']", PROFILE.uni_start_year);
        trytype("input[aria-label='Education End Month']", PROFILE.grad_month);
        trytype("input[aria-label='Education End Year']", PROFILE.grad_year);
        simplexpathtrytype('//*[contains(text(), "LinkedIn Profile")]//input[@type="text"]', PROFILE.linkedin);
        simplexpathtrytype('//*[contains(text(), "Github")]//input[@type="text"]', PROFILE.github);
        simplexpathtrytype('//*[contains(text(), "Website")]//input[@type="text"]', PROFILE.website)
        selectItem("//*[@id='s2id_education_degree_0']//a", PROFILE.degree);
        setTimeout(function() {
            selectItem("//*[@id='s2id_education_discipline_0']//a", PROFILE.major);
            setTimeout(function() { completeNotification(); }, 1200);
        }, 3000);
    }, 1000);
}