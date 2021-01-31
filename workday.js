// import {PROFILE, moveclick, existsclass, existselementid, existsquery,
// existstag, trytype, pollDOM, existsxpath} from "./main.js"
/// <reference path="jquery-3.5.1.js"/>

var inputevent = new Event('input', {
    bubbles: true,
    cancelable: true,
});

var inputevent2 = new Event('input', {
    bubbles: true,
    cancelable: false,
});

var textinputevent = new Event('textInput', {
    bubbles: true,
    cancelable: true,
});

var keydownevent = new Event('keydown', {
    bubbles: true,
});

var selectevent = new Event('select', { 
    bubbles: true,
    cancelable: false,
})


// Helper function to handle workday events. Fills out an input field and updates the value with site JS.
function changevalue(element, stringval) {
    element.value = stringval;
    element.dispatchEvent(inputevent);
}

function trytypexpath(xpath, stringval) {
    ele = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (ele) {
        ele.value = stringval;
        ele.dispatchEvent(changeevent);
    }
}


// Trytype for Workday apps using querySelector
function trytypeworkday(query, stringval) {
    if (document.querySelector(query)) {
        var ele = document.querySelector(query);
        ele.value = stringval;
        ele.dispatchEvent(changeevent);
    }
}

// Trytype for Workday Listed Inputs
function trytypelist(xpath, posn, stringval) {
    var ele = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(posn);
    if (ele) {
        ele.value = stringval;
        ele.dispatchEvent(changeevent);
    }
} 

function dropdownSelect(xpath1, xpath2) {
    var dropdown = document.evaluate(xpath1, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    dropdown.click()
    waitForXPath(xpath2).then(function() {
        document.evaluate(xpath2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click()
    });
} 

function setReactInputValue(query, elevalue) {  
    var ele = document.querySelector(query);
    if (ele) {
        ele.value = elevalue;
        ele.dispatchEvent(new Event('blur'));
    }
}

function reactTypeList(xpath, posn, stringval) {
    var ele = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(posn);
    if (ele) {
        ele.value = stringval;
        ele.dispatchEvent(new Event('blur'));
    }
} 

function workdayLogin() {
    var version = "none"
    var emailfield = document.querySelector("input[data-automation-id=email]");
    var passwordfield = document.querySelector("input[data-automation-id=password]"); 
    if (existsquery("input[data-automation-id=email]")) {
        version = "modern";
    } else {
        emailfield = document.querySelector("input[aria-label=Email Address]");
        passwordfield = document.querySelector("input[aria-label=Password]");
        version = "archaic"
    }
    changevalue(emailfield, PROFILE.email);
    changevalue(passwordfield, PROFILE.password);
    setTimeout(function() {
        document.querySelector('div[data-automation-id=click_filter]').click();
        // moveclick('div[data-automation-id=click_filter]');
    }, 1000);
    // setTimeout(function() {
    //     var currenttext = document.getElementsByTagName("body")[0].innerText;
    //     if (currenttext.includes("ERROR: Invalid Username/Password")) {
    //         register(version);
    //     } else {
    //         completeNotification();
    //     }
    // }, 2000);
    return
}

function workdayRegister() {
    var version = "none"
    if (existsquery("input[data-automation-id=email]")) {
        version = "modern";
    } else {
        version = "archaic"
    }
    if (version == "modern") { 
        if (existsquery('[data-automation-id=email')) {
            changevalue(document.querySelector('[data-automation-id=email'), PROFILE.email)
        }
        if (existsquery('[data-automation-id=userName')) {
            changevalue(document.querySelector('[data-automation-id=userName'), PROFILE.email)
        }
        changevalue(document.querySelector('[data-automation-id=password'), PROFILE.password)
        if (existsquery('[data-automation-id=verifyPassword]')) {
            changevalue(document.querySelector('[data-automation-id=verifyPassword]'), PROFILE.password)
        }
        if (existsquery('[data-automation-id=confirmPassword]')) {
            changevalue(document.querySelector('[data-automation-id=confirmPassword]'), PROFILE.password)
        }
        if (existsquery('[data-automation-id=createAccountCheckbox]')) {
            document.querySelector('[data-automation-id=createAccountCheckbox').click();
        }
        document.querySelector('[data-automation-id=click_filter]').click()
        completeNotification();
    }
    if (version == "archaic") {
        function archaic() {
            if (existsquery('[aria-label=Email Address')) {
                changevalue(document.querySelector('[aria-label=Email Address'), PROFILE.email);
            }
            changevalue(document.querySelector('[aria-label=Password'), PROFILE.password);
            if (existsquery('[aria-label=Verify New Password]')) {
                changevalue(document.querySelector('[aria-label=Verify New Password]'), PROFILE.password);
            }
            if (existsquery('[data-automation-id=checkboxPanel]')) {
                document.querySelector('[data-automation-id=checkboxPanel]').click();
            }
            document.querySelector('[data-automation-id=click_filter]').click();
            completeNotification();
        }
        setTimeout(archaic, 300);
    }
    return;
}

// Having problems with string parsing literal quotations into encapsulated_state
function workdayPersonalinfo(nav, form, clickelement) {
    function clickonstate() {
        var targetstate = document.evaluate('//div[contains(text(), "' + PROFILE.state + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        targetstate.click();
    }
    if (form == "default") { //we don't want to rely on page ordering if we don't have to, so this is the default.
        // trytypeworkday('[data-automation-id="legalNameSection_firstName"]', PROFILE.first_name);
        setReactInputValue('[data-automation-id="legalNameSection_firstName"]', PROFILE.first_name);
        setReactInputValue('[data-automation-id="legalNameSection_lastName"]', PROFILE.last_name);
        setReactInputValue('[data-automation-id="legalNameSection_primary"]', PROFILE.last_name);
        setReactInputValue('[data-automation-id="addressSection_addressLine1"]', PROFILE.street_address);
        setReactInputValue('[data-automation-id="addressSection_city"]', PROFILE.city);
        setReactInputValue('[data-automation-id="addressSection_postalCode"]', PROFILE.zip_code);
        setReactInputValue('[data-automation-id="phone-number"]', PROFILE.phone);
        const state = document.evaluate('//label[contains(text(), "State")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        state.click();
        waitForXPath('//div[contains(text(), "California")]').then(clickonstate());
        completeNotification();
    }
    if (form == "custom") { 
        trytypexpath('//*[contains(text(), "First Name")]//following::input[1]', PROFILE.first_name);
        trytypexpath('//*[contains(text(), "Last Name")]//following::input[1]', PROFILE.last_name);
        const state = document.evaluate('//label[contains(text(), "State")]//following::div[2]//div[1]//div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        trytypexpath("//*[contains(text(), 'Address Line 1')]//following::input[1]", PROFILE.street_address);
        trytypexpath("//*[contains(text(), 'City')]//following::input[1]", PROFILE.city);
        trytypexpath("//*[contains(text(), 'Postal Code')]//following::input[1]", PROFILE.zip_code);
        const phone = document.evaluate("//*[contains(text(), 'Phone Number')]//following::input[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
        phone.value = PROFILE.phone;
        phone.dispatchEvent(changeevent);
        state.click();
        waitForXPath('//div[contains(text(), "' + PROFILE.state + '")]').then(clickonstate());
        completeNotification();
    }
    //done, send notification and wait for click
    function pagechange() {
        setTimeout(function() {
            if (nav == 1) {
                waitForXPath('//*[@data-automation-id="taskOrchCurrentItemLabel"]').then(createPopup("workday"));
            } else if (nav == 2) {
                waitForElement('[class=css-1uso8fp]').then(createPopup("workday"));
            } else if (nav == 3) {
                waitForElement('h2').then(createPopup("workday"))
            }
        }, 3000);
    }
    clickelement.addEventListener("click", pagechange);
    return;
}

function workdayExperience(nav, form) {
    var datecount = 1;
    var currenttext = document.getElementsByTagName("body")[0].innerText;
    var edusection = false;
    var langsection = false;
    if (form == "default") {
        if (currenttext.includes("Job Title") == false) {
            document.querySelector("[aria-label='Add Work Experience']").click();
        function defaultfunc() {
            setReactInputValue('[data-automation-id="jobTitle"]', PROFILE.job_title1);
            setReactInputValue('[data-automation-id="company"]', PROFILE.employer1);
            setReactInputValue('[data-automation-id="location"]', PROFILE.job_location1);
            setReactInputValue('[data-automation-id="description"]', PROFILE.job_desc1);
            reactTypeList('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateInputWrapper"]', 0, PROFILE.job_start_month1 + PROFILE.job_start_year1);
            if (PROFILE.current_job1 == true) {
                document.querySelector('[data-automation-id="currentlyWorkHere"]').click()
            } else {
                reactTypeList('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_end_month1 + PROFILE.job_end_year1);
                datecount += 1;
            }
            if (PROFILE.employer2 != "") {
                waitForXPath('//*[@aria-label="Add Another Work Experience"]').then(function() {
                    document.querySelector('[aria-label="Add Another Work Experience"]').click()
                    setTimeout(function() {
                        reactTypeList('//*[@data-automation-id="jobTitle"]', 1, PROFILE.job_title2);
                        reactTypeList('//*[@data-automation-id="company"]', 1, PROFILE.employer2);
                        reactTypeList('//*[@data-automation-id="location"]', 1, PROFILE.job_location2);
                        reactTypeList('//*[@data-automation-id="description"]', 1, PROFILE.job_desc2);
                        reactTypeList('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_start_month2 + PROFILE.job_start_year2);
                        datecount += 1;
                        if (PROFILE.current_job2 == true) {
                            document.evaluate('//*[@data-automation-id="currentlyWorkHere"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).click();
                        } else {
                            reactTypeList('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_end_month2 + PROFILE.job_end_year2);
                            datecount += 1;
                        }
                        if (PROFILE.employer3 != "") {
                            waitForElement('[aria-label="Add Another Work Experience"]').then(function() {
                                document.querySelector('[aria-label="Add Another Work Experience"]').click()
                                setTimeout(function() {
                                    reactTypeList('//*[@data-automation-id="jobTitle"]', 2, PROFILE.job_title3);
                                    reactTypeList('//*[@data-automation-id="company"]', 2, PROFILE.employer3);
                                    reactTypeList('//*[@data-automation-id="location"]', 2, PROFILE.job_location3);
                                    reactTypeList('//*[@data-automation-id="description"]', 2, PROFILE.job_desc3);
                                    reactTypeList('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_start_month3 + PROFILE.job_start_year3);
                                    datecount += 1;
                                    if (PROFILE.current_job2 == true) {
                                        document.evaluate('//*[@data-automation-id="currentlyWorkHere"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2).click();
                                    } else {
                                        reactTypeList('//*[@data-automation-id="dateInputWrapper"]', datecount, PROFILE.job_end_month3 + PROFILE.job_end_year3);
                                        datecount += 1;
                                        }
                                    }, 2000)
                                });
                            }
                        }, 2000);
                    });
                }
                if (currenttext.includes("Degree") || document.querySelector('[aria-label="Add Education"]')) {
                    edusection = true;
                    if (currenttext.includes("Degree") == false) {
                        document.querySelector("[aria-label='Add Education']").click();
                        setTimeout(function() {
                            setReactInputValue("[data-automation-id='school']", PROFILE.university);
                            setReactInputValue("[data-automation-id='gpa']", PROFILE.gpa);
                            reactTypeList('//*[@data-automation-id="educationSection"]//*[@data-automation-id="dateInputWrapper"]', 0, PROFILE.uni_start_year);
                            reactTypeList('//*[@data-automation-id="educationSection"]//*[@data-automation-id="dateInputWrapper"]', 1, PROFILE.grad_year);
                            document.querySelector("[data-automation-id='degree']").click();
                            setTimeout(document.evaluate('//div[contains(text(), "Bachelors Degree")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click(), 800);
                            // Degree Input Box
                            // setTimeout(function() {
                            //     document.querySelector('[data-automation-id="multiselectInputContainer"]').click();
                            //     setTimeout(function() {
                            //         trytypeworkday('[data-automation-id="searchBox"]', PROFILE.major);
                            //         setTimeout(function() {
                            //             var major = '[data-automation-label="' + PROFILE.major + '"]';
                            //             document.querySelector(major).click();
                            //             }, 600);
                            //         }, 600)
                            //     }, 1000)
                            }, 2000);
                        }
                    }
                if (existsquery('[aria-label="Add Languages"]') || currenttext.includes('native language')) {
                    langsection = true;
                    // language ttff 
                    if (currenttext.includes("native language") == false) {
                        document.querySelector("[aria-label='Add Languages']").click();
                        setTimeout(function() {
                            document.querySelector("[data-automation-id='language']").click();
                            setTimeout(document.evaluate('//div[contains(text(), "English")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click(), 500);
                            }, 1000);
                        setTimeout(function() {
                            document.querySelector("[data-automation-id='languageProficiency-0']").click();
                            setTimeout(document.evaluate('//div[contains(text(), "Native")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click(), 1500);
                        }, 2000);
                        setTimeout(function() {
                            document.querySelector('[data-automation-id="nativeLanguage"]').click();
                            completeNotification();
                        }, 2400);
                    }
            //upload resume here
            //click code goes here if the other click doesnt owrk
                }
            //trytypelist
            }
        setTimeout(function() { defaultfunc()}, 2000);
        // waitForElement('[data-automation-id="jobTitle"]').then(setTimeout(function() { defaultfunc() }, 1000));
        }
    }
    if (form == "custom") {
        if (currenttext.includes("Job Title") == false) {
            document.evaluate('//*[contains(text(), "Work Experience")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
        }
        function custom() {
            setTimeout(function() {
            trytypexpath('//*[contains(text(), "Job Title")]//following::input[1]', PROFILE.job_title1);
            trytypexpath('//*[contains(text(), "Company")]//following::input[1]', PROFILE.employer1);
            trytypexpath('//*[contains(text(), "Location")]//following::input[1]', PROFILE.job_location1);
            trytypexpath('//*[contains(text(), "Role Description")]//following::textarea[1]', PROFILE.job_desc1);
            job1input = document.evaluate('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            var jobstart1month = document.evaluate('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateSectionMonth"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            job1input.dispatchEvent(selectevent);
            jobstart1month.setAttribute("aria-valuenow", PROFILE.grad_month);
            jobstart1month.innerText = PROFILE.grad_month;
            job1input.dispatchEvent(inputevent2);
            // jobstart1month.dispatchEvent(changeevent);
            var jobstart2month = document.evaluate('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateSectionYear"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            jobstart2month.setAttribute("aria-valuenow", PROFILE.job_start_year1);
            jobstart2month.innerText = PROFILE.job_start_year1
            job1input.dispatchEvent(inputevent2);
            job1input.dispatchEvent(changeevent);
            // trytypexpath('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', PROFILE.job_start_month1 + PROFILE.job_start_year1);
            if (PROFILE.current_job1 == true) {
                document.evaluate('(//label[contains(text(), "currently work here")])[1]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
            } else {
                trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_end_month1 + PROFILE.job_end_year1);
                datecount += 1
            }
        }, 1000);
            if (PROFILE.employer2 != "") {
                setTimeout(function() {
                    document.evaluate('//*[contains(text(), "Work Experience")]//following::button[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                    setTimeout(function() {
                        trytypexpath('(//*[contains(text(), "Job Title")])[3]//following::input[1]', PROFILE.job_title2);
                        trytypexpath('(//*[contains(text(), "Location")])[3]//following::input[1]', PROFILE.job_location2);
                        trytypexpath('(//*[contains(text(), "Company")])[3]//following::input[1]', PROFILE.employer2);
                        trytypexpath('(//*[contains(text(), "Role Description")])[3]//following::textarea[1]', PROFILE.job_desc2);
                        trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_start_month2 + PROFILE.job_start_year2);
                        datecount += 1;
                        if (PROFILE.current_job2 == true) {
                            document.evaluate('(//label[contains(text(), "currently work here")])[2]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                        } else {
                            trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_end_month2 + PROFILE.job_end_year2);
                            datecount += 1;
                        }
                        setTimeout(function() {
                            trytypexpath('(//*[contains(text(), "Job Title")])[last()]//following::input[1]', PROFILE.job_title3);
                            trytypexpath('(//*[contains(text(), "Company")])[last()]//following::input[1]', PROFILE.employer3);
                            trytypexpath('(//*[contains(text(), "Location")])[last()]//following::input[1]', PROFILE.job_location3);
                            trytypexpath('(//*[contains(text(), "Role Description")])[last()]//following::textarea[1]', PROFILE.job_desc3);
                            trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_start_month3 + PROFILE.job_start_year3);
                            datecount += 1;
                            if (PROFILE.current_job2 == true) {
                                document.evaluate('(//label[contains(text(), "currently work here")])[3]//following::input[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                            } else {
                                trytypelist('//*[contains(text(), "Work Experience")]//following::*[@data-automation-id="dateWidgetInputBox"]', datecount, PROFILE.job_end_month3 + PROFILE.job_end_year3);
                                datecount += 1;
                            }
                        }, 500)
                    }, 1000)

                }, 2000);
            }
            //education + language stuff
            if (currenttext.includes("Degree") || existsxpath('//*[contains(text(), "Education")]//following::button[1]')) {
                edusection = true;
                if (currenttext.includes("Degree") == false) {
                    document.evaluate('//*[contains(text(), "Education")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                }
                setTimeout(function() {
                    trytypexpath('(//*[contains(text(), "University")])//following::input[1]', PROFILE.university);
                    //change degree type later
                    dropdownSelect('//*[contains(text(), "Degree")]//following::*[@data-automation-id="selectWidget"][1]', '//*[@data-automation-label="' + PROFILE.degree + '"]')
                    trytypexpath('(//*[contains(text(), "Overall Result")])//following::input[1]', PROFILE.gpa);
                    trytypelist('//*[contains(text(), "Education")]//following::*[@data-automation-id="dateWidgetInputBox"]', 0, PROFILE.uni_start_year);
                    trytypelist('//*[contains(text(), "Education")]//following::*[@data-automation-id="dateWidgetInputBox"]', 1, PROFILE.grad_year);
                    //major
                }, 1200)
            }
            if (currenttext.includes("native language") || existsxpath('//*[contains(text(), "Languages")]//following::button[1]')) {
                langsection = true;
                if (currenttext.includes("native language") == false) {
                    document.evaluate('//*[contains(text(), "Languages")]//following::button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                }
                setTimeout(function() {
                    // dropdownSelect('//label[contains(text(), "Language")]//following::*[@data-automation-id="selectWidget"][1]', '//*[@data-automation-label="English"]')
                    //need to learn how to close the degree dropdown first
                    document.evaluate('(//label[contains(text(), "native language")])//following::div[@data-automation-id="checkboxPanel"][1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
                    completeNotification();
                }, 6000)
            }
        //upload resume goes here
        }
        waitForXPath('//*[contains(text(), "Job Title")]//following::input[1]').then(custom());
    }
}

function workday(nav, form, clickelement) {
    //wait for DOM pageload to complete
    var currenttext = document.getElementsByTagName("body")[0].innerText;
    var lowertext = currenttext.toLowerCase();
    if (existsxpath('//button[contains(text(), "Create Account")]')) {
        return workdayRegister();
    }
    if (lowertext.includes('sign in')) {
        return workdayLogin();
    }
    var currentpage = "none";
    var currentelement;
    if (existsquery('[data-automation-id="taskOrchCurrentItemLabel"]')) {
        nav = 1;
        currentelement = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        currentpage = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText;
    }
    if (existsclass('css-1uso8fp')) {
        nav = 2;
        currentelement = document.getElementsByClassName('css-1uso8fp')[0];
        currentpage = document.getElementsByClassName('css-1uso8fp')[0].innerText;
    } else if (existstag('h2')) {
        nav = 3;
        currentelement = document.getElementsByTagName('h2')[0];
        currentpage = document.getElementsByTagName('h2')[0].innerText;
    }
    var pagelower = currentpage.toLowerCase();
    var clickelement;
    if (existsquery("[data-automation-id='bottom-navigation-next-button']")) {
        form = "default";
        clickelement = document.querySelector("[data-automation-id='bottom-navigation-next-button']");
    } else if (existsquery('[data-automation-id="wd-CommandButton_next"]')) {
        form = "custom";
        clickelement = document.querySelector('[data-automation-id="wd-CommandButton_next"]');
    }
        // console.log(pagelower.includes("quick apply"));
        // if (pagelower.includes("quick apply")) {
        //     console.log("got here");
        //     if (form == "default") {
        //         document.querySelector("[data-automation-id='bottom-navigation-next-button']").click()
        //     } else {
        //         document.querySelector('[data-automation-id="wd-CommandButton_next"]').click()
        //     }
        // }
    if (pagelower.includes("my information")) {
        return workdayPersonalinfo(nav, form, clickelement);
    }
    if (pagelower.includes("my experience")) {
        return workdayExperience(nav, form);
    } else {
        function pagechange() {
            setTimeout(function() {
                if (currentelement) {
                    return workday(nav, form, clickelement);
                }
            }, 7000);
        }
        clickelement.addEventListener("click", pagechange);
        // function checkforchange() {
        //     if (nav == 1) {
        //         currentpage2 = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText;
        //     } else if (nav == 2) {
        //         currentpage2 = document.getElementsByClassName('css-1uso8fp')[0].innerText;
        //     } else if (nav == 3) {
        //         currentpage2 = document.getElementsByTagName('h2')[0].innerText;
        //     }
        //     if (currentpage2 == currentpage) {
        //         document.removeEventListener("DOMContentLoaded");
        //         console.log("different page, return workday");
        //         // observer.disconnect()
        //         return workday(nav, form)
        //     }
        // }
        // document.addEventListener("DOMContentLoaded", checkforchange());
        // ORRRR use event listener here with the conditional below....
        // var observer = new MutationObserver(mutations => {
        //     for(let mutation of mutations) {
                
        //         var currentpage2 = "none";
        //         if (nav == 1) {
        //             currentpage2 = document.evaluate('//*[@data-automation-id="taskOrchCurrentItemLabel"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText;
        //         } else if (nav == 2) {
        //             currentpage2 = document.getElementsByClassName('css-1uso8fp')[0].innerText;
        //         } else if (nav == 3) {
        //             currentpage2 = document.getElementsByTagName('h2')[0].innerText;
        //         }
        //         console.log("yo whatup");
        //         console.log(currentpage);
        //         if (currentpage2 == currentpage) {
        //             console.log("different page, return workday");
        //             observer.disconnect()
        //             return workday(nav, form)
        //         }
        //      }
        //  });
        //  observer.observe(document, { childList: true, subtree: true });
    }
}

//        document.addEventListener("DOMContentLoaded", workday(nav, form));


// function initWorkday() {
//     var currenttext = document.getElementsByTagName("body")[0].innerText;
//     var lowertext = currenttext.toLowerCase();
//     if (lowertext.includes('sign in')) {
//         login();
        // setTimeout(function() {
        //     console.log("init workday");
        //     if (existsquery('[data-automation-id="taskOrchCurrentItemLabel"]')) {
        //         console.log("uno");
        //         return workday("we51", "none");
        //     }
        //     if (existsclass('css-1uso8fp')) {
        //         console.log("dos");
        //         return workday("progressbar", "none");
        //     } else if (existstag('h2')) {
        //         console.log("tres");
        //         return workday("h2", "none");
        //     }
        //     console.log("you're");
        // }, 10000);
//     }
// }

// export {
//     initWorkday
// };