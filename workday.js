import {PROFILE, moveclick, existsclass, existselementid, existsquery,
existstag, trytype, pollDOM} from "./main.js"
/// <reference path="jquery-3.5.1.js"/>

var inputevent = new Event('input', {
    bubbles: true,
    cancelable: true,
});

// Helper function to handle workday events. Fills out an input field and updates the value with site JS.
function changevalue(element, stringval) {
    element.value = stringval;
    element.dispatchEvent(inputevent);
}


function login() {
    const emailfield = document.querySelector("input[data-automation-id=email]");
    const passwordfield = document.querySelector("input[data-automation-id=password]");
    changevalue(emailfield, PROFILE.email);
    changevalue(passwordfield, PROFILE.password)
    moveclick('div[data-automation-id=click_filter]');
}

function personalinfo(nav, form) {
    //incomplete
    if (form == "default") { //we don't want to rely on page ordering if we don't have to, so this is the default.


    }
    if (form == "custom") { 
        const firstname = document.evaluate('//*[contains(text(), "First Name")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const lastname = document.evaluate('//*[contains(text(), "Last Name")]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        changevalue(firstname, PROFILE.firstname);
        changevalue(lastname, PROFILE.lastname);
        const address = document.evaluate("//*[contains(text(), 'Address Line 1')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const city = document.evaluate("//*[contains(text(), 'City')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const zipcode = document.evaluate("//*[contains(text(), 'Postal Code')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        const state = document.evaluate('//label[contains(text(), "State")]//following::div[2]//div[1]//div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        changevalue(address, PROFILE.address);
        changevalue(city, PROFILE.city);
        changevalue(zipcode, PROFILE.zip_code);
        state.click();
        var encapsulated_state = "\"" + PROFILE.state + "\"";
        pollDOM('//div[contains(text(),' + encapsulated_state + ')]');
        var targetstate = document.evaluate('//div[contains(text(),' + encapsulated_state + ')]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        targetstate.click()
        const phone = document.evaluate("//*[contains(text(), 'Phone Number')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        changevalue(phone, PROFILE.phone);
    }
    //done, send notification and wait for next page
}

function workday(nav, form) {
    var currentpage = "none"
    if (nav == "we51") {
        currentpage = document.querySelector('[data-automation-id="taskOrchCurrentItemLabel"]').innerText;
    }
    if (nav == "progressbar") {
        currentpage = document.getElementsByClassName('css-1uso8fp')[0].innerText;
    }
    if (nav == "h2") {
        currentpage = document.getElementsByTagName('h2')[0].innerText;
    }
    var pagelower = currentpage.toLowerCase();
    if (existsquery('[data-automation-id="bottom-navigation-next-button"]')) {
        form = "default";
    } else if (existsquery('[data-automation-id="wd-CommandButton_next"]')) {
        form = "custom";
    }
    if (pagelower.includes("quick apply")) {
        if (form == "default") {
            document.querySelector('[data-automation-id="bottom-navigation-next-button"]').click();
        } else {
            document.querySelector('[data-automation-id="wd-CommandButton_next"]').click();
        }
        return workday(nav, form);
    }
    if (pagelower.includes('my information')) {
        return personalinfo(nav, form);
    }
    if (pagelower.includes('my experience')) {
        return experience(nav, form);
    }
    if (pagelower.includes('disclosure')) {
        return disclosure(nav, form);
    }
    if (pagelower.includes('identify')) {
        return disability(nav, form);
    }
    if (pagelower.includes("review")) {
        if (form == 'default') {
            document.querySelector('[data-automation-id="bottom-navigation-next-button"]').click()
        } else {
            document.querySelector('[data-automation-id="wd-CommandButton_next"]').click()
        }
        return
    } else {
        print("You are on an application questions page. Please fill out the questions and click continue.")
        pagesleep(nav)
        return workday(nav, form)
    }
}

function initWorkday() {
    moveclick('button[title="Apply"]');
    var currenttext = document.getElementsByTagName("body")[0].innerText;
    var lowertext = currenttext.toLowerCase();
    if (lowertext.includes('sign in')) {
        login();
        if (existsquery('[data-automation-id="taskOrchCurrentItemLabel"]')) {
            return workday("we51", "none");
        }
        if (existsclass('css-1uso8fp')) {
            return workday("progressbar", "none");
        } else if (existstag('h2')) {
            return workday("h2", "none");
        }
        console.log("you weren't supposed to get here");
    }
}