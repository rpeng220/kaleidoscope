import {PROFILE, moveclick, existsclass, existselementid, existsquery,
existstag, trytype} from main
/// <reference path="jquery-3.5.1.js"/>

function login() {
    var emailfield = document.querySelector("input[data-automation-id=email]");
    var passwordfield = document.querySelector("input[data-automation-id=password]");
    emailfield.value = PROFILE.email;
    var inputevent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    emailfield.dispatchEvent(inputevent);
    passwordfield.value = PROFILE.password;
    passwordfield.dispatchEvent(inputevent);
    moveclick('div[data-automation-id=click_filter]');
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